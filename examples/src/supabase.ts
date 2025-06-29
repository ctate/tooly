import 'dotenv/config'
import { createAITools } from '@tooly/supabase'
import { generateText } from 'ai'
import { openai } from '@ai-sdk/openai'

// Get Supabase credentials from environment
const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Please set SUPABASE_URL and SUPABASE_ANON_KEY environment variables')
}

// Create AI SDK tools for Supabase
const tools = createAITools(supabaseUrl, supabaseKey)

const { toolResults } = await generateText({
  model: openai('gpt-4.1-nano'),
  prompt: 'Get the current user information from Supabase',
  tools,
})

console.log(JSON.stringify(toolResults[0]?.result, null, 2))
