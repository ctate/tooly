# @private/examples

Simple examples demonstrating how to create AI SDK tools for each Tooly toolkit.

## Available Toolkits

- **@tooly/github** - GitHub API integration
- **@tooly/linear** - Linear API integration
- **@tooly/notion** - Notion API integration
- **@tooly/resend** - Resend email API integration
- **@tooly/supabase** - Supabase integration
- **@tooly/twilio** - Twilio communications API integration
- **@tooly/firecrawl** - Web scraping with Firecrawl integration

## Quick Start

Each example shows how to create AI SDK tools from a toolkit:

```typescript
import { createAITools } from '@tooly/linear'

const tools = createAITools('your-api-key')
// Use tools with generateObject, generateText, etc.
```

## Setup

1. Copy the environment variables file:

   ```bash
   cp .env.example .env
   ```

2. Fill in the API keys for the services you want to test

3. Install dependencies (from workspace root):

   ```bash
   pnpm install
   ```

4. Build the examples:
   ```bash
   pnpm build
   ```

## Using the Examples

Import and use any example:

```typescript
import { linearExample } from '@private/examples'

// Create Linear AI tools
const linearTools = await linearExample()

// Use with Vercel AI SDK
import { generateObject } from 'ai'

const result = await generateObject({
  model: yourModel,
  tools: linearTools,
  prompt: 'Get all my Linear issues',
})
```

### All Tools at Once

Create tools for all available services:

```typescript
import { createAllTools } from '@private/examples'

const allTools = await createAllTools()
// Returns: { github: {...}, linear: {...}, notion: {...}, etc }
```

## Environment Variables

Create a `.env` file with your API keys:

```bash
# Linear
LINEAR_API_KEY=your_linear_api_key

# GitHub
GITHUB_TOKEN=your_github_token

# Notion
NOTION_API_KEY=your_notion_api_key

# Resend
RESEND_API_KEY=your_resend_api_key

# Supabase
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key

# Twilio
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token

# Firecrawl
FIRECRAWL_API_KEY=your_firecrawl_api_key
```

## What You Get

Each example returns AI SDK tools that can be used with:

- `generateObject()` - Structured data extraction
- `generateText()` - AI-powered operations
- `streamObject()` - Real-time interactions
- Any other Vercel AI SDK function that accepts tools

## Development

```bash
# Watch mode
pnpm dev

# Type checking
pnpm check-types
```

## Usage in Your Own Projects

These examples show you how to integrate Tooly toolkits into your own projects. The patterns demonstrated here can be adapted for:

- AI agents and chatbots
- Automation scripts
- API integrations
- Workflow tools

## Notes

- Some examples avoid making actual API calls to prevent spam or charges
- Examples include error handling patterns you should use in production
- Each toolkit can be used independently - you don't need all API keys
- The examples are designed to be educational and demonstrate best practices
