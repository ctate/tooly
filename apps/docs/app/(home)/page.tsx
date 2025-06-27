import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col justify-center px-4">
      <div className="max-w-6xl mx-auto text-center space-y-8">
        {/* Hero Section */}
        <div className="space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Tooly
          </h1>
          <p className="text-xl text-fd-muted-foreground max-w-2xl mx-auto">
            AI-powered tool packages for OpenAI, Anthropic, and Vercel AI SDK.
            Build powerful AI applications with seamless API integrations.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 py-8">
          <div className="p-6 border rounded-lg bg-fd-background">
            <h3 className="text-lg font-semibold mb-2">📧 Email Tools</h3>
            <p className="text-fd-muted-foreground text-sm">
              Send emails, manage campaigns, and handle notifications with
              Resend integration
            </p>
          </div>
          <div className="p-6 border rounded-lg bg-fd-background">
            <h3 className="text-lg font-semibold mb-2">
              📋 Project Management
            </h3>
            <p className="text-fd-muted-foreground text-sm">
              Create issues, manage projects, and track progress with Linear
              integration
            </p>
          </div>
          <div className="p-6 border rounded-lg bg-fd-background">
            <h3 className="text-lg font-semibold mb-2">🤖 AI-First</h3>
            <p className="text-fd-muted-foreground text-sm">
              Built for AI applications with OpenAI, Anthropic, and Vercel AI
              SDK support
            </p>
          </div>
        </div>

        {/* Quick Start */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Quick Start</h2>
          <div className="bg-fd-background border rounded-lg p-4 text-left max-w-2xl mx-auto">
            <code className="text-sm">
              <span className="text-fd-muted-foreground">
                # Install a package
              </span>
              <br />
              npm install @tooly/resend @tooly/linear
              <br />
              <br />
              <span className="text-fd-muted-foreground">
                # Use with AI frameworks
              </span>
              <br />
              <span className="text-blue-600">import</span> {"{"}{" "}
              createVercelAITools {"}"}{" "}
              <span className="text-blue-600">from</span>{" "}
              <span className="text-green-600">"@tooly/resend"</span>
            </code>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-4 justify-center">
          <Link
            href="/docs"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Get Started
          </Link>
          <Link
            href="/docs/packages"
            className="px-6 py-3 border border-fd-border rounded-lg font-medium hover:bg-fd-muted/50 transition-colors"
          >
            View Packages
          </Link>
        </div>

        {/* Packages Overview */}
        <div className="pt-8">
          <h2 className="text-2xl font-semibold mb-6">Available Packages</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-left p-4 border rounded-lg">
              <h3 className="font-semibold text-lg">@tooly/core</h3>
              <p className="text-fd-muted-foreground text-sm mt-1">
                Base abstractions and utilities for building AI tool packages
              </p>
            </div>
            <div className="text-left p-4 border rounded-lg">
              <h3 className="font-semibold text-lg">@tooly/resend</h3>
              <p className="text-fd-muted-foreground text-sm mt-1">
                Email tools powered by Resend API for AI applications
              </p>
            </div>
            <div className="text-left p-4 border rounded-lg">
              <h3 className="font-semibold text-lg">@tooly/linear</h3>
              <p className="text-fd-muted-foreground text-sm mt-1">
                Project management tools powered by Linear API for AI
                applications
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
