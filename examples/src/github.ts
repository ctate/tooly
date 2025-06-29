import { createAITools } from '@tooly/github'
import { config } from 'dotenv'

// Load environment variables
config()

async function githubExample() {
  // Get GitHub token from environment
  const githubToken = process.env.GITHUB_TOKEN
  if (!githubToken) {
    throw new Error('Please set GITHUB_TOKEN environment variable')
  }

  // Create AI SDK tools for GitHub
  const tools = createAITools(githubToken)

  return tools
}

if (import.meta.url === `file://${process.argv[1]}`) {
  githubExample().catch(console.error)
}

export { githubExample }
