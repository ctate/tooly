# @tooly/firecrawl

Firecrawl API tools for OpenAI, Anthropic, and AI SDK integration.

## Installation

```bash
npm install @tooly/firecrawl
```

## Usage

### Basic Setup

```typescript
import { createAITools } from '@tooly/firecrawl'

const tools = createAITools('your-firecrawl-api-key')
```

### With AI SDK

```typescript
import { createAITools } from '@tooly/firecrawl'
import { generateText } from 'ai'

const tools = createAITools(process.env.FIRECRAWL_API_KEY!)

const result = await generateText({
  model: openai('gpt-4.1-nano'),
  prompt: 'Scrape the homepage of https://example.com and summarize the content',
  tools,
})
```

### With OpenAI

```typescript
import { createOpenAIFunctions } from '@tooly/firecrawl'
import OpenAI from 'openai'

const openai = new OpenAI()
const { functions, handleFunctionCall } = createOpenAIFunctions(process.env.FIRECRAWL_API_KEY!)

const response = await openai.chat.completions.create({
  model: 'gpt-4',
  messages: [{ role: 'user', content: 'Scrape https://example.com' }],
  functions,
})

// Handle function calls
const functionCall = response.choices[0].message.function_call
if (functionCall) {
  const result = await handleFunctionCall(functionCall.name, functionCall.arguments)
}
```

### With Anthropic

```typescript
import { createAnthropicTools } from '@tooly/firecrawl'
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic()
const { tools, handleToolCall } = createAnthropicTools(process.env.FIRECRAWL_API_KEY!)

const response = await anthropic.messages.create({
  model: 'claude-3-5-sonnet-20241022',
  max_tokens: 1000,
  messages: [{ role: 'user', content: 'Scrape the content from https://example.com' }],
  tools,
})

// Handle tool calls
for (const content of response.content) {
  if (content.type === 'tool_use') {
    const result = await handleToolCall(content.name, content.input)
  }
}
```

## Available Tools

- **scrapeUrl**: Scrape a single URL and get its content in various formats
- **crawlUrl**: Crawl a website and get content from all accessible pages
- **mapUrl**: Map a website to get a list of all URLs found on the site
- **search**: Search the web and optionally scrape the results
- **batchScrape**: Scrape multiple URLs in batch
- **checkCrawlStatus**: Check the status of a crawl job

## Direct Usage

```typescript
import { FirecrawlTools } from '@tooly/firecrawl'

const firecrawl = new FirecrawlTools('your-api-key')
const handlers = firecrawl.getHandlers()

// Scrape a single URL
const scrapeResult = await handlers.scrapeUrl({
  url: 'https://example.com',
  formats: ['markdown', 'html'],
})

// Crawl a website
const crawlResult = await handlers.crawlUrl({
  url: 'https://example.com',
  limit: 10,
  scrapeOptions: {
    formats: ['markdown'],
  },
})

// Map a website
const mapResult = await handlers.mapUrl({
  url: 'https://example.com',
})

// Search the web
const searchResult = await handlers.search({
  query: 'latest news about AI',
  limit: 5,
})
```

## Environment Variables

Set your Firecrawl API key as an environment variable:

```bash
FIRECRAWL_API_KEY=your_api_key_here
```

## License

MIT
