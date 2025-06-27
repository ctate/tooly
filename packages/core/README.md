# @tooly/core

Core utilities and abstractions for building AI tool packages compatible with OpenAI function calling, Anthropic tool use, and Vercel AI SDK.

## Installation

This package is typically used as a dependency by other `@tooly/*` packages and not installed directly:

```bash
npm install @tooly/core
# or
yarn add @tooly/core
# or
pnpm add @tooly/core
```

## Overview

This package provides:

- **BaseToolManager**: Abstract class for creating tool managers
- **Common Types**: Shared TypeScript types and interfaces
- **AI Framework Helpers**: Utilities for OpenAI, Anthropic, and Vercel AI SDK integration
- **Tool Definition Utilities**: Helpers for defining and validating tools

## Usage

### Creating a Tool Manager

```typescript
import { BaseToolManager } from '@tooly/core'
import { z } from 'zod'

// Define your tool schemas
const toolSchemas = {
  myTool: z.object({
    param1: z.string(),
    param2: z.number().optional(),
  }),
}

// Define your tools
const tools = [
  {
    name: 'myTool',
    description: 'My custom tool',
    parameters: {
      type: 'object',
      properties: {
        param1: { type: 'string', description: 'First parameter' },
        param2: { type: 'number', description: 'Optional second parameter' },
      },
      required: ['param1'],
    },
  },
] as const

class MyToolManager extends BaseToolManager<typeof toolSchemas, typeof tools> {
  constructor(apiKey: string) {
    super(tools, toolSchemas)
    // Initialize your handlers
  }

  protected async executeToolFunction(name: string, params: any): Promise<any> {
    switch (name) {
      case 'myTool':
        return this.handleMyTool(params)
      default:
        throw new Error(`Unknown tool: ${name}`)
    }
  }

  private async handleMyTool(params: { param1: string; param2?: number }) {
    // Your tool implementation
    return { result: `Processed ${params.param1}` }
  }
}
```

### Using with AI Frameworks

```typescript
import { createVercelAITools, createOpenAIFunctions, createAnthropicTools } from '@tooly/core'

const toolManager = new MyToolManager('your-api-key')

// Vercel AI SDK
const vercelTools = createVercelAITools(toolManager)

// OpenAI Function Calling
const openaiSetup = createOpenAIFunctions(toolManager)

// Anthropic Tool Use
const anthropicSetup = createAnthropicTools(toolManager)
```

## API Reference

### BaseToolManager

Abstract base class that provides common functionality for tool managers.

#### Methods

- `getTools()`: Returns the tool definitions
- `executeFunction(name, parameters)`: Executes a tool function with validation
- `getToolSchemas()`: Returns the Zod schemas for validation

### Helper Functions

- `createVercelAITools(toolManager)`: Creates Vercel AI SDK compatible tools
- `createOpenAIFunctions(toolManager)`: Creates OpenAI function calling setup
- `createAnthropicTools(toolManager)`: Creates Anthropic tool use setup

## License

MIT
