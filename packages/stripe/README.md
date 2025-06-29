# @tooly/stripe

Stripe API tools for OpenAI, Anthropic, and AI SDK integration.

## Installation

```bash
npm install @tooly/stripe
```

## Usage

### AI SDK Integration

```typescript
import { generateText } from 'ai'
import { openai } from '@ai-sdk/openai'
import { createAITools } from '@tooly/stripe'

const tools = createAITools(process.env.STRIPE_SECRET_KEY!)

const result = await generateText({
  model: openai('gpt-4.1-nano'),
  messages: [
    {
      role: 'user',
      content: 'Create a customer for John Doe with email john@example.com',
    },
  ],
  tools,
})

console.log(result.text)
```

### OpenAI Integration

```typescript
import OpenAI from 'openai'
import { createOpenAIFunctions } from '@tooly/stripe'

const openai = new OpenAI()
const { functions, callHandler } = createOpenAIFunctions(process.env.STRIPE_SECRET_KEY!)

const response = await openai.chat.completions.create({
  model: 'gpt-4',
  messages: [{ role: 'user', content: 'Create a new customer' }],
  functions,
})

// Handle function calls
for (const choice of response.choices) {
  if (choice.message.function_call) {
    const result = await callHandler(choice.message.function_call)
    console.log(result)
  }
}
```

### Direct Usage

```typescript
import { StripeTools } from '@tooly/stripe'

const stripe = new StripeTools(process.env.STRIPE_SECRET_KEY!)

// Create a customer
const customer = await stripe.execute('createCustomer', {
  email: 'john@example.com',
  name: 'John Doe',
})

// Create a payment intent
const paymentIntent = await stripe.execute('createPaymentIntent', {
  amount: 2000, // $20.00 in cents
  currency: 'usd',
  customer: customer.id,
})
```

## Available Tools

### Customer Management

- **createCustomer**: Create a new customer
- **getCustomer**: Retrieve customer details
- **listCustomers**: List customers with filtering

### Payment Processing

- **createPaymentIntent**: Create a payment intent
- **getPaymentIntent**: Retrieve payment intent details

### Invoice Management

- **createInvoice**: Create an invoice
- **getInvoice**: Retrieve invoice details

## Setup

1. Get your Stripe API keys from the [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
2. Set your secret key as an environment variable:

```bash
STRIPE_SECRET_KEY=sk_test_...
```

## Error Handling

All tools include comprehensive error handling and will throw descriptive errors when operations fail.

## License

MIT
