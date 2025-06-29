# @tooly/jira

JIRA API tools for AI applications, compatible with OpenAI function calling, Anthropic tool use, and AI SDK.

## Installation

```bash
npm install @tooly/jira
# or
yarn add @tooly/jira
# or
pnpm add @tooly/jira
```

## Setup

You'll need your JIRA server details and authentication credentials. This package supports both JIRA Server/Data Center and JIRA Cloud:

### JIRA Cloud

```typescript
const config = {
  protocol: 'https',
  host: 'your-domain.atlassian.net',
  username: 'your-email@example.com',
  password: 'your-api-token', // Create at https://id.atlassian.com/manage-profile/security/api-tokens
  apiVersion: '2',
  strictSSL: true,
}
```

### JIRA Server/Data Center

```typescript
const config = {
  protocol: 'https',
  host: 'your-jira-server.com',
  username: 'your-username',
  password: 'your-password',
  apiVersion: '2',
  strictSSL: true,
}
```

## Usage

### Basic Usage

```typescript
import { JiraTools } from '@tooly/jira'

const jira = new JiraTools({
  protocol: 'https',
  host: 'your-domain.atlassian.net',
  username: 'your-email@example.com',
  password: 'your-api-token',
  apiVersion: '2',
})

// Get available tools for function calling
const tools = jira.getTools()

// Execute a function
const result = await jira.executeFunction('createIssue', {
  projectKey: 'PROJ',
  summary: 'New bug report',
  description: 'Bug description here',
  issueType: 'Bug',
})
```

### AI SDK

```typescript
import { createAITools } from '@tooly/jira'

const tools = createAITools({
  protocol: 'https',
  host: 'your-domain.atlassian.net',
  username: 'your-email@example.com',
  password: 'your-api-token',
  apiVersion: '2',
})

// Use with generateText
import { generateText } from 'ai'

const result = await generateText({
  model: openai('gpt-4'),
  messages: [{ role: 'user', content: 'Create a new issue' }],
  tools,
})
```

### OpenAI Function Calling

```typescript
import { createOpenAIFunctions } from '@tooly/jira'

const { tools, executeFunction } = createOpenAIFunctions({
  protocol: 'https',
  host: 'your-domain.atlassian.net',
  username: 'your-email@example.com',
  password: 'your-api-token',
  apiVersion: '2',
})

// Use with OpenAI client
const completion = await openai.chat.completions.create({
  model: 'gpt-4',
  messages: [{ role: 'user', content: 'List my assigned issues' }],
  tools,
})

// Execute function calls
for (const toolCall of completion.choices[0].message.tool_calls || []) {
  const result = await executeFunction(toolCall.function.name, JSON.parse(toolCall.function.arguments))
}
```

### Anthropic Tool Use

```typescript
import { createAnthropicTools } from '@tooly/jira'

const { tools, executeFunction } = createAnthropicTools({
  protocol: 'https',
  host: 'your-domain.atlassian.net',
  username: 'your-email@example.com',
  password: 'your-api-token',
  apiVersion: '2',
})

// Use with Anthropic client
const message = await anthropic.messages.create({
  model: 'claude-3-5-sonnet-20241022',
  messages: [{ role: 'user', content: 'Create a new project' }],
  tools,
})

// Execute tool calls
for (const toolUse of message.content.filter((c) => c.type === 'tool_use')) {
  const result = await executeFunction(toolUse.name, toolUse.input)
}
```

## Available Tools

- `createIssue` - Create a new issue in JIRA
- `getIssue` - Get issue details by key (e.g., "PROJ-123")
- `updateIssue` - Update an existing issue
- `searchIssues` - Search for issues using JQL or filters
- `getProjects` - Get all accessible JIRA projects
- `getUser` - Get current user details or specific user by account ID

## Examples

### Creating an Issue

```typescript
await jira.executeFunction('createIssue', {
  projectKey: 'PROJ',
  summary: 'Fix login bug',
  description: 'Users cannot log in with special characters in password',
  issueType: 'Bug',
  priority: 'High',
  assignee: 'user-account-id',
  labels: ['urgent', 'login'],
})
```

### Searching Issues

```typescript
// Using JQL
await jira.executeFunction('searchIssues', {
  jql: 'project = PROJ AND assignee = currentUser() AND status != Done',
})

// Using filters
await jira.executeFunction('searchIssues', {
  projectKey: 'PROJ',
  assignee: 'user-account-id',
  status: 'In Progress',
  maxResults: 10,
})
```

### Updating an Issue

```typescript
await jira.executeFunction('updateIssue', {
  issueKey: 'PROJ-123',
  summary: 'Updated issue summary',
  status: 'In Progress',
  assignee: 'new-user-account-id',
})
```

## License

MIT
