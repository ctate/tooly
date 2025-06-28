import { z } from 'zod'
import {
  CreatePageSchema,
  UpdatePageSchema,
  SearchPagesSchema,
  CreateDatabaseSchema,
  UpdateDatabaseSchema,
  QueryDatabaseSchema,
} from '../types.js'

// Export all tools
export * from './create-page.js'
export * from './get-page.js'
export * from './update-page.js'
export * from './search-pages.js'
export * from './create-database.js'
export * from './get-database.js'
export * from './update-database.js'
export * from './query-database.js'

// Import tool definitions
import { createPageTool } from './create-page.js'
import { getPageTool } from './get-page.js'
import { updatePageTool } from './update-page.js'
import { searchPagesTool } from './search-pages.js'
import { createDatabaseTool } from './create-database.js'
import { getDatabaseTool } from './get-database.js'
import { updateDatabaseTool } from './update-database.js'
import { queryDatabaseTool } from './query-database.js'

// Export all tools as an array
export const notionTools = [
  createPageTool,
  getPageTool,
  updatePageTool,
  searchPagesTool,
  createDatabaseTool,
  getDatabaseTool,
  updateDatabaseTool,
  queryDatabaseTool,
] as const

// Tool parameter validation schemas
export const toolParameterSchemas = {
  createPage: CreatePageSchema,
  getPage: z.object({ page_id: z.string() }),
  updatePage: z.object({ page_id: z.string() }).merge(UpdatePageSchema),
  searchPages: SearchPagesSchema,
  createDatabase: CreateDatabaseSchema,
  getDatabase: z.object({ database_id: z.string() }),
  updateDatabase: z.object({ database_id: z.string() }).merge(UpdateDatabaseSchema),
  queryDatabase: z.object({ database_id: z.string() }).merge(QueryDatabaseSchema),
} as const
