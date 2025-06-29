import 'dotenv/config'
import { createAITools } from '@tooly/resend'
import { generateText } from 'ai'
import { openai } from '@ai-sdk/openai'

// Get Resend API key from environment
const resendApiKey = process.env.RESEND_API_KEY
if (!resendApiKey) {
  throw new Error('Please set RESEND_API_KEY environment variable')
}

// Create AI SDK tools for Resend
const tools = createAITools(resendApiKey)

const { toolResults } = await generateText({
  model: openai('gpt-4.1-nano'),
  prompt: 'Send a test email to test@example.com with the subject "Test Email" and a simple greeting message',
  tools,
})

console.log(JSON.stringify(toolResults[0]?.result, null, 2))
