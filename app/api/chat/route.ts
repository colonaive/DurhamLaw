import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY!,
});

export async function POST(request: NextRequest) {
  try {
    const { messages, context } = await request.json();

    const systemPrompt = `You are an expert UK law tutor specializing in helping Durham University law students. 
You have deep knowledge of UK law including constitutional law, criminal law, contract law, tort law, 
property law, and EU law. Always provide accurate, detailed explanations with relevant case law citations.
${context ? `Context: ${context}` : ''}`;

    const response = await anthropic.messages.create({
      model: 'claude-3-opus-20240229',
      max_tokens: 1000,
      system: systemPrompt,
      messages: messages,
    });

    console.log("Claude raw response:", JSON.stringify(response, null, 2));

    const content = response.content
      ?.filter((block) => block.type === 'text')
      .map((block) => (block as { text: string }).text)
      .join('\n\n');

    if (!content) {
      console.error('Claude returned no usable text.');
      return NextResponse.json(
        { error: 'No content received from Claude.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ content });
  } catch (error: any) {
    console.error('Chat API Error:', error?.message || error);
    return NextResponse.json(
      { error: error?.message || 'Failed to process request' },
      { status: 500 }
    );
  }
}
