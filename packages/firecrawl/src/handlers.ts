import FirecrawlApp from '@mendable/firecrawl-js'
import { scrapeUrl, crawlUrl, mapUrl, search, batchScrape, checkCrawlStatus } from './tools'
import type {
  ScrapeUrlParams,
  CrawlUrlParams,
  MapUrlParams,
  SearchParams,
  BatchScrapeParams,
  CheckCrawlStatusParams,
  ScrapeResponse,
  CrawlResponse,
  MapResponse,
  SearchResponse,
  BatchScrapeResponse,
  FirecrawlResponse,
} from './types'

export class FirecrawlHandlers {
  private firecrawl: FirecrawlApp

  constructor(apiKey: string) {
    this.firecrawl = new FirecrawlApp({ apiKey })
  }

  /**
   * Scrape a single URL
   */
  async scrapeUrl(params: ScrapeUrlParams): Promise<ScrapeResponse> {
    return scrapeUrl(this.firecrawl, params)
  }

  /**
   * Crawl a website
   */
  async crawlUrl(params: CrawlUrlParams): Promise<CrawlResponse> {
    return crawlUrl(this.firecrawl, params)
  }

  /**
   * Map URLs from a website
   */
  async mapUrl(params: MapUrlParams): Promise<MapResponse> {
    return mapUrl(this.firecrawl, params)
  }

  /**
   * Search the web
   */
  async search(params: SearchParams): Promise<SearchResponse> {
    return search(this.firecrawl, params)
  }

  /**
   * Batch scrape multiple URLs
   */
  async batchScrape(params: BatchScrapeParams): Promise<BatchScrapeResponse> {
    return batchScrape(this.firecrawl, params)
  }

  /**
   * Check crawl status
   */
  async checkCrawlStatus(params: CheckCrawlStatusParams): Promise<FirecrawlResponse> {
    return checkCrawlStatus(this.firecrawl, params)
  }
}
