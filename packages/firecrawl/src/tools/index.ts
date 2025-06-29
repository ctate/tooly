import { z } from 'zod'
import {
  ScrapeUrlSchema,
  CrawlUrlSchema,
  MapUrlSchema,
  SearchSchema,
  BatchScrapeSchema,
  CheckCrawlStatusSchema,
} from '../types.js'

// Export all tools
export * from './scrape-url.js'
export * from './crawl-url.js'
export * from './map-url.js'
export * from './search.js'
export * from './batch-scrape.js'
export * from './check-crawl-status.js'

// Import tool definitions
import { scrapeUrlTool } from './scrape-url.js'
import { crawlUrlTool } from './crawl-url.js'
import { mapUrlTool } from './map-url.js'
import { searchTool } from './search.js'
import { batchScrapeTool } from './batch-scrape.js'
import { checkCrawlStatusTool } from './check-crawl-status.js'

// Export all tools as an array
export const firecrawlTools = [
  scrapeUrlTool,
  crawlUrlTool,
  mapUrlTool,
  searchTool,
  batchScrapeTool,
  checkCrawlStatusTool,
] as const

// Tool parameter validation schemas
export const toolParameterSchemas = {
  scrapeUrl: ScrapeUrlSchema,
  crawlUrl: CrawlUrlSchema,
  mapUrl: MapUrlSchema,
  search: SearchSchema,
  batchScrape: BatchScrapeSchema,
  checkCrawlStatus: CheckCrawlStatusSchema,
} as const
