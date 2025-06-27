import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="container flex flex-col items-center justify-center space-y-6 py-8 md:py-12 lg:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h1 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Tooly
              </span>
            </h1>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              AI-powered tool packages for the Vercel AI SDK. Build intelligent
              applications with pre-built integrations for email, project
              management, and more.
            </p>
          </div>
          <div className="space-x-4">
            <Link
              href="/docs"
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            >
              Get Started
            </Link>
            <Link
              href="/docs/examples"
              className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            >
              View Examples
            </Link>
          </div>
        </section>

        <section className="container space-y-6 py-8 md:py-12 lg:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
              Features
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Everything you need to build AI-powered applications with
              real-world integrations.
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
            <div className="flex flex-col justify-between p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
              <div>
                <h3 className="font-heading text-lg">🚀 Vercel AI SDK First</h3>
                <p className="text-sm text-muted-foreground">
                  Built specifically for the Vercel AI SDK with first-class
                  support for generateText, streamText, and more.
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-between p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
              <div>
                <h3 className="font-heading text-lg">📧 Email Tools</h3>
                <p className="text-sm text-muted-foreground">
                  Send transactional emails, newsletters, and notifications with
                  AI-powered content generation.
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-between p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
              <div>
                <h3 className="font-heading text-lg">📋 Project Management</h3>
                <p className="text-sm text-muted-foreground">
                  Create issues, manage projects, and track progress with
                  intelligent automation.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="container space-y-6 py-8 md:py-12 lg:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
              Quick Start
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Get started with Tooly in just a few lines of code using the
              Vercel AI SDK.
            </p>
          </div>
          <div className="mx-auto max-w-[58rem] space-y-6">
            <div className="space-y-2">
              <h3 className="font-heading text-lg">1. Install a package</h3>
              <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-sm">
                <code>npm install @tooly/resend</code>
              </pre>
            </div>
            <div className="space-y-2">
              <h3 className="font-heading text-lg">
                2. Use with Vercel AI SDK
              </h3>
              <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-sm">
                <code>{`import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { createVercelAITools } from "@tooly/resend";

const tools = createVercelAITools("your-api-key");

const result = await generateText({
          model: openai("gpt-4.1-nano"),
  messages: [{ role: "user", content: "Send a welcome email" }],
  tools,
});`}</code>
              </pre>
            </div>
          </div>
        </section>

        <section className="container space-y-6 py-8 md:py-12 lg:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
              Available Packages
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Choose from our growing collection of AI-ready packages.
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
            <div className="flex flex-col justify-between p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
              <div>
                <h3 className="font-heading text-lg">@tooly/core</h3>
                <p className="text-sm text-muted-foreground">
                  Base abstractions and utilities for building your own AI tool
                  packages.
                </p>
              </div>
              <Link
                href="/docs/packages/core"
                className="mt-4 inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              >
                Learn More
              </Link>
            </div>
            <div className="flex flex-col justify-between p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
              <div>
                <h3 className="font-heading text-lg">@tooly/resend</h3>
                <p className="text-sm text-muted-foreground">
                  Email functionality powered by Resend API for transactional
                  emails and notifications.
                </p>
              </div>
              <Link
                href="/docs/packages/resend"
                className="mt-4 inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              >
                Learn More
              </Link>
            </div>
            <div className="flex flex-col justify-between p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
              <div>
                <h3 className="font-heading text-lg">@tooly/linear</h3>
                <p className="text-sm text-muted-foreground">
                  Project management tools powered by Linear API for issue
                  tracking and project organization.
                </p>
              </div>
              <Link
                href="/docs/packages/linear"
                className="mt-4 inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>

        <section className="container space-y-6 py-8 md:py-12 lg:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
              Multi-Framework Support
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              While built for Vercel AI SDK, Tooly also works with other popular
              AI frameworks.
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-3 md:max-w-[48rem]">
            <div className="flex flex-col items-center justify-center p-6 text-center rounded-lg border bg-card text-card-foreground shadow-sm">
              <div className="text-2xl font-bold text-blue-600">
                Vercel AI SDK
              </div>
              <div className="text-sm text-muted-foreground">Primary</div>
            </div>
            <div className="flex flex-col items-center justify-center p-6 text-center rounded-lg border bg-card text-card-foreground shadow-sm">
              <div className="text-2xl font-bold text-green-600">
                OpenAI SDK
              </div>
              <div className="text-sm text-muted-foreground">Supported</div>
            </div>
            <div className="flex flex-col items-center justify-center p-6 text-center rounded-lg border bg-card text-card-foreground shadow-sm">
              <div className="text-2xl font-bold text-purple-600">
                Anthropic SDK
              </div>
              <div className="text-sm text-muted-foreground">Supported</div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
