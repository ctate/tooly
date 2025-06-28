import { z } from 'zod'

// Base types
export const NotionIdSchema = z.string()

// Rich text schemas
export const RichTextSchema = z.object({
  type: z.literal('text'),
  text: z.object({
    content: z.string(),
    link: z.object({ url: z.string() }).nullable().optional(),
  }),
  plain_text: z.string().optional(),
  href: z.string().nullable().optional(),
})

export const TitleSchema = z.array(RichTextSchema)

// Property schemas
export const PropertyValueSchema = z.union([
  z.object({ type: z.literal('title'), title: TitleSchema }),
  z.object({ type: z.literal('rich_text'), rich_text: z.array(RichTextSchema) }),
  z.object({ type: z.literal('number'), number: z.number().nullable() }),
  z.object({ type: z.literal('select'), select: z.object({ name: z.string() }).nullable() }),
  z.object({ type: z.literal('multi_select'), multi_select: z.array(z.object({ name: z.string() })) }),
  z.object({ type: z.literal('date'), date: z.object({ start: z.string(), end: z.string().optional() }).nullable() }),
  z.object({ type: z.literal('checkbox'), checkbox: z.boolean() }),
  z.object({ type: z.literal('url'), url: z.string().nullable() }),
  z.object({ type: z.literal('email'), email: z.string().nullable() }),
  z.object({ type: z.literal('phone_number'), phone_number: z.string().nullable() }),
])

// Parent schemas
export const ParentSchema = z.union([
  z.object({ type: z.literal('database_id'), database_id: z.string() }),
  z.object({ type: z.literal('page_id'), page_id: z.string() }),
  z.object({ type: z.literal('workspace'), workspace: z.boolean() }),
])

// Create page schema
export const CreatePageSchema = z.object({
  parent: ParentSchema,
  properties: z.record(PropertyValueSchema).optional(),
  children: z.array(z.any()).optional(), // Block content
  icon: z
    .union([
      z.object({ type: z.literal('emoji'), emoji: z.string() }),
      z.object({ type: z.literal('external'), external: z.object({ url: z.string() }) }),
      z.object({ type: z.literal('file'), file: z.object({ url: z.string() }) }),
    ])
    .optional(),
  cover: z
    .object({
      type: z.literal('external'),
      external: z.object({ url: z.string() }),
    })
    .optional(),
})

// Update page schema
export const UpdatePageSchema = z.object({
  properties: z.record(PropertyValueSchema).optional(),
  archived: z.boolean().optional(),
  icon: z
    .union([
      z.object({ type: z.literal('emoji'), emoji: z.string() }),
      z.object({ type: z.literal('external'), external: z.object({ url: z.string() }) }),
      z.object({ type: z.literal('file'), file: z.object({ url: z.string() }) }),
    ])
    .nullable()
    .optional(),
  cover: z
    .object({
      type: z.literal('external'),
      external: z.object({ url: z.string() }),
    })
    .nullable()
    .optional(),
})

// Search pages schema
export const SearchPagesSchema = z.object({
  query: z.string().optional(),
  sort: z
    .object({
      direction: z.enum(['ascending', 'descending']),
      timestamp: z.enum(['created_time', 'last_edited_time']),
    })
    .optional(),
  filter: z
    .object({
      value: z.enum(['page', 'database']),
      property: z.literal('object'),
    })
    .optional(),
  start_cursor: z.string().optional(),
  page_size: z.number().min(1).max(100).default(100),
})

// Database property schema
export const DatabasePropertySchema = z.union([
  z.object({ type: z.literal('title'), title: z.object({}) }),
  z.object({ type: z.literal('rich_text'), rich_text: z.object({}) }),
  z.object({ type: z.literal('number'), number: z.object({ format: z.string().optional() }) }),
  z.object({
    type: z.literal('select'),
    select: z.object({ options: z.array(z.object({ name: z.string(), color: z.string() })) }),
  }),
  z.object({
    type: z.literal('multi_select'),
    multi_select: z.object({ options: z.array(z.object({ name: z.string(), color: z.string() })) }),
  }),
  z.object({ type: z.literal('date'), date: z.object({}) }),
  z.object({ type: z.literal('checkbox'), checkbox: z.object({}) }),
  z.object({ type: z.literal('url'), url: z.object({}) }),
  z.object({ type: z.literal('email'), email: z.object({}) }),
  z.object({ type: z.literal('phone_number'), phone_number: z.object({}) }),
])

// Create database schema
export const CreateDatabaseSchema = z.object({
  parent: ParentSchema,
  title: TitleSchema,
  properties: z.record(DatabasePropertySchema),
  icon: z
    .union([
      z.object({ type: z.literal('emoji'), emoji: z.string() }),
      z.object({ type: z.literal('external'), external: z.object({ url: z.string() }) }),
      z.object({ type: z.literal('file'), file: z.object({ url: z.string() }) }),
    ])
    .optional(),
  cover: z
    .object({
      type: z.literal('external'),
      external: z.object({ url: z.string() }),
    })
    .optional(),
})

