'use client'

import { useState } from 'react'

const toolkits = [
  {
    name: 'Resend',
    package: '@tooly/resend',
    useCase: 'Send a welcome email to new users',
    description: 'Email automation',
  },
  {
    name: 'GitHub',
    package: '@tooly/github',
    useCase: 'Create an issue for the bug report',
    description: 'Repository management',
  },
  {
    name: 'Linear',
    package: '@tooly/linear',
    useCase: 'Create a task for the new feature request',
    description: 'Project management',
  },
  {
    name: 'Notion',
    package: '@tooly/notion',
    useCase: 'Create a new page in the knowledge base',
    description: 'Content management',
  },
  {
    name: 'Supabase',
    package: '@tooly/supabase',
    useCase: 'Query user data from the database',
    description: 'Database operations',
  },
  {
    name: 'Twilio',
    package: '@tooly/twilio',
    useCase: 'Send an SMS notification to the user',
    description: 'Communication',
  },
]

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

export function CodeExample() {
  const [selectedToolkit, setSelectedToolkit] = useState(0)
  const [selectedFramework, setSelectedFramework] = useState(0)

  const currentToolkit = toolkits[selectedToolkit]
  const currentFramework = frameworks[selectedFramework]

  const generateCode = () => {
    return `${currentFramework.import}
import { createAITools } from '${currentToolkit.package}'

const tools = createAITools('your-api-key')

${currentFramework.code.replace('{{useCase}}', currentToolkit.useCase)}`
  }

  return (
    <div className="space-y-6">
      {/* Toolkit Selector */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-foreground">Choose a toolkit:</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {toolkits.map((toolkit, index) => (
            <button
              key={toolkit.name}
              onClick={() => setSelectedToolkit(index)}
              className={`p-3 rounded-lg border text-left transition-all ${
                selectedToolkit === index
                  ? 'bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-950/50 dark:border-blue-800 dark:text-blue-100'
                  : 'bg-card border-border hover:bg-accent hover:text-accent-foreground'
              }`}
            >
              <div className="font-medium text-sm">{toolkit.name}</div>
              <div className="text-xs text-muted-foreground mt-1">{toolkit.description}</div>
            </button>
          ))}
        </div>
      </div>

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
                  ? 'bg-purple-50 border-purple-200 text-purple-900 dark:bg-purple-950/50 dark:border-purple-800 dark:text-purple-100'
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
