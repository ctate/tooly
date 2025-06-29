import { createAITools } from '@tooly/notion'
import { config } from 'dotenv'

// Load environment variables
config()

async function notionExample() {
  // Get Notion API key from environment
  const notionApiKey = process.env.NOTION_API_KEY
  if (!notionApiKey) {
    throw new Error('Please set NOTION_API_KEY environment variable')
  }

  // Create AI SDK tools for Notion
  const tools = createAITools(notionApiKey)

  return tools
}

if (import.meta.url === `file://${process.argv[1]}`) {
  notionExample().catch(console.error)
}

export { notionExample }
