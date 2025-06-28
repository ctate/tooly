import { Client } from '@notionhq/client'
import type { UpdatePageParams, PageResponse } from '../types.js'

export const updatePageTool = {
  name: 'updatePage',
  description: 'Update an existing page in Notion',
  parameters: {
    type: 'object',
    properties: {
      page_id: {
        type: 'string',
        description: 'The ID of the page to update',
      },
      properties: {
        type: 'object',
        description: 'Page properties to update (varies by parent database schema)',
        additionalProperties: true,
      },
      archived: {
        type: 'boolean',
        description: 'Whether the page is archived',
      },
      icon: {
        type: 'object',
        description: 'Page icon (null to remove)',
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
          { type: 'null' },
        ],
      },
      cover: {
        type: 'object',
        description: 'Page cover image (null to remove)',
        oneOf: [
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
          { type: 'null' },
        ],
      },
    },
    required: ['page_id'],
  },
} as const

/**
 * Update an existing page
 */
export async function updatePage(notion: Client, params: UpdatePageParams): Promise<PageResponse> {
  try {
    const { page_id, ...updateData } = params
    const response = await notion.pages.update({
      page_id,
      ...updateData,
    } as any)
    return response as PageResponse
  } catch (error) {
    throw new Error(`Failed to update page: ${error instanceof Error ? error.message : String(error)}`)
  }
}
