import { Configuration, OpenAIApi } from 'openai'
import { NextResponse } from 'next/server'

export const GET = async () => {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY
  const configuration = new Configuration({
    apiKey,
  })
  const openai = new OpenAIApi(configuration)

  const response = await openai.createChatCompletion({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: '何を聞かれてもYesと答えてください' },
      { role: 'user', content: 'あなたはAIですか？' },
    ],
  })

  const content = response.data.choices[0].message?.content

  return NextResponse.json({ content })
}
