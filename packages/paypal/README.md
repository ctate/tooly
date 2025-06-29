# @tooly/paypal

PayPal API tools for AI applications, compatible with OpenAI function calling, Anthropic tool use, and AI SDK.

## Installation

```bash
npm install @tooly/paypal
# or
yarn add @tooly/paypal
# or
pnpm add @tooly/paypal
```

## Setup

Get your PayPal client ID and secret from your [PayPal Developer Dashboard](https://developer.paypal.com/developer/applications/).

## Usage

### Basic Usage

```typescript
import { PayPalTools } from '@tooly/paypal'

const paypal = new PayPalTools('client-id', 'client-secret', 'sandbox') // or 'live'

// Get available tools for function calling
const tools = paypal.getTools()

// Execute a function
const result = await paypal.executeFunction('createOrder', {
  intent: 'CAPTURE',
  purchase_units: [
    {
      amount: {
        currency_code: 'USD',
        value: '10.00',
      },
    },
  ],
})
```

### AI SDK

```typescript
import { createAITools } from '@tooly/paypal'

const tools = createAITools('client-id', 'client-secret', 'sandbox')

// Use with generateText
import { generateText } from 'ai'

const result = await generateText({
  model: openai('gpt-4.1-nano'),
  messages: [{ role: 'user', content: 'Create a payment order for $50' }],
  tools,
})
```

### OpenAI Function Calling

```typescript
import { createOpenAIFunctions } from '@tooly/paypal'

const { tools, executeFunction } = createOpenAIFunctions('client-id', 'client-secret', 'sandbox')

// Use with OpenAI client
const completion = await openai.chat.completions.create({
  model: 'gpt-4.1-nano',
  messages: [{ role: 'user', content: 'Create an order and capture payment' }],
  tools,
})

// Execute function calls
for (const toolCall of completion.choices[0].message.tool_calls || []) {
  const result = await executeFunction(toolCall.function.name, JSON.parse(toolCall.function.arguments))
}
```

### Anthropic Tool Use

```typescript
import { createAnthropicTools } from '@tooly/paypal'

const { tools, executeFunction } = createAnthropicTools('client-id', 'client-secret', 'sandbox')

// Use with Anthropic client
const message = await anthropic.messages.create({
  model: 'claude-sonnet-4-20250514',
  messages: [{ role: 'user', content: 'Process a refund for order' }],
  tools,
})

// Execute tool calls
for (const toolUse of message.content.filter((c) => c.type === 'tool_use')) {
  const result = await executeFunction(toolUse.name, toolUse.input)
}
```

## Available Tools

- `createOrder` - Create a new payment order
- `showOrderDetails` - Get order details by ID
- `captureOrder` - Capture payment for an order
- `authorizeOrder` - Authorize payment for an order
- `showAuthorizedPayment` - Show authorized payment details
- `captureAuthorizedPayment` - Capture an authorized payment
- `voidAuthorizedPayment` - Void an authorized payment
- `reauthorizePayment` - Reauthorize an authorized payment
- `showCapturedPayment` - Show captured payment details
- `refundCapturedPayment` - Refund a captured payment
- `showRefundDetails` - Show refund details

## License

MIT
