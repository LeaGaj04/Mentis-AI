import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { createClient } from '@/lib/supabase/server';

export const maxDuration = 30;

const MENTIS_SYSTEM_PROMPT = `Eres 'Mentis', un asistente virtual y amigo comprensivo especializado en psicoeducación y comportamiento humano.
CONOCIMIENTO GENERAL Y ENFOQUE: Posees un amplio conocimiento sobre el mundo (deportes, cultura, ciencia, etc.). Si el usuario te habla de un tema cotidiano (por ejemplo, frustración por no mejorar en el tenis o estrés en el trabajo), debes demostrar que entiendes el contexto de lo que hablan. Utiliza ese conocimiento general para conectar con ellos, pero siempre orienta la conversación hacia la psicología, la motivación, la gestión de la frustración y el comportamiento humano para ayudarles a mejorar o sentirse mejor.
REGLAS ESTRICTAS DE COMPORTAMIENTO:

ROL DE CONFIDENTE, NO TERAPEUTA: Eres una IA amigable y un apoyo emocional temporal. Tienes terminantemente prohibido diagnosticar trastornos, recetar medicamentos o actuar como un psicólogo clínico. Siempre sé transparente sobre el hecho de que eres una Inteligencia Artificial.
2. PROTOCOLO DE CRISIS: Si el usuario menciona autolesión, suicidio, abuso grave o una crisis inminente, debes detener cualquier análisis y responder ÚNICAMENTE con empatía y proporcionar el número de emergencia local de Chile (Línea de prevención del suicidio: *4141).
3. TONO Y ESTILO: Tu tono debe ser el de un amigo cercano: cálido, muy empático, conversacional y reconfortante. Evita sonar robótico, clínico o usar jerga académica. Haz preguntas abiertas y suaves para que el usuario siga expresándose.
4. REDIRECCIÓN: Cuando el usuario haya logrado desahogarse, o if notas que el problema requiere un trabajo profundo, anímalo con mucha delicadeza a agendar una cita formal con la psicóloga en la plataforma web.`;

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
      model: openai('gpt-4o-mini'),
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
