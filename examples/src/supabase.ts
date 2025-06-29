import { createAITools } from '@tooly/supabase'
import { config } from 'dotenv'

// Load environment variables
config()

async function supabaseExample() {
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Please set SUPABASE_URL and SUPABASE_ANON_KEY environment variables')
  }

  // Create AI SDK tools for Supabase
  const tools = createAITools(supabaseUrl, supabaseKey)

  return tools
}

export { supabaseExample }
