'use client'

import { useState, useEffect } from 'react'
import { useToolkit, toolkits } from './toolkit-context'
import ShikiHighlighter from 'react-shiki'

const frameworks = [
  {
    name: 'AI SDK',
    import: "import { generateText } from 'ai'\nimport { openai } from '@ai-sdk/openai'",
    code: `const result = await generateText({
  model: openai('gpt-4.1-nano'),
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
  const [isDark, setIsDark] = useState(false)
  const { primaryToolkit } = useToolkit()

  // Detect theme changes
  useEffect(() => {
    const checkTheme = () => {
      const isDarkMode =
        document.documentElement.classList.contains('dark') || window.matchMedia('(prefers-color-scheme: dark)').matches
      setIsDark(isDarkMode)
    }

    // Initial check
    checkTheme()

    // Listen for theme changes
    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', checkTheme)

    return () => {
      observer.disconnect()
      mediaQuery.removeEventListener('change', checkTheme)
    }
  }, [])

  const currentFramework = frameworks[selectedFramework]

  const generateCode = () => {
    return `${currentFramework.import}
import { createAITools } from '${primaryToolkit.package}'

const tools = createAITools('your-api-key')

${currentFramework.code.replace('{{useCase}}', primaryToolkit.useCase)}`
  }

  return (
    <div className="space-y-6">
      {/* Code Display with Syntax Highlighting */}
      <div className="relative">
        <ShikiHighlighter
          language="typescript"
          theme={isDark ? 'github-dark' : 'github-light'}
          className="rounded-lg border text-sm"
          style={{
            fontSize: '0.875rem',
            lineHeight: '1.25rem',
          }}
        >
          {generateCode()}
        </ShikiHighlighter>
      </div>

      {/* Framework Selector */}
      {/* <div className="space-y-3">
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
      </div> */}
    </div>
  )
}
