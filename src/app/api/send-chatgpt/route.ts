import { Configuration, OpenAIApi } from 'openai'
import { NextResponse, NextRequest } from 'next/server'

const postGPT = async (params: { board: string; stone: string }) => {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY
  const configuration = new Configuration({
    apiKey,
  })
  const openai = new OpenAIApi(configuration)

  const model = 'gpt-4'
  // const model = 'gpt-3.5-turbo'

  const { board, stone } = params
  const nextStone = stone === 'black' ? -1 : 1

  const messageContent = `What is the next move in Othello?
  The current board is as follows
  ${board}
  I play as ${stone} (${nextStone}). Where is the best place to place the stone?

  [row][col] = `

  return await openai.createChatCompletion({
    model,
    temperature: 2,
    messages: [
      {
        role: 'system',
        content: messageContent,
      },
    ],
  })
}

export const POST = async (req: NextRequest) => {
  let conti = true
  let content = ''
  let roop = 1

  while (conti || roop === 5) {
    try {
      const response = await postGPT(await req.json())
      const con = response.data.choices[0].message?.content

      if (
        con &&
        typeof +content[1] === 'number' &&
        typeof +content[4] === 'number'
      ) {
        conti = false
        content = con
      }
    } catch (error) {
      console.log('error')
      roop++
    }
  }

  return NextResponse.json({ content })
}
