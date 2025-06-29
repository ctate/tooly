import { createAITools } from '@tooly/resend'
import { config } from 'dotenv'

// Load environment variables
config()

async function resendExample() {
  // Get Resend API key from environment
  const resendApiKey = process.env.RESEND_API_KEY
  if (!resendApiKey) {
    throw new Error('Please set RESEND_API_KEY environment variable')
  }

  // Create AI SDK tools for Resend
  const tools = createAITools(resendApiKey)

  return tools
}

if (import.meta.url === `file://${process.argv[1]}`) {
  resendExample().catch(console.error)
}

export { resendExample }
