import { Client } from '@notionhq/client'
import type { UpdateDatabaseParams, DatabaseResponse } from '../types.js'

export const updateDatabaseTool = {
  name: 'updateDatabase',
  description: 'Update an existing database in Notion',
  parameters: {
    type: 'object',
    properties: {
      database_id: {
        type: 'string',
        description: 'The ID of the database to update',
      },
      title: {
        type: 'array',
        description: 'Database title as rich text',
        items: {
          type: 'object',
          properties: {
            type: { type: 'string', enum: ['text'] },
            text: {
              type: 'object',
              properties: {
                content: { type: 'string' },
                link: {
                  type: 'object',
                  properties: { url: { type: 'string' } },
                  nullable: true,
                },
              },
              required: ['content'],
            },
          },
          required: ['type', 'text'],
        },
      },
      properties: {
        type: 'object',
        description: 'Database schema properties to update (null to remove)',
        additionalProperties: {
          oneOf: [
            {
              type: 'object',
              description: 'Property configuration',
            },
            { type: 'null' },
          ],
        },
      },
      archived: {
        type: 'boolean',
        description: 'Whether the database is archived',
      },
      icon: {
        type: 'object',
        description: 'Database icon (null to remove)',
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
        description: 'Database cover image (null to remove)',
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
    required: ['database_id'],
  },
} as const

/**
 * Update an existing database
 */
export async function updateDatabase(notion: Client, params: UpdateDatabaseParams): Promise<DatabaseResponse> {
  try {
    const { database_id, ...updateData } = params
    const response = await notion.databases.update({
      database_id,
      ...updateData,
    } as any)
    return response as DatabaseResponse
  } catch (error) {
    throw new Error(`Failed to update database: ${error instanceof Error ? error.message : String(error)}`)
  }
}
