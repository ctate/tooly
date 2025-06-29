import { NextRequest, NextResponse } from 'next/server'
import { generateText } from 'ai'
import { createOpenAI } from '@ai-sdk/openai'

// Import toolkit creators
import { createAITools as createResendTools } from '@tooly/resend'
import { createAITools as createGitHubTools } from '@tooly/github'
import { createAITools as createLinearTools } from '@tooly/linear'
import { createAITools as createNotionTools } from '@tooly/notion'
import { createAITools as createSupabaseTools } from '@tooly/supabase'
import { createAITools as createTwilioTools } from '@tooly/twilio'
import { createAITools as createStripeTools } from '@tooly/stripe'
import { createAITools as createVercelTools } from '@tooly/vercel'
import { createAITools as createPayPalTools } from '@tooly/paypal'

const toolkitMap = {
  resend: createResendTools,
  github: createGitHubTools,
  linear: createLinearTools,
  notion: createNotionTools,
  supabase: createSupabaseTools,
  twilio: createTwilioTools,
  stripe: createStripeTools,
  vercel: createVercelTools,
  paypal: createPayPalTools,
}

export async function POST(request: NextRequest) {
  try {
    const { prompt, toolkit, apiKeys } = await request.json()

    if (!prompt || !toolkit || !apiKeys) {
      return NextResponse.json({ error: 'Missing required fields: prompt, toolkit, apiKeys' }, { status: 400 })
    }

    if (!apiKeys.openai) {
      return NextResponse.json({ error: 'OpenAI API key is required' }, { status: 400 })
    }

    if (!apiKeys[toolkit]) {
      return NextResponse.json({ error: `${toolkit} API key is required` }, { status: 400 })
    }

    // Create tools for the selected toolkit
    const createTools = toolkitMap[toolkit as keyof typeof toolkitMap]
    if (!createTools) {
      return NextResponse.json({ error: `Unsupported toolkit: ${toolkit}` }, { status: 400 })
    }

    const tools = createTools(apiKeys[toolkit])
    const openai = createOpenAI({
      apiKey: apiKeys.openai,
    })

    // Make the AI request with tools
    const result = await generateText({
      model: openai('gpt-4.1-nano'),
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      tools,
      maxTokens: 1000,
    })

    return NextResponse.json({
      success: true,
      data: {
        text: result.text,
        toolCalls: result.toolCalls,
        usage: result.usage,
        finishReason: result.finishReason,
        toolkit,
        prompt,
        timestamp: Date.now(),
      },
    })
  } catch (error) {
    console.error('Playground API error:', error)

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        timestamp: Date.now(),
      },
      { status: 500 },
    )
  }
}
