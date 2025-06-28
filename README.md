# Tooly

<div align="center">
  <a href="https://tooly.ctate.dev">
    <img src="tooly-icon.png" alt="Tooly Logo" width="120" height="120">
  </a>
  <h3>APIs as AI Tools</h3>
  <p>Tooly packages popular APIs into agent-ready tools</p>
</div>

## What is Tooly?

Tooly is a collection of AI-powered tool packages designed for seamless integration with the AI SDK. It provides pre-built, type-safe packages that enable AI applications to interact with popular services like email providers and project management tools.

## Quick Start

```bash
# Install a tool
npm install @tooly/resend
```

```ts
// Use with AI SDK
import { generateText } from 'ai'
import { openai } from '@ai-sdk/openai'
import { createAITools } from '@tooly/resend'

const tools = createAITools('your-api-key')

const result = await generateText({
  model: openai('gpt-4.1-nano'),
  messages: [{ role: 'user', content: 'Send a welcome email' }],
  tools,
})
```

## Key Features

- **AI SDK First** - Built specifically for the AI SDK
- **Multi-Framework** - Also works with OpenAI and Anthropic SDKs
- **Modular Packages** - Install only what you need
- **Type Safe** - Full TypeScript support with Zod validation
- **Easy Integration** - Simple setup with consistent APIs

## Available Packages

- **[@tooly/core](./packages/core)** - Base abstractions and utilities
- **[@tooly/resend](./packages/resend)** - Email tools powered by Resend API
- **[@tooly/linear](./packages/linear)** - Project management tools powered by Linear API

## Documentation

📖 **[Full Documentation](https://tooly.dev/docs)** - Complete guides, API references, and examples

- [Getting Started](https://tooly.dev/docs/getting-started) - Set up your first AI tool
- [Examples](https://tooly.dev/docs/examples) - Real-world usage examples
- [Package Docs](https://tooly.dev/docs/packages) - Detailed package documentation

## Development

This is a monorepo built with Turborepo. To get started:

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build all packages
pnpm build
```

## Contributing

Contributions are welcome! Please read our [contributing guidelines](./CONTRIBUTING.md) and check out the [documentation](https://tooly.dev/docs) to understand the project structure.

## License

MIT License - see [LICENSE](./LICENSE) for details.
