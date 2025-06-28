# @tooly/supabase

Supabase API tools for AI applications, compatible with OpenAI function calling, Anthropic tool use, and AI SDK.

## Installation

```bash
npm install @tooly/supabase
# or
yarn add @tooly/supabase
# or
pnpm add @tooly/supabase
```

## Setup

Get your Supabase URL and API key from your [Supabase project dashboard](https://supabase.com/dashboard).

## Usage

### Basic Usage

```typescript
import { SupabaseTools } from '@tooly/supabase'

const supabase = new SupabaseTools('your-supabase-url', 'your-supabase-anon-key')

// Get available tools for function calling
const tools = supabase.getTools()

// Execute a function
const result = await supabase.executeFunction('selectData', {
  table: 'users',
  columns: ['id', 'name', 'email'],
  limit: 10,
})
```

### AI SDK

```typescript
import { createAITools } from '@tooly/supabase'

const tools = createAITools('your-supabase-url', 'your-supabase-anon-key')

// Use with generateText
import { generateText } from 'ai'

const result = await generateText({
  model: openai('gpt-4-turbo'),
  messages: [{ role: 'user', content: 'Show me all users from the database' }],
  tools,
})
```

### OpenAI Function Calling

```typescript
import { createOpenAIFunctions } from '@tooly/supabase'

const { tools, executeFunction } = createOpenAIFunctions('your-supabase-url', 'your-supabase-anon-key')

// Use with OpenAI client
const completion = await openai.chat.completions.create({
  model: 'gpt-4-turbo',
  messages: [{ role: 'user', content: 'Create a new user in the database' }],
  tools,
})

// Execute function calls
for (const toolCall of completion.choices[0].message.tool_calls || []) {
  const result = await executeFunction(toolCall.function.name, JSON.parse(toolCall.function.arguments))
}
```

### Anthropic Tool Use

```typescript
import { createAnthropicTools } from '@tooly/supabase'

const { tools, executeFunction } = createAnthropicTools('your-supabase-url', 'your-supabase-anon-key')

// Use with Anthropic client
const message = await anthropic.messages.create({
  model: 'claude-3-5-sonnet-20241022',
  messages: [{ role: 'user', content: 'Upload a file to storage' }],
  tools,
})

// Execute tool calls
for (const toolUse of message.content.filter((c) => c.type === 'tool_use')) {
  const result = await executeFunction(toolUse.name, toolUse.input)
}
```

## Available Tools

### Database Operations

- `selectData` - Query data from tables with filters, sorting, and pagination
- `insertData` - Insert new records into tables
- `updateData` - Update existing records in tables
- `deleteData` - Delete records from tables
- `upsertData` - Insert or update records (upsert operation)

### Authentication

- `signUp` - Create a new user account
- `signIn` - Sign in a user with email and password
- `signOut` - Sign out the current user
- `getUser` - Get current authenticated user information

### Storage

- `uploadFile` - Upload files to Supabase Storage
- `downloadFile` - Download files from Supabase Storage
- `listFiles` - List files in storage buckets
- `createBucket` - Create new storage buckets

## Examples

### Database Operations

```typescript
// Select data with filters
await supabase.executeFunction('selectData', {
  table: 'posts',
  columns: ['id', 'title', 'created_at'],
  filters: [
    { column: 'published', operator: 'eq', value: true },
    { column: 'created_at', operator: 'gte', value: '2024-01-01' },
  ],
  orderBy: { column: 'created_at', ascending: false },
  limit: 20,
})

// Insert new data
await supabase.executeFunction('insertData', {
  table: 'users',
  data: { name: 'John Doe', email: 'john@example.com' },
})

// Update data
await supabase.executeFunction('updateData', {
  table: 'users',
  data: { name: 'Jane Doe' },
  filters: [{ column: 'id', operator: 'eq', value: 123 }],
})
```

### Authentication

```typescript
// Sign up new user
await supabase.executeFunction('signUp', {
  email: 'user@example.com',
  password: 'secure-password',
  options: {
    data: { full_name: 'John Doe' },
    emailRedirectTo: 'https://example.com/welcome',
  },
})

// Sign in user
await supabase.executeFunction('signIn', {
  email: 'user@example.com',
  password: 'secure-password',
})
```

### Storage

```typescript
// Upload file
await supabase.executeFunction('uploadFile', {
  bucket: 'avatars',
  path: 'user-123/profile.jpg',
  file: fileData,
  options: {
    contentType: 'image/jpeg',
    upsert: true,
  },
})

// List files
await supabase.executeFunction('listFiles', {
  bucket: 'documents',
  path: 'folder/',
  options: {
    limit: 50,
    sortBy: { column: 'created_at', order: 'desc' },
  },
})
```

## License

MIT
