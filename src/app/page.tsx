'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { Header } from '@/components/header/Header';
import { ModeSelector, ChatMode } from '@/components/chat/ModeSelector';
import { ChatContainer } from '@/components/chat/ChatContainer';
import { ChatSidebar, ChatSession } from '@/components/chat/ChatSidebar';
import { AuthModal } from '@/components/auth/AuthModal';

export default function Home() {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [currentMode, setCurrentMode] = useState<ChatMode>('confidente');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [chats, setChats] = useState<ChatSession[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);

  const supabase = createClient();

  // Load user session on mount & subscribe to Auth changes
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setUser(data.user);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (!currentUser) {
        // Switch back to Modo Confidente if signed out
        setCurrentMode('confidente');
        setChats([]);
        setActiveChatId(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Fetch list of chats for logged in user in Modo Evolución
  const fetchChats = useCallback(async () => {
    if (!user) return;
    try {
      const res = await fetch('/api/chats');
      const data = await res.json();
      if (data.chats && Array.isArray(data.chats)) {
        setChats(data.chats);
        if (data.chats.length > 0 && !activeChatId) {
          setActiveChatId(data.chats[0].id);
        }
      }
    } catch (error) {
      console.error('Error loading chats list:', error);
    }
  }, [user, activeChatId]);

  useEffect(() => {
    if (currentMode === 'evolucion' && user) {
      fetchChats();
    }
  }, [currentMode, user, fetchChats]);

  // Handle creating a new chat session in Modo Evolución
  const handleNewChat = async () => {
    if (!user) return;
    try {
      const res = await fetch('/api/chats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'Nueva conversación' }),
      });
      const data = await res.json();
      if (data.chat) {
        setChats((prev) => [data.chat, ...prev]);
        setActiveChatId(data.chat.id);
      }
    } catch (error) {
      console.error('Error creating new chat:', error);
    }
  };

  // Handle deleting a chat session
  const handleDeleteChat = async (chatId: string) => {
    try {
      await fetch(`/api/chats/${chatId}`, { method: 'DELETE' });
      setChats((prev) => prev.filter((c) => c.id !== chatId));
      if (activeChatId === chatId) {
        const remaining = chats.filter((c) => c.id !== chatId);
        setActiveChatId(remaining.length > 0 ? remaining[0].id : null);
      }
    } catch (error) {
      console.error('Error deleting chat session:', error);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors">
      {/* Header Component */}
      <Header
        user={user}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onSignOut={handleSignOut}
        onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
        showSidebarButton={currentMode === 'evolucion' && !!user}
      />

      {/* Mode Selector */}
      <div className="bg-slate-100/60 dark:bg-slate-900/60 border-b border-slate-200/60 dark:border-slate-800/60 py-1.5 shadow-xs transition-colors">
        <ModeSelector
          currentMode={currentMode}
          onSelectMode={(mode) => {
            setCurrentMode(mode);
            if (mode === 'evolucion' && user && chats.length === 0) {
              handleNewChat();
            }
          }}
          isAuthenticated={!!user}
          onOpenAuthModal={() => setIsAuthModalOpen(true)}
        />
      </div>

      {/* Main Body Area (Sidebar + ChatContainer) */}
      <div className="flex flex-1 overflow-hidden relative">
        {currentMode === 'evolucion' && user && (
          <ChatSidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            chats={chats}
            activeChatId={activeChatId}
            onSelectChat={(id) => {
              setActiveChatId(id);
              setIsSidebarOpen(false);
            }}
            onNewChat={() => {
              handleNewChat();
              setIsSidebarOpen(false);
            }}
            onDeleteChat={handleDeleteChat}
          />
        )}

        <ChatContainer
          currentMode={currentMode}
          activeChatId={currentMode === 'evolucion' ? activeChatId : null}
        />
      </div>

      {/* Auth Modal for Supabase Login/Signup */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={() => {
          setCurrentMode('evolucion');
        }}
      />
    </div>
  );
}
