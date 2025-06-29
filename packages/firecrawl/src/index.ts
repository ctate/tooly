import { FirecrawlHandlers } from './handlers.js'
import { firecrawlTools, toolParameterSchemas } from './tools/index.js'
import {
  ScrapeUrlSchema,
  CrawlUrlSchema,
  MapUrlSchema,
  SearchSchema,
  BatchScrapeSchema,
  CheckCrawlStatusSchema,
} from './types.js'
import {
  BaseToolManager,
  createAITools as coreCreateVercelAITools,
  createOpenAIFunctions as coreCreateOpenAIFunctions,
  createAnthropicTools as coreCreateAnthropicTools,
  bindHandlerMethods,
} from '@tooly/core'

export * from './types.js'
export * from './tools/index.js'
export * from './handlers.js'

/**
 * Main Firecrawl Tools class for AI SDK integration
 */
export class FirecrawlTools extends BaseToolManager<typeof toolParameterSchemas, typeof firecrawlTools> {
  private handlers: FirecrawlHandlers

  constructor(apiKey: string) {
    super(firecrawlTools, toolParameterSchemas)
    this.handlers = new FirecrawlHandlers(apiKey)
  }

  /**
   * Execute tool function implementation
   */
  protected async executeToolFunction(name: string, params: unknown): Promise<unknown> {
    switch (name) {
      case 'scrapeUrl':
        return this.handlers.scrapeUrl(ScrapeUrlSchema.parse(params))
      case 'crawlUrl':
        return this.handlers.crawlUrl(CrawlUrlSchema.parse(params))
      case 'mapUrl':
        return this.handlers.mapUrl(MapUrlSchema.parse(params))
      case 'search':
        return this.handlers.search(SearchSchema.parse(params))
      case 'batchScrape':
        return this.handlers.batchScrape(BatchScrapeSchema.parse(params))
      case 'checkCrawlStatus':
        return this.handlers.checkCrawlStatus(CheckCrawlStatusSchema.parse(params))
      default:
        throw new Error(`Unknown tool: ${name}`)
    }
  }

  /**
   * Get individual handlers for direct use
   */
  getHandlers() {
    return this.handlers
  }
}

/**
 * Create AI SDK compatible tools
 */
export function createAITools(apiKey: string) {
  const firecrawlTools = new FirecrawlTools(apiKey)
  const handlers = firecrawlTools.getHandlers()

  const toolDescriptions = {
    scrapeUrl: 'Scrape a single URL and get its content in various formats',
    crawlUrl: 'Crawl a website and get content from all accessible pages',
    mapUrl: 'Map a website to get a list of all URLs found on the site',
    search: 'Search the web and optionally scrape the results',
    batchScrape: 'Scrape multiple URLs in batch',
    checkCrawlStatus: 'Check the status of a crawl job',
  }

  const boundMethods = bindHandlerMethods(handlers, [
    'scrapeUrl',
    'crawlUrl',
    'mapUrl',
    'search',
    'batchScrape',
    'checkCrawlStatus',
  ])

  return coreCreateVercelAITools(firecrawlTools, boundMethods, toolDescriptions)
}

/**
 * Helper function to create OpenAI function calling setup
 */
export function createOpenAIFunctions(apiKey: string) {
  const firecrawlTools = new FirecrawlTools(apiKey)
  return coreCreateOpenAIFunctions(firecrawlTools)
}

/**
 * Helper function to create Anthropic function calling setup
 */
export function createAnthropicTools(apiKey: string) {
  const firecrawlTools = new FirecrawlTools(apiKey)
  return coreCreateAnthropicTools(firecrawlTools)
}

// Default export
export default FirecrawlTools
