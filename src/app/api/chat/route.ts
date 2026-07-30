import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import { createClient } from '@/lib/supabase/server';

export const maxDuration = 30;

import { MENTIS_SYSTEM_PROMPT } from '@/config/prompts';

export async function POST(req: Request) {
  try {
    const { messages, chatId, mode } = await req.json();

    // Check if user is authenticated for persistent saving (Modo Evolución)
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const isEvolucionMode = mode === 'evolucion' && user && chatId;

    // Save the user's latest message if in Modo Evolución
    if (isEvolucionMode && Array.isArray(messages) && messages.length > 0) {
      const lastUserMsg = messages[messages.length - 1];
      if (lastUserMsg && lastUserMsg.role === 'user') {
        await supabase.from('messages').insert({
          chat_id: chatId,
          role: 'user',
          content: lastUserMsg.content,
        });
      }
    }

    const result = streamText({
      model: google('gemini-1.5-flash'),
      system: MENTIS_SYSTEM_PROMPT,
      messages,
      async onFinish({ text }) {
        // Save assistant response to Supabase when streaming finishes if in Modo Evolución
        if (isEvolucionMode && text) {
          await supabase.from('messages').insert({
            chat_id: chatId,
            role: 'assistant',
            content: text,
          });

          // Update chat timestamp
          await supabase
            .from('chats')
            .update({ updated_at: new Date().toISOString() })
            .eq('id', chatId);
        }
      },
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error('Error in /api/chat route:', error);
    return new Response(
      JSON.stringify({
        error: 'Ha ocurrido un error al procesar la solicitud con Mentis.',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