// Update database schema
export const UpdateDatabaseSchema = z.object({
  title: TitleSchema.optional(),
  properties: z.record(DatabasePropertySchema.nullable()).optional(),
  archived: z.boolean().optional(),
  icon: z
    .union([
      z.object({ type: z.literal('emoji'), emoji: z.string() }),
      z.object({ type: z.literal('external'), external: z.object({ url: z.string() }) }),
      z.object({ type: z.literal('file'), file: z.object({ url: z.string() }) }),
    ])
    .nullable()
    .optional(),
  cover: z
    .object({
      type: z.literal('external'),
      external: z.object({ url: z.string() }),
    })
    .nullable()
    .optional(),
})

// Query database schema
export const QueryDatabaseSchema = z.object({
  filter: z.any().optional(), // Complex filter object
  sorts: z
    .array(
      z.object({
        property: z.string().optional(),
        timestamp: z.enum(['created_time', 'last_edited_time']).optional(),
        direction: z.enum(['ascending', 'descending']),
      }),
    )
    .optional(),
  start_cursor: z.string().optional(),
  page_size: z.number().min(1).max(100).default(100),
})

// Response schemas
export const PageResponseSchema = z.object({
  object: z.literal('page'),
  id: z.string(),
  created_time: z.string(),
  last_edited_time: z.string(),
  created_by: z.object({ id: z.string() }),
  last_edited_by: z.object({ id: z.string() }),
  cover: z.any().nullable(),
  icon: z.any().nullable(),
  parent: ParentSchema,
  archived: z.boolean(),
  properties: z.record(z.any()),
  url: z.string(),
  public_url: z.string().nullable(),
})

export const DatabaseResponseSchema = z.object({
  object: z.literal('database'),
  id: z.string(),
  created_time: z.string(),
  last_edited_time: z.string(),
  created_by: z.object({ id: z.string() }),
  last_edited_by: z.object({ id: z.string() }),
  title: TitleSchema,
  description: z.array(RichTextSchema),
  icon: z.any().nullable(),
  cover: z.any().nullable(),
  properties: z.record(z.any()),
  parent: ParentSchema,
  url: z.string(),
  archived: z.boolean(),
  is_inline: z.boolean(),
  public_url: z.string().nullable(),
})

export const SearchResultsSchema = z.object({
  object: z.literal('list'),
  results: z.array(z.union([PageResponseSchema, DatabaseResponseSchema])),
  next_cursor: z.string().nullable(),
  has_more: z.boolean(),
  type: z.literal('page_or_database').optional(),
  page_or_database: z.object({}).optional(),
})

export const QueryResultsSchema = z.object({
  object: z.literal('list'),
  results: z.array(PageResponseSchema),
  next_cursor: z.string().nullable(),
  has_more: z.boolean(),
  type: z.literal('page').optional(),
  page: z.object({}).optional(),
})

// Export inferred types
export type NotionId = z.infer<typeof NotionIdSchema>
export type RichText = z.infer<typeof RichTextSchema>
export type Title = z.infer<typeof TitleSchema>
export type PropertyValue = z.infer<typeof PropertyValueSchema>
export type Parent = z.infer<typeof ParentSchema>
export type CreatePageInput = z.infer<typeof CreatePageSchema>
export type UpdatePageInput = z.infer<typeof UpdatePageSchema>
export type SearchPagesInput = z.infer<typeof SearchPagesSchema>
export type DatabaseProperty = z.infer<typeof DatabasePropertySchema>
export type CreateDatabaseInput = z.infer<typeof CreateDatabaseSchema>
export type UpdateDatabaseInput = z.infer<typeof UpdateDatabaseSchema>
export type QueryDatabaseInput = z.infer<typeof QueryDatabaseSchema>
export type PageResponse = z.infer<typeof PageResponseSchema>
export type DatabaseResponse = z.infer<typeof DatabaseResponseSchema>
export type SearchResults = z.infer<typeof SearchResultsSchema>
export type QueryResults = z.infer<typeof QueryResultsSchema>

// Tool parameter types
export interface CreatePageParams extends CreatePageInput {}
export interface GetPageParams {
  page_id: string
}
export interface UpdatePageParams extends UpdatePageInput {
  page_id: string
}
export interface SearchPagesParams extends SearchPagesInput {}
export interface CreateDatabaseParams extends CreateDatabaseInput {}
export interface GetDatabaseParams {
  database_id: string
}
export interface UpdateDatabaseParams extends UpdateDatabaseInput {
  database_id: string
}
export interface QueryDatabaseParams extends QueryDatabaseInput {
  database_id: string
}
