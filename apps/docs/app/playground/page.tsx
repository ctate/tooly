import { Playground } from './components/playground'

export default function PlaygroundPage() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Tooly Playground</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Test Tooly integrations with your own API keys. See how easy it is to connect AI models with real-world
          services.
        </p>
        <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 max-w-2xl mx-auto">
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            <strong>Note:</strong> All API keys are stored locally in your browser and never sent to our servers.
            They're only used to make direct API calls from your browser.
          </p>
        </div>
      </div>

      <Playground />
    </div>
  )
}
