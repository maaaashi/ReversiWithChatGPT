import { Configuration, OpenAIApi } from 'openai'
import { NextResponse, NextRequest } from 'next/server'

export const POST = async (req: NextRequest) => {
  const { board } = await req.json()
  const apiKey = process.env.NEXT_PUBLIC_API_KEY
  const configuration = new Configuration({
    apiKey,
  })
  const openai = new OpenAIApi(configuration)

  const response = await openai.createChatCompletion({
    model: 'gpt-4',
    temperature: 2,
    messages: [
      {
        role: 'system',
        content: `What is the next move in Othello?
      The current board is as follows
      ${board}
      I play as White (1). Where is the best place to place the stone?

      [row][col] = `,
      },
    ],
  })

  const content = response.data.choices[0].message?.content

  return NextResponse.json({ content })
}
