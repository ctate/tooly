import { Client } from '@notionhq/client'
import type { CreatePageParams, PageResponse } from '../types.js'

export const createPageTool = {
  name: 'createPage',
  description: 'Create a new page in Notion',
  parameters: {
    type: 'object',
    properties: {
      parent: {
        type: 'object',
        description: 'The parent container for the page',
        oneOf: [
          {
            type: 'object',
            properties: {
              type: { type: 'string', enum: ['database_id'] },
              database_id: { type: 'string', description: 'Database ID to create page in' },
            },
            required: ['type', 'database_id'],
          },
          {
            type: 'object',
            properties: {
              type: { type: 'string', enum: ['page_id'] },
              page_id: { type: 'string', description: 'Page ID to create page under' },
            },
            required: ['type', 'page_id'],
          },
          {
            type: 'object',
            properties: {
              type: { type: 'string', enum: ['workspace'] },
              workspace: { type: 'boolean', description: 'Create in workspace root' },
            },
            required: ['type', 'workspace'],
          },
        ],
      },
      properties: {
        type: 'object',
        description: 'Page properties (varies by parent database schema)',
        additionalProperties: true,
      },
      children: {
        type: 'array',
        description: 'Block children content for the page',
        items: { type: 'object' },
      },
      icon: {
        type: 'object',
        description: 'Page icon',
        oneOf: [
          {
            type: 'object',
            properties: {
              type: { type: 'string', enum: ['emoji'] },
              emoji: { type: 'string', description: 'Emoji character' },
            },
            required: ['type', 'emoji'],
          },
          {
            type: 'object',
            properties: {
              type: { type: 'string', enum: ['external'] },
              external: {
                type: 'object',
                properties: { url: { type: 'string' } },
                required: ['url'],
              },
            },
            required: ['type', 'external'],
          },
        ],
      },
      cover: {
        type: 'object',
        description: 'Page cover image',
        properties: {
          type: { type: 'string', enum: ['external'] },
          external: {
            type: 'object',
            properties: { url: { type: 'string' } },
            required: ['url'],
          },
        },
        required: ['type', 'external'],
      },
    },
    required: ['parent'],
  },
} as const

/**
 * Create a new page in Notion
 */
export async function createPage(notion: Client, params: CreatePageParams): Promise<PageResponse> {
  try {
    const response = await notion.pages.create(params as any)
    return response as PageResponse
  } catch (error) {
    throw new Error(`Failed to create page: ${error instanceof Error ? error.message : String(error)}`)
  }
}
