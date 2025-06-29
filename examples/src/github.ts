import 'dotenv/config'
import { createAITools } from '@tooly/github'
import { generateText } from 'ai'
import { openai } from '@ai-sdk/openai'

// Get GitHub token from environment
const githubToken = process.env.GITHUB_TOKEN
if (!githubToken) {
  throw new Error('Please set GITHUB_TOKEN environment variable')
}

// Create AI SDK tools for GitHub
const tools = createAITools(githubToken)

const { toolResults } = await generateText({
  model: openai('gpt-4.1-nano'),
  prompt: 'Get information about the user account and list any recent repositories',
  tools,
})

console.log(JSON.stringify(toolResults[0]?.result, null, 2))
