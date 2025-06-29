'use client'

import { useState } from 'react'
import { useToolkit, toolkits } from './toolkit-context'

const frameworks = [
  {
    name: 'AI SDK',
    import: "import { generateText } from 'ai'\nimport { openai } from '@ai-sdk/openai'",
    code: `const result = await generateText({
  model: openai('gpt-4o'),
  messages: [
    {
      role: 'user',
      content: '{{useCase}}',
    },
  ],
  tools,
})`,
  },
  {
    name: 'OpenAI SDK',
    import: "import OpenAI from 'openai'",
    code: `const openai = new OpenAI()

const result = await openai.chat.completions.create({
  model: 'gpt-4o',
  messages: [
    {
      role: 'user',
      content: '{{useCase}}',
    },
  ],
  tools: Object.values(tools),
})`,
  },
  {
    name: 'Anthropic SDK',
    import: "import Anthropic from '@anthropic-ai/sdk'",
    code: `const anthropic = new Anthropic()

const result = await anthropic.messages.create({
  model: 'claude-3-5-sonnet-20241022',
  max_tokens: 1024,
  messages: [
    {
      role: 'user',
      content: '{{useCase}}',
    },
  ],
  tools: Object.values(tools),
})`,
  },
]

export function FrameworkSelector() {
  const [selectedFramework, setSelectedFramework] = useState(0)
  const { primaryToolkit } = useToolkit()

  const currentFramework = frameworks[selectedFramework]

  const generateCode = () => {
    return `${currentFramework.import}
import { createAITools } from '${primaryToolkit.package}'

const tools = createAITools('your-api-key')

${currentFramework.code.replace('{{useCase}}', primaryToolkit.useCase)}`
  }

  return (
    <div className="space-y-6">
      {/* Framework Selector */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-foreground">Choose an AI framework:</label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {frameworks.map((framework, index) => (
            <button
              key={framework.name}
              onClick={() => setSelectedFramework(index)}
              className={`p-3 rounded-lg border text-left transition-all ${
                selectedFramework === index
                  ? 'bg-slate-100 border-slate-400 text-slate-900 dark:bg-slate-800/50 dark:border-slate-600 dark:text-slate-100'
                  : 'bg-card border-border hover:bg-accent hover:text-accent-foreground'
              }`}
            >
              <div className="font-medium">{framework.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Code Display */}
      <div className="relative">
        <pre className="bg-slate-50 dark:bg-slate-900 border rounded-lg p-4 overflow-x-auto text-sm">
          <code className="text-slate-800 dark:text-slate-200">{generateCode()}</code>
        </pre>
      </div>
    </div>
  )
}
