'use client'

import { useState, useEffect } from 'react'

interface ApiKeys {
  openai: string
  resend: string
  github: string
  linear: string
  notion: string
  supabase: string
  twilio: string
}

interface TestResult {
  success: boolean
  data?: any
  error?: string
  timestamp: number
}

const toolkits = [
  {
    name: 'Resend',
    key: 'resend' as keyof ApiKeys,
    placeholder: 're_...',
    testPrompt:
      'Send a test email to hello@example.com with subject "Test from Tooly" and body "This is a test email from the Tooly playground."',
    package: '@tooly/resend',
  },
  {
    name: 'GitHub',
    key: 'github' as keyof ApiKeys,
    placeholder: 'ghp_...',
    testPrompt: 'List my GitHub repositories',
    package: '@tooly/github',
  },
  {
    name: 'Linear',
    key: 'linear' as keyof ApiKeys,
    placeholder: 'lin_api_...',
    testPrompt: 'List my Linear teams',
    package: '@tooly/linear',
  },
  {
    name: 'Notion',
    key: 'notion' as keyof ApiKeys,
    placeholder: 'secret_...',
    testPrompt: 'Search for pages in my Notion workspace',
    package: '@tooly/notion',
  },
  {
    name: 'Supabase',
    key: 'supabase' as keyof ApiKeys,
    placeholder: 'eyJ...',
    testPrompt: 'Get current user information from Supabase',
    package: '@tooly/supabase',
  },
  {
    name: 'Twilio',
    key: 'twilio' as keyof ApiKeys,
    placeholder: 'AC...',
    testPrompt: 'List my Twilio phone numbers',
    package: '@tooly/twilio',
  },
]

