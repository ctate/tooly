# @tooly/resend

Resend API tools for OpenAI, Anthropic, and Vercel AI SDK. Convert Resend's email API into AI-compatible tools for sending, retrieving, updating, and canceling emails.

## Installation

```bash
npm install @tooly/resend
# or
pnpm add @tooly/resend
# or
yarn add @tooly/resend
```

## Features

- **sendEmail**: Send a single email
- **sendBatchEmails**: Send up to 100 batch emails at once
- **retrieveEmail**: Retrieve email details by ID
- **updateEmail**: Update a scheduled email
- **cancelEmail**: Cancel a scheduled email

## Quick Start

### Basic Usage

```typescript
import { ResendTools } from "@tooly/resend";

const resendTools = new ResendTools("your-resend-api-key");

// Get all available tools
const tools = resendTools.getTools();

// Execute a function directly
const result = await resendTools.executeFunction("sendEmail", {
  from: "hello@yourdomain.com",
  to: ["user@example.com"],
  subject: "Hello from Resend!",
  html: "<p>This is a test email.</p>",
});
```

## Usage with OpenAI

```typescript
import OpenAI from "openai";
import { createOpenAIFunctions } from "@tooly/resend";

const openai = new OpenAI({
  apiKey: "your-openai-api-key",
});

const { tools, executeFunction } = createOpenAIFunctions("your-resend-api-key");

const completion = await openai.chat.completions.create({
  model: "gpt-4",
  messages: [
    {
      role: "user",
      content:
        'Send a welcome email to john@example.com with the subject "Welcome to our platform!"',
    },
  ],
  tools: tools.map((tool) => ({
    type: "function",
    function: tool,
  })),
});

// Handle function calls
const message = completion.choices[0].message;
if (message.tool_calls) {
  for (const toolCall of message.tool_calls) {
    if (toolCall.type === "function") {
      const result = await executeFunction(
        toolCall.function.name,
        JSON.parse(toolCall.function.arguments)
      );
      console.log("Email sent:", result);
    }
  }
}
```

## Usage with Anthropic

```typescript
import Anthropic from "@anthropic-ai/sdk";
import { createAnthropicTools } from "@tooly/resend";

const anthropic = new Anthropic({
  apiKey: "your-anthropic-api-key",
});

const { tools, executeFunction } = createAnthropicTools("your-resend-api-key");

const message = await anthropic.messages.create({
  model: "claude-3-sonnet-20240229",
  max_tokens: 1024,
  messages: [
    {
      role: "user",
      content: "Send a welcome email to john@example.com",
    },
  ],
  tools: tools,
});

// Handle function calls
if (message.content.some((content) => content.type === "tool_use")) {
  for (const content of message.content) {
    if (content.type === "tool_use") {
      const result = await executeFunction(content.name, content.input);
      console.log("Email sent:", result);
    }
  }
}
```

## Usage with Vercel AI SDK

```typescript
import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { createVercelAITools } from "@tooly/resend";

const tools = createVercelAITools("your-resend-api-key");

const { text } = await generateText({
  model: openai("gpt-4"),
  prompt: 'Send a welcome email to john@example.com with subject "Welcome!"',
  tools: tools,
});

console.log(text);
```

## API Reference

### ResendTools

Main class for managing Resend tools.

```typescript
const resendTools = new ResendTools(apiKey: string);
```

#### Methods

- `getTools()`: Returns all available tool definitions
- `executeFunction(name: string, parameters: any)`: Execute a tool function by name
- `getHandlers()`: Get direct access to handler methods

### Available Tools

#### sendEmail

Send a single email using Resend.

**Parameters:**

- `from` (string, required): Sender email address
- `to` (string[], required): Recipient email addresses (max 50)
- `subject` (string, required): Email subject
- `html` (string, optional): HTML version of the message
- `text` (string, optional): Plain text version of the message
- `bcc` (string[], optional): BCC recipients
- `cc` (string[], optional): CC recipients
- `reply_to` (string[], optional): Reply-to addresses
- `scheduled_at` (string, optional): Schedule email for later
- `headers` (object, optional): Custom headers
- `attachments` (array, optional): File attachments
- `tags` (array, optional): Custom tags for tracking

**Example:**

```typescript
await executeFunction("sendEmail", {
  from: "hello@yourdomain.com",
  to: ["user@example.com"],
  subject: "Hello!",
  html: "<p>Hello world!</p>",
  text: "Hello world!",
});
```

#### sendBatchEmails

Send up to 100 batch emails at once.

**Parameters:**

- `emails` (array, required): Array of email objects (max 100)

**Example:**

```typescript
await executeFunction("sendBatchEmails", {
  emails: [
    {
      from: "hello@yourdomain.com",
      to: ["user1@example.com"],
      subject: "Hello User 1!",
      html: "<p>Hello User 1!</p>",
    },
    {
      from: "hello@yourdomain.com",
      to: ["user2@example.com"],
      subject: "Hello User 2!",
      html: "<p>Hello User 2!</p>",
    },
  ],
});
```

#### retrieveEmail

Retrieve details of a single email by ID.

**Parameters:**

- `id` (string, required): The email ID to retrieve

**Example:**

```typescript
await executeFunction("retrieveEmail", {
  id: "49a3999c-0ce1-4ea6-ab68-afcd6dc2e794",
});
```

#### updateEmail

Update a scheduled email.

**Parameters:**

- `id` (string, required): The email ID to update
- `scheduled_at` (string, optional): New scheduled time

**Example:**

```typescript
await executeFunction("updateEmail", {
  id: "49a3999c-0ce1-4ea6-ab68-afcd6dc2e794",
  scheduled_at: "in 2 hours",
});
```

#### cancelEmail

Cancel a scheduled email.

**Parameters:**

- `id` (string, required): The email ID to cancel

**Example:**

```typescript
await executeFunction("cancelEmail", {
  id: "49a3999c-0ce1-4ea6-ab68-afcd6dc2e794",
});
```

## Environment Variables

You can set your Resend API key as an environment variable:

```bash
RESEND_API_KEY=your-resend-api-key
```

Then use it in your code:

```typescript
const resendTools = new ResendTools(process.env.RESEND_API_KEY!);
```

## Error Handling

All functions include proper error handling and will throw descriptive errors:

```typescript
try {
  const result = await executeFunction("sendEmail", {
    from: "invalid-email",
    to: ["user@example.com"],
    subject: "Test",
  });
} catch (error) {
  console.error("Failed to send email:", error.message);
}
```

## TypeScript Support

This package includes full TypeScript support with proper type definitions:

```typescript
import type {
  SendEmailParams,
  EmailResponse,
  EmailDetails,
} from "@tooly/resend";
```

## Requirements

- Node.js 18+
- A Resend API key (get one at [resend.com](https://resend.com))
- A verified domain in Resend (for sending from your own domain)

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
