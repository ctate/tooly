import 'dotenv/config'
import { createAITools } from '@tooly/notion'
import { generateText } from 'ai'
import { openai } from '@ai-sdk/openai'

// Get Notion API key from environment
const notionApiKey = process.env.NOTION_API_KEY
if (!notionApiKey) {
  throw new Error('Please set NOTION_API_KEY environment variable')
}

// Create AI SDK tools for Notion
const tools = createAITools(notionApiKey)

const { text } = await generateText({
  model: openai('gpt-4.1-nano'),
  prompt: 'Search for pages in Notion and tell me what you find',
  tools,
  experimental_continueSteps: true,
  maxSteps: 10,
})

console.log(text)
