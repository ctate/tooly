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
              Supported Frameworks
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Works with all major AI frameworks
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-3 md:max-w-[48rem]">
            <div className="flex flex-col items-center justify-center p-6 text-center rounded-lg border bg-card text-card-foreground shadow-sm">
              <div className="text-blue-600 mb-2">
                <img
                  src="/logos/aisdk-logo.svg"
                  alt="Vercel AI SDK"
                  className="h-12 w-auto"
                />
              </div>
              <div className="text-lg font-semibold">Vercel AI SDK</div>
            </div>
            <div className="flex flex-col items-center justify-center p-6 text-center rounded-lg border bg-card text-card-foreground shadow-sm">
              <div className="text-green-600 mb-2">
                <img
                  src="/logos/openai-logo.svg"
                  alt="OpenAI"
                  className="h-12 w-auto"
                />
              </div>
              <div className="text-lg font-semibold">OpenAI SDK</div>
            </div>
            <div className="flex flex-col items-center justify-center p-6 text-center rounded-lg border bg-card text-card-foreground shadow-sm">
              <div className="text-orange-600 mb-2">
                <img
                  src="/logos/anthropic-logo.svg"
                  alt="Anthropic"
                  className="h-12 w-auto"
                />
              </div>
              <div className="text-lg font-semibold">Anthropic SDK</div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
