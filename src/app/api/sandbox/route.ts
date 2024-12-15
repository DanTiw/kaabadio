import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { material } = await request.json();

    if (!material) {
      return NextResponse.json(
        { error: 'Material is required' }, 
        { status: 400 }
      );
    }

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are an innovative AI assistant specializing in material reuse and creative recycling. 
          Respond with a beautifully formatted HTML response that provides 3-5 unique, practical, and creative reuse ideas.
          
          Guidelines:
          - Use semantic HTML for structure
          - Include an h2 title
          - Use an ordered list for ideas
          - Add classes for styling
          - Highlight environmental benefits
          `
        },
        {
          role: "user",
          content: `Generate creative HTML-formatted reuse ideas for ${material}. 
          Provide suggestions that are practical, safe, and environmentally friendly.`
        }
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 1024,
      top_p: 1
    });

    const htmlResponse = chatCompletion.choices[0].message.content || '';

    return NextResponse.json({ 
      html: htmlResponse 
    });

  } catch (error) {
    console.error('Waste Reuse API Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate suggestions' }, 
      { status: 500 }
    );
  }
}