'use client'

import Link from 'next/link'
import { toolkits, useToolkit } from './toolkit-context'

export function ToolkitSelector() {
  const { selectedToolkit, setSelectedToolkit } = useToolkit()

  const selectToolkit = (index: number) => {
    setSelectedToolkit(index)
  }

  const getInstallCommand = () => {
    return `npm install ${toolkits[selectedToolkit].package}`
  }

  return (
    <div className="space-y-4">
      {/* Dynamic Install Command */}
      <div className="bg-slate-50 dark:bg-slate-900 border rounded-lg p-4 overflow-x-auto">
        <pre className="text-sm">
          <code className="text-slate-800 dark:text-slate-200">{getInstallCommand()}</code>
        </pre>
      </div>

      <label className="text-sm font-medium text-foreground">Choose your toolkit:</label>
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mt-2">
        {toolkits.map((toolkit, index) => (
          <button
            key={toolkit.name}
            onClick={() => selectToolkit(index)}
            className={`p-4 rounded-lg border transition-all flex flex-col items-center justify-center aspect-square ${
              selectedToolkit === index
                ? 'bg-slate-100 border-slate-500 dark:bg-slate-800/50 dark:border-slate-400'
                : 'bg-card border-border hover:bg-accent hover:border-accent-foreground/20'
            }`}
            title={toolkit.name}
          >
            {toolkit.logoDark ? (
              <>
                <img src={toolkit.logo} alt={toolkit.name} className="h-8 w-auto dark:hidden" />
                <img src={toolkit.logoDark} alt={toolkit.name} className="h-8 w-auto hidden dark:block" />
              </>
            ) : (
              <img src={toolkit.logo} alt={toolkit.name} className="h-8 w-auto" />
            )}
          </button>
        ))}
        <Link
          href="/docs/tools/linear"
          className="p-4 rounded-lg border transition-all flex flex-col items-center justify-center aspect-square bg-card border-border hover:bg-accent hover:border-accent-foreground/20"
          title="View all tools"
        >
          <span className="text-sm font-medium text-muted-foreground">+ more</span>
        </Link>
      </div>

      {/* <p className="text-xs text-muted-foreground">
        Selected toolkit: {toolkits[selectedToolkit].name}. Each package includes authentication, error handling, and
        comprehensive TypeScript support.
      </p> */}
    </div>
  )
}
