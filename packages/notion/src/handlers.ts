import { Client } from '@notionhq/client'
import {
  createPage,
  getPage,
  updatePage,
  searchPages,
  createDatabase,
  getDatabase,
  updateDatabase,
  queryDatabase,
} from './tools'
import type {
  CreatePageParams,
  GetPageParams,
  UpdatePageParams,
  SearchPagesParams,
  CreateDatabaseParams,
  GetDatabaseParams,
  UpdateDatabaseParams,
  QueryDatabaseParams,
  PageResponse,
  DatabaseResponse,
  SearchResults,
  QueryResults,
} from './types'

export class NotionHandlers {
  private notion: Client

  constructor(apiKey: string) {
    this.notion = new Client({ auth: apiKey })
  }

  /**
   * Create a new page
   */
  async createPage(params: CreatePageParams): Promise<PageResponse> {
    return createPage(this.notion, params)
  }

  /**
   * Get page details by ID
   */
  async getPage(params: GetPageParams): Promise<PageResponse> {
    return getPage(this.notion, params)
  }

  /**
   * Update an existing page
   */
  async updatePage(params: UpdatePageParams): Promise<PageResponse> {
    return updatePage(this.notion, params)
  }

  /**
   * Search for pages
   */
  async searchPages(params: SearchPagesParams): Promise<SearchResults> {
    return searchPages(this.notion, params)
  }

  /**
   * Create a new database
   */
  async createDatabase(params: CreateDatabaseParams): Promise<DatabaseResponse> {
    return createDatabase(this.notion, params)
  }

  /**
   * Get database details by ID
   */
  async getDatabase(params: GetDatabaseParams): Promise<DatabaseResponse> {
    return getDatabase(this.notion, params)
  }

  /**
   * Update an existing database
   */
  async updateDatabase(params: UpdateDatabaseParams): Promise<DatabaseResponse> {
    return updateDatabase(this.notion, params)
  }

  /**
   * Query database entries
   */
  async queryDatabase(params: QueryDatabaseParams): Promise<QueryResults> {
    return queryDatabase(this.notion, params)
  }
}
