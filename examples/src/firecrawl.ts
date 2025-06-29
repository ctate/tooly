import { createAITools } from '@tooly/firecrawl'
import { config } from 'dotenv'

// Load environment variables
config()

async function firecrawlExample() {
  const firecrawlApiKey = process.env.FIRECRAWL_API_KEY
  if (!firecrawlApiKey) {
    throw new Error('Please set FIRECRAWL_API_KEY environment variable')
  }

  // Create AI SDK tools for Firecrawl
  const tools = createAITools(firecrawlApiKey)

  return tools
}

export { firecrawlExample }
