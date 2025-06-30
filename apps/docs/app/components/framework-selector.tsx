'use client'

import { useState, useEffect, useRef } from 'react'
import { useToolkit, toolkits } from './toolkit-context'
import ShikiHighlighter from 'react-shiki'
import { AiLogo } from '@private/ui/logos/ai'
import { OpenAiLogo } from '@private/ui/logos/openai'
import { AnthropicLogo } from '@private/ui/logos/anthropic'

const frameworks = [
  {
    name: 'AI SDK',
    logo: AiLogo,
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
    name: 'OpenAI',
    logo: OpenAiLogo,
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
    name: 'Anthropic',
    logo: AnthropicLogo,
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
  const codeContainerRef = useRef<HTMLDivElement>(null)

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

  // Handle mobile width constraints
  useEffect(() => {
    const handleResize = () => {
      if (codeContainerRef.current) {
        const container = codeContainerRef.current
        const pre = container.querySelector('pre')
        if (pre) {
          // Get the viewport width
          const viewportWidth = window.innerWidth
          // Set max width to viewport width minus some padding
          const maxWidth = Math.max(300, viewportWidth - 32) // 32px for padding
          pre.style.maxWidth = `${maxWidth}px`
          pre.style.overflowX = 'auto'
          pre.style.whiteSpace = 'pre'
          pre.style.wordWrap = 'normal'
        }
      }
    }

    // Initial setup
    const timer = setTimeout(handleResize, 100) // Small delay to ensure DOM is ready

    // Listen for window resize
    window.addEventListener('resize', handleResize)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', handleResize)
    }
  }, [selectedFramework, primaryToolkit]) // Re-run when code changes

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
      <div ref={codeContainerRef} className="relative">
        <ShikiHighlighter
          language="typescript"
          theme={isDark ? 'github-dark' : 'github-light'}
          className="text-sm rounded-lg border"
          style={{
            fontSize: '0.875rem',
            lineHeight: '1.25rem',
          }}
        >
          {generateCode()}
        </ShikiHighlighter>
      </div>

      {/* Framework Selector */}
      <div className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {frameworks.map((framework, index) => {
            const LogoComponent = framework.logo
            return (
              <button
                key={framework.name}
                onClick={() => setSelectedFramework(index)}
                className={`p-3 rounded-lg border text-left transition-all ${
                  selectedFramework === index
                    ? 'bg-slate-100 border-slate-400 text-slate-900 dark:bg-slate-800/50 dark:border-slate-600 dark:text-slate-100'
                    : 'bg-card border-border hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                <div className="flex items-center gap-2 justify-center">
                  <LogoComponent className="w-5 h-5" />
                  <div className="font-medium">{framework.name}</div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
