# @tooly/notion

Notion API tools for AI applications, compatible with OpenAI function calling, Anthropic tool use, and AI SDK.

## Installation

```bash
npm install @tooly/notion
# or
yarn add @tooly/notion
# or
pnpm add @tooly/notion
```

## Setup

Get your Notion API key from your [Notion integrations](https://www.notion.so/my-integrations).

## Usage

### Basic Usage

```typescript
import { NotionTools } from '@tooly/notion'

const notion = new NotionTools('your-notion-api-key')

// Get available tools for function calling
const tools = notion.getTools()

// Execute a function
const result = await notion.executeFunction('createPage', {
  parent: { database_id: 'your-database-id' },
  properties: {
    Name: {
      title: [{ text: { content: 'New Page' } }],
    },
  },
})
```

### AI SDK

```typescript
import { createAITools } from '@tooly/notion'

const tools = createAITools('your-notion-api-key')

// Use with generateText
import { generateText } from 'ai'

const result = await generateText({
  model: openai('gpt-4.1-nano'),
  messages: [{ role: 'user', content: 'Create a new page in my database' }],
  tools,
})
```

### OpenAI Function Calling

```typescript
import { createOpenAIFunctions } from '@tooly/notion'

const { tools, executeFunction } = createOpenAIFunctions('your-notion-api-key')

// Use with OpenAI client
const completion = await openai.chat.completions.create({
  model: 'gpt-4.1-nano',
  messages: [{ role: 'user', content: 'Search for pages about AI' }],
  tools,
})

// Execute function calls
for (const toolCall of completion.choices[0].message.tool_calls || []) {
  const result = await executeFunction(toolCall.function.name, JSON.parse(toolCall.function.arguments))
}
```

### Anthropic Tool Use

```typescript
import { createAnthropicTools } from '@tooly/notion'

const { tools, executeFunction } = createAnthropicTools('your-notion-api-key')

// Use with Anthropic client
const message = await anthropic.messages.create({
  model: 'claude-sonnet-4-20250514',
  messages: [{ role: 'user', content: 'Create a new database' }],
  tools,
})

// Execute tool calls
for (const toolUse of message.content.filter((c) => c.type === 'tool_use')) {
  const result = await executeFunction(toolUse.name, toolUse.input)
}
```

## Available Tools

- `createPage` - Create a new page
- `getPage` - Get page details by ID
- `updatePage` - Update an existing page
- `searchPages` - Search for pages
- `createDatabase` - Create a new database
- `getDatabase` - Get database details by ID
- `updateDatabase` - Update an existing database
- `queryDatabase` - Query database entries

## License

MIT
