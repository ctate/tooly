import { Client } from '@notionhq/client'
import type { CreateDatabaseParams, DatabaseResponse } from '../types.js'

export const createDatabaseTool = {
  name: 'createDatabase',
  description: 'Create a new database in Notion',
  parameters: {
    type: 'object',
    properties: {
      parent: {
        type: 'object',
        description: 'The parent container for the database',
        oneOf: [
          {
            type: 'object',
            properties: {
              type: { type: 'string', enum: ['page_id'] },
              page_id: { type: 'string', description: 'Page ID to create database under' },
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
        description: 'Database schema properties',
        additionalProperties: {
          type: 'object',
          description: 'Property configuration',
        },
      },
      icon: {
        type: 'object',
        description: 'Database icon',
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
        description: 'Database cover image',
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
    required: ['parent', 'title', 'properties'],
  },
} as const

/**
 * Create a new database in Notion
 */
export async function createDatabase(notion: Client, params: CreateDatabaseParams): Promise<DatabaseResponse> {
  try {
    const response = await notion.databases.create(params as any)
    return response as DatabaseResponse
  } catch (error) {
    throw new Error(`Failed to create database: ${error instanceof Error ? error.message : String(error)}`)
  }
}