export function Playground() {
  const [apiKeys, setApiKeys] = useState<ApiKeys>({
    openai: '',
    resend: '',
    github: '',
    linear: '',
    notion: '',
    supabase: '',
    twilio: '',
  })

  const [selectedTool, setSelectedTool] = useState(0)
  const [customPrompt, setCustomPrompt] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [testResult, setTestResult] = useState<TestResult | null>(null)

  // Load API keys from localStorage on mount
  useEffect(() => {
    const savedKeys = localStorage.getItem('tooly-playground-keys')
    if (savedKeys) {
      try {
        setApiKeys(JSON.parse(savedKeys))
      } catch (e) {
        console.error('Failed to load saved API keys:', e)
      }
    }
  }, [])

  // Save API keys to localStorage when they change
  useEffect(() => {
    localStorage.setItem('tooly-playground-keys', JSON.stringify(apiKeys))
  }, [apiKeys])

  const updateApiKey = (key: keyof ApiKeys, value: string) => {
    setApiKeys((prev) => ({ ...prev, [key]: value }))
  }

  const getCurrentTool = () => toolkits[selectedTool]

  const runTest = async () => {
    const tool = getCurrentTool()
    const prompt = customPrompt || tool.testPrompt

    if (!apiKeys.openai) {
      alert('Please provide your OpenAI API key first')
      return
    }

    if (!apiKeys[tool.key]) {
      alert(`Please provide your ${tool.name} API key first`)
      return
    }

    setIsLoading(true)
    setTestResult(null)

    try {
      // Make real API call to our playground endpoint
      const response = await fetch('/api/playground', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          toolkit: tool.key,
          apiKeys,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'API request failed')
      }

      setTestResult(result)
    } catch (error) {
      setTestResult({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        timestamp: Date.now(),
      })
    } finally {
      setIsLoading(false)
    }
  }

  const clearKeys = () => {
    if (confirm('Are you sure you want to clear all API keys?')) {
      setApiKeys({
        openai: '',
        resend: '',
        github: '',
        linear: '',
        notion: '',
        supabase: '',
        twilio: '',
      })
      localStorage.removeItem('tooly-playground-keys')
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-4 border-b border-border pb-8">
        <div className="flex items-center justify-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Tooly Playground
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Test real AI integrations with your API keys. Experience the power of connecting AI models with real-world
          services in seconds.
        </p>
        <div className="flex items-center justify-center gap-4 text-sm">
          <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            <span>Keys stored locally</span>
          </div>
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>Real API calls</span>
          </div>
          <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              />
            </svg>
            <span>Generated code</span>
          </div>
        </div>
      </div>

      {/* API Keys Section */}
      <div className="border border-border rounded-lg bg-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">API Keys</h2>
          <button
            onClick={clearKeys}
            className="px-3 py-1 text-sm border border-border rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            Clear All
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {/* OpenAI Key */}
          <div className="space-y-2">
            <label className="text-sm font-medium">OpenAI API Key *</label>
            <input
              type="password"
              placeholder="sk-..."
              value={apiKeys.openai}
              onChange={(e) => updateApiKey('openai', e.target.value)}
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm"
            />
          </div>

          {/* Toolkit Keys */}
          {toolkits.map((toolkit) => (
            <div key={toolkit.key} className="space-y-2">
              <label className="text-sm font-medium">{toolkit.name} API Key</label>
              <input
                type="password"
                placeholder={toolkit.placeholder}
                value={apiKeys[toolkit.key]}
                onChange={(e) => updateApiKey(toolkit.key, e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Test Interface */}
      <div className="border border-border rounded-lg bg-card p-6">
        <h2 className="text-xl font-semibold mb-4">Test Integration</h2>

        {/* Tool Selection */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Tool to Test</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {toolkits.map((toolkit, index) => (
                <button
                  key={toolkit.name}
                  onClick={() => setSelectedTool(index)}
                  disabled={!apiKeys[toolkit.key]}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    selectedTool === index
                      ? 'bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-950/50 dark:border-blue-800 dark:text-blue-100'
                      : apiKeys[toolkit.key]
                        ? 'bg-card border-border hover:bg-accent hover:text-accent-foreground'
                        : 'bg-muted border-border text-muted-foreground cursor-not-allowed'
                  }`}
                >
                  <div className="font-medium text-sm">{toolkit.name}</div>
                  <div className="text-xs opacity-70">{toolkit.package}</div>
                  {!apiKeys[toolkit.key] && <div className="text-xs text-red-500 mt-1">API key required</div>}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Prompt */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Test Prompt</label>
            <textarea
              placeholder={getCurrentTool().testPrompt}
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm h-24 resize-none"
            />
            <p className="text-xs text-muted-foreground">
              Leave empty to use the default test prompt for {getCurrentTool().name}
            </p>
          </div>

          {/* Run Test Button */}
          <button
            onClick={runTest}
            disabled={isLoading || !apiKeys.openai || !apiKeys[getCurrentTool().key]}
            className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Making Real API Call...
              </div>
            ) : (
              `Test ${getCurrentTool().name} Integration`
            )}
          </button>
        </div>
      </div>

      {/* Results */}
      {testResult && (
        <div className="border border-border rounded-lg bg-card p-6">
          <h2 className="text-xl font-semibold mb-4">Test Result</h2>
          {testResult.success ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-medium">Success!</span>
              </div>
              <div className="space-y-4">
                {/* AI Response */}
                {testResult.data.text && (
                  <div>
                    <h4 className="font-medium text-sm mb-2">AI Response:</h4>
                    <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                      <p className="text-sm">{testResult.data.text}</p>
                    </div>
                  </div>
                )}

                {/* Tool Calls */}
                {testResult.data.toolCalls && testResult.data.toolCalls.length > 0 && (
                  <div>
                    <h4 className="font-medium text-sm mb-2">Tool Calls:</h4>
                    <div className="space-y-2">
                      {testResult.data.toolCalls.map((call: any, index: number) => (
                        <div key={index} className="bg-slate-50 dark:bg-slate-900 border rounded-lg p-3">
                          <div className="font-mono text-xs text-muted-foreground mb-1">{call.toolName}</div>
                          <pre className="text-sm overflow-x-auto">
                            <code>{JSON.stringify(call.args, null, 2)}</code>
                          </pre>
                          {call.result && (
                            <div className="mt-2 pt-2 border-t">
                              <div className="font-mono text-xs text-muted-foreground mb-1">Result:</div>
                              <pre className="text-sm overflow-x-auto">
                                <code>{JSON.stringify(call.result, null, 2)}</code>
                              </pre>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Usage Info */}
                {testResult.data.usage && (
                  <div className="text-xs text-muted-foreground">
                    Tokens used: {testResult.data.usage.totalTokens}({testResult.data.usage.promptTokens} prompt +{' '}
                    {testResult.data.usage.completionTokens} completion)
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span className="font-medium">Error</span>
              </div>
              <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <p className="text-red-800 dark:text-red-200 text-sm">{testResult.error}</p>
              </div>
            </div>
          )}
          <p className="text-xs text-muted-foreground mt-4">
            Tested at {new Date(testResult.timestamp).toLocaleString()}
          </p>
        </div>
      )}

      {/* Generated Code */}
      <div className="border border-border rounded-lg bg-card p-6">
        <h2 className="text-xl font-semibold mb-4">Generated Code</h2>
        <p className="text-sm text-muted-foreground mb-4">Here's the code that would be executed with your API keys:</p>
        <pre className="bg-slate-50 dark:bg-slate-900 border rounded-lg p-4 overflow-x-auto text-sm">
          <code>{`import { generateText } from 'ai'
import { openai } from '@ai-sdk/openai'
import { createAITools } from '${getCurrentTool().package}'

const tools = createAITools('${apiKeys[getCurrentTool().key] ? '***' : 'your-api-key'}')

const result = await generateText({
  model: openai('gpt-4.1-nano'),
  messages: [
    {
      role: 'user',
      content: '${customPrompt || getCurrentTool().testPrompt}',
    },
  ],
  tools,
  maxTokens: 1000,
})`}</code>
        </pre>
      </div>
    </div>
  )
}
