/**
 * Example usage of @tooly/jira package
 *
 * This example demonstrates how to use the JIRA tools with different AI providers.
 */

import 'dotenv/config'
import { createAITools } from '@tooly/jira'
import { streamText } from 'ai'
import { openai } from '@ai-sdk/openai'

// Get JIRA configuration from environment
const jiraHost = process.env.JIRA_HOST
const jiraUsername = process.env.JIRA_USERNAME
const jiraApiToken = process.env.JIRA_API_TOKEN

if (!jiraHost || !jiraUsername || !jiraApiToken) {
  throw new Error('Please set JIRA_HOST, JIRA_USERNAME, and JIRA_API_TOKEN environment variables')
}

const jiraConfig = {
  protocol: 'https' as const,
  host: jiraHost,
  username: jiraUsername,
  password: jiraApiToken,
  apiVersion: '2' as const,
  strictSSL: true,
}

// Create AI SDK tools for JIRA
const tools = createAITools(jiraConfig)

const { textStream } = streamText({
  model: openai('gpt-4.1-nano'),
  prompt: 'Show me a list of JIRA issues assigned to me with their status and priority',
  tools,
  maxSteps: 2,
})

for await (const textPart of textStream) {
  process.stdout.write(textPart)
}
