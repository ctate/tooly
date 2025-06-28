# @tooly/twilio

Twilio API tools for AI applications, compatible with OpenAI function calling, Anthropic tool use, and AI SDK.

## Installation

```bash
npm install @tooly/twilio
# or
yarn add @tooly/twilio
# or
pnpm add @tooly/twilio
```

## Setup

Get your Twilio Account SID and Auth Token from your [Twilio Console](https://console.twilio.com/).

## Usage

### Basic Usage

```typescript
import { TwilioTools } from '@tooly/twilio'

const twilio = new TwilioTools('your-account-sid', 'your-auth-token')

// Get available tools for function calling
const tools = twilio.getTools()

// Execute a function
const result = await twilio.executeFunction('sendSms', {
  to: '+1234567890',
  body: 'Hello from Twilio!',
  from: '+0987654321',
})
```

### AI SDK

```typescript
import { createAITools } from '@tooly/twilio'

const tools = createAITools('your-account-sid', 'your-auth-token')

// Use with generateText
import { generateText } from 'ai'

const result = await generateText({
  model: openai('gpt-4-turbo'),
  messages: [{ role: 'user', content: 'Send an SMS to +1234567890 saying hello' }],
  tools,
})
```

### OpenAI Function Calling

```typescript
import { createOpenAIFunctions } from '@tooly/twilio'

const { tools, executeFunction } = createOpenAIFunctions('your-account-sid', 'your-auth-token')

// Use with OpenAI client
const completion = await openai.chat.completions.create({
  model: 'gpt-4-turbo',
  messages: [{ role: 'user', content: 'Make a call to +1234567890' }],
  tools,
})

// Execute function calls
for (const toolCall of completion.choices[0].message.tool_calls || []) {
  const result = await executeFunction(toolCall.function.name, JSON.parse(toolCall.function.arguments))
}
```

### Anthropic Tool Use

```typescript
import { createAnthropicTools } from '@tooly/twilio'

const { tools, executeFunction } = createAnthropicTools('your-account-sid', 'your-auth-token')

// Use with Anthropic client
const message = await anthropic.messages.create({
  model: 'claude-3-sonnet-20240229',
  messages: [{ role: 'user', content: 'Send a WhatsApp message' }],
  tools,
})

// Execute tool calls
for (const toolUse of message.content.filter((c) => c.type === 'tool_use')) {
  const result = await executeFunction(toolUse.name, toolUse.input)
}
```

## Available Tools

- `sendSms` - Send SMS text messages
- `sendWhatsApp` - Send WhatsApp messages
- `makeCall` - Make phone calls with TwiML
- `getCallStatus` - Get call status and details
- `getMessageStatus` - Get message status and details
- `listMessages` - List messages with filtering
- `listCalls` - List calls with filtering
- `getPhoneNumber` - Get phone number details and validation

## Examples

### Send SMS

```typescript
await twilio.executeFunction('sendSms', {
  to: '+1234567890',
  from: '+0987654321',
  body: 'Hello from Twilio!',
})
```

### Make a Call

```typescript
await twilio.executeFunction('makeCall', {
  to: '+1234567890',
  from: '+0987654321',
  url: 'https://your-server.com/twiml',
})
```

### Send WhatsApp Message

```typescript
await twilio.executeFunction('sendWhatsApp', {
  to: 'whatsapp:+1234567890',
  from: 'whatsapp:+0987654321',
  body: 'Hello via WhatsApp!',
})
```

### Get Phone Number Details

```typescript
await twilio.executeFunction('getPhoneNumber', {
  phoneNumber: '+1234567890',
})
```

## License

MIT
