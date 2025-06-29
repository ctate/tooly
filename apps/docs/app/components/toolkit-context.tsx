'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

export interface Toolkit {
  name: string
  package: string
  logo: string
  logoDark?: string
  useCase: string
}

export const toolkits: Toolkit[] = [
  {
    name: 'GitHub',
    package: '@tooly/github',
    logo: '/logos/github-light.svg',
    logoDark: '/logos/github-dark.svg',
    useCase: 'Create an issue for the bug report',
  },
  {
    name: 'Resend',
    package: '@tooly/resend',
    logo: '/logos/resend-light.svg',
    logoDark: '/logos/resend-dark.svg',
    useCase: 'Send a welcome email to new users',
  },
  {
    name: 'Linear',
    package: '@tooly/linear',
    logo: '/logos/linear.svg',
    useCase: 'Create a task for the new feature request',
  },
  {
    name: 'Notion',
    package: '@tooly/notion',
    logo: '/logos/notion.svg',
    useCase: 'Create a new page in the knowledge base',
  },
  {
    name: 'Supabase',
    package: '@tooly/supabase',
    logo: '/logos/supabase.svg',
    useCase: 'Query user data from the database',
  },
  {
    name: 'Twilio',
    package: '@tooly/twilio',
    logo: '/logos/twilio.svg',
    useCase: 'Send an SMS notification to the user',
  },
]

interface ToolkitContextType {
  selectedToolkit: number
  setSelectedToolkit: (toolkit: number) => void
  primaryToolkit: Toolkit
}

const ToolkitContext = createContext<ToolkitContextType | undefined>(undefined)

export function ToolkitProvider({ children }: { children: ReactNode }) {
  const [selectedToolkit, setSelectedToolkit] = useState(0) // Default to first toolkit

  const primaryToolkit = toolkits[selectedToolkit] || toolkits[0]

  return (
    <ToolkitContext.Provider value={{ selectedToolkit, setSelectedToolkit, primaryToolkit }}>
      {children}
    </ToolkitContext.Provider>
  )
}

export function useToolkit() {
  const context = useContext(ToolkitContext)
  if (context === undefined) {
    throw new Error('useToolkit must be used within a ToolkitProvider')
  }
  return context
}
