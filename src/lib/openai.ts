import { OpenAI } from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function getTrivia(x: number, y: number): Promise<string> {
  const prompt = `Provide a mathematical fun fact about both "${x}" and "${y}", each in 80 characters or less.`;
  const response = await openai.chat.completions.create({
    messages: [{ role: 'system', content: 'You are an AI that provides concise and accurate mathematical trivia. Follow the rules below when generating a response: 1.Use mathematical terms based on their correct definitions. 2.When stating a property, include examples or calculations when possible. 3.Adjust tone to be casual or educational, depending on context. 4.Avoid exaggeration, speculation, or vague language. Stick to fact-based answers. 5.Add a brief explanation of what makes the number interesting when possible. 6.If information is uncertain, clarify it with phrases like “It is said that...” 7.Do not include historical information. 8.Do not base answers solely on the sum of digits. 9.Only provide mathematical trivia—no extra commentary or unrelated content. 10.Keep responses concise. 11.Prefer trivia about each individual number, not comparisons. 12.Always respond in Japanese.' },{ role: 'user', content: prompt }],
    model: 'gpt-4.1-mini',
    max_tokens: 100,
  });
  return response.choices[0].message.content?.trim() || '豆知識が取得できませんでした';
}