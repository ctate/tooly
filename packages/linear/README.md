# @tooly/linear

Linear API tools for AI applications, compatible with OpenAI function calling, Anthropic tool use, and Vercel AI SDK.

## Installation

```bash
npm install @tooly/linear
# or
yarn add @tooly/linear
# or
pnpm add @tooly/linear
```

## Setup

Get your Linear API key from your [Linear settings](https://linear.app/settings/api).

## Usage

### Basic Usage

```typescript
import { LinearTools } from "@tooly/linear";

const linear = new LinearTools("your-linear-api-key");

// Get available tools for function calling
const tools = linear.getTools();

// Execute a function
const result = await linear.executeFunction("createIssue", {
  title: "New bug report",
  description: "Bug description here",
  teamId: "team-id-here",
});
```

### Vercel AI SDK

```typescript
import { createVercelAITools } from "@tooly/linear";

const tools = createVercelAITools("your-linear-api-key");

// Use with generateText
import { generateText } from "ai";

const result = await generateText({
  model: openai("gpt-4"),
  messages: [{ role: "user", content: "Create a new issue" }],
  tools,
});
```

### OpenAI Function Calling

```typescript
import { createOpenAIFunctions } from "@tooly/linear";

const { tools, executeFunction } = createOpenAIFunctions("your-linear-api-key");

// Use with OpenAI client
const completion = await openai.chat.completions.create({
  model: "gpt-4",
  messages: [{ role: "user", content: "List my assigned issues" }],
  tools,
});

// Execute function calls
for (const toolCall of completion.choices[0].message.tool_calls || []) {
  const result = await executeFunction(
    toolCall.function.name,
    JSON.parse(toolCall.function.arguments)
  );
}
```

### Anthropic Tool Use

```typescript
import { createAnthropicTools } from "@tooly/linear";

const { tools, executeFunction } = createAnthropicTools("your-linear-api-key");

// Use with Anthropic client
const message = await anthropic.messages.create({
  model: "claude-3-sonnet-20240229",
  messages: [{ role: "user", content: "Create a new project" }],
  tools,
});

// Execute tool calls
for (const toolUse of message.content.filter((c) => c.type === "tool_use")) {
  const result = await executeFunction(toolUse.name, toolUse.input);
}
```

## Available Tools

- `createIssue` - Create a new issue
- `getIssue` - Get issue details by ID
- `updateIssue` - Update an existing issue
- `searchIssues` - Search for issues
- `createProject` - Create a new project
- `getTeams` - Get all teams
- `getUser` - Get current user details

## License

MIT
