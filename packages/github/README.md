# @tooly/github

GitHub API tools for OpenAI, Anthropic, and AI SDK.

## Installation

```bash
npm install @tooly/github
```

## Usage

### With AI SDK

```typescript
import { createAITools } from '@tooly/github'

const tools = createAITools('your-github-token')

// Use with AI SDK
import { generateText } from 'ai'

const result = await generateText({
  model: openai('gpt-4'),
  tools,
  prompt: 'Create a new issue in my repo called "Fix bug in login"',
})
```

### With OpenAI

```typescript
import { createOpenAIFunctions } from '@tooly/github'

const { functions, callFunction } = createOpenAIFunctions('your-github-token')

// Use with OpenAI client
const response = await openai.chat.completions.create({
  model: 'gpt-4',
  messages: [{ role: 'user', content: 'Create an issue in my repository' }],
  functions,
})

// Handle function calls
if (response.choices[0].message.function_call) {
  const result = await callFunction(response.choices[0].message.function_call)
}
```

### Direct Usage

```typescript
import { GitHubTools } from '@tooly/github'

const github = new GitHubTools('your-github-token')

// Create an issue
const issue = await github.getHandlers().createIssue({
  owner: 'username',
  repo: 'repository',
  title: 'Bug report',
  body: 'Description of the bug',
  labels: ['bug', 'high-priority'],
})

console.log(`Created issue #${issue.number}`)
```

## Available Tools

### Issues

- `createIssue` - Create a new issue in a repository
- `getIssue` - Get details of a specific issue
- `updateIssue` - Update an existing issue
- `searchIssues` - Search for issues using various filters

### Repositories

- `getRepository` - Get details of a repository

### Users

- `getUser` - Get user details (authenticated user or by username)

## Authentication

You need a GitHub personal access token to use this package. You can create one at:
https://github.com/settings/tokens

The token needs the following scopes:

- `repo` - Full control of private repositories
- `public_repo` - Access public repositories
- `user` - Read user profile data

## License

MIT
