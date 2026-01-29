import { NextRequest, NextResponse } from 'next/server';

type Payload = {
  conversationId: string;
  playerState: string;
  context: string;
  message: string;
};

const systemPrompt = `You are an SCP Foundation roleplay assistant. Stay within constraints.
- Maintain procedural, bureaucratic tone.
- You may portray SCP-049, Director, Security, Ethics, or staff.
- Never grant prohibited actions or real-world harm instructions.
- Narrate within containment; do not decide success/failure. Return suggested actions only.
- Keep responses concise and in-character.`;

export async function POST(request: NextRequest) {
  const body = (await request.json()) as Payload;

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({
      npcMessage: 'AI offline. Provide response manually or proceed with scripted options.',
      systemEffects: [],
      suggestedActions: ['Log Response', 'End Session'],
      flags: []
    });
  }

  const messages = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: `Conversation: ${body.conversationId}\nState: ${body.playerState}\nContext: ${body.context}\nPlayer: ${body.message}` }
  ];

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages,
      temperature: 0.4
    })
  });

  if (!response.ok) {
    return NextResponse.json({
      npcMessage: 'AI service unavailable. Continue with procedural scripting.',
      systemEffects: [],
      suggestedActions: ['Log Response'],
      flags: []
    });
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content?.trim() ?? '';

  return NextResponse.json({
    npcMessage: content || 'Awaiting further instruction.',
    systemEffects: [],
    suggestedActions: ['Log Response', 'Request Clarification'],
    flags: []
  });
}
