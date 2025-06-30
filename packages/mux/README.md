# @tooly/mux

Mux API API tools for OpenAI, Anthropic, and AI SDK integration.

## Installation

```bash
npm install @tooly/mux
```

## Usage

### Basic Setup

```typescript
import { createAITools } from '@tooly/mux'

const tools = createAITools('your-mux-api-key')
```

### With AI SDK

```typescript
import { createAITools } from '@tooly/mux'
import { generateText } from 'ai'
import { openai } from '@ai-sdk/openai'

const tools = createAITools(process.env.MUX_API_KEY!)

const result = await generateText({
  model: openai('gpt-4.1-nano'),
  prompt: 'Help me with Mux API API',
  tools,
})
```

### With OpenAI

```typescript
import { createOpenAIFunctions } from '@tooly/mux'
import OpenAI from 'openai'

const openai = new OpenAI()
const { functions, handleFunctionCall } = createOpenAIFunctions(process.env.MUX_API_KEY!)

const response = await openai.chat.completions.create({
  model: 'gpt-4',
  messages: [{ role: 'user', content: 'Help me with Mux API' }],
  functions,
})

// Handle function calls
const functionCall = response.choices[0].message.function_call
if (functionCall) {
  const result = await handleFunctionCall(functionCall.name, functionCall.arguments)
}
```

### With Anthropic

```typescript
import { createAnthropicTools } from '@tooly/mux'
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic()
const { tools, handleToolCall } = createAnthropicTools(process.env.MUX_API_KEY!)

const response = await anthropic.messages.create({
  model: 'claude-3-5-sonnet-20241022',
  max_tokens: 1000,
  messages: [{ role: 'user', content: 'Help me with Mux API' }],
  tools,
})

// Handle tool calls
for (const content of response.content) {
  if (content.type === 'tool_use') {
    const result = await handleToolCall(content.name, content.input)
  }
}
```

## Available Tools

- **list-video-views**: List Video Views
- **get-video-view**: Get a Video View
- **list-errors**: List Errors
- **list-filters**: List Filters
- **list-filter-values**: Lists values for a specific filter
- **list-dimensions**: List Dimensions
- **list-dimension-values**: Lists the values for a specific dimension
- **list-exports**: List property video view export links
- **list-exports-views**: List available property view exports
- **list-breakdown-values**: List breakdown values
- **get-overall-values**: Get Overall values
- **list-insights**: List Insights
- **get-metric-timeseries-data**: Get metric timeseries data
- **list-all-metric-values**: List all metric values
- **list-monitoring-dimensions**: List Monitoring Dimensions
- **list-monitoring-metrics**: List Monitoring Metrics
- **get-monitoring-breakdown**: Get Monitoring Breakdown
- **get-monitoring-breakdown-timeseries**: Get Monitoring Breakdown Timeseries
- **get-monitoring-histogram-timeseries**: Get Monitoring Histogram Timeseries
- **get-monitoring-timeseries**: Get Monitoring Timeseries
- **list-realtime-dimensions**: List Real-Time Dimensions
- **list-realtime-metrics**: List Real-Time Metrics
- **get-realtime-breakdown**: Get Real-Time Breakdown
- **get-realtime-histogram-timeseries**: Get Real-Time Histogram Timeseries
- **get-realtime-timeseries**: Get Real-Time Timeseries
- **list-incidents**: List Incidents
- **get-incident**: Get an Incident
- **list-related-incidents**: List Related Incidents
- **list-annotations**: List Annotations
- **create-annotation**: Create Annotation
- **get-annotation**: Get Annotation
- **update-annotation**: Update Annotation
- **delete-annotation**: Delete Annotation

## Direct Usage

```typescript
import { MuxTools } from '@tooly/mux'

const mux = new MuxTools('your-api-key')
const handlers = mux.getHandlers()

// Get a Video View
const result = await handlers.get-video-view({
  VIDEO_VIEW_ID: 'example-value',
})
```

## Environment Variables

Set your Mux API API key as an environment variable:

```bash
MUX_API_KEY=your_api_key_here
```

## License

MIT 