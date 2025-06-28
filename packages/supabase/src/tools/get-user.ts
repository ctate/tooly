import { SupabaseClient } from '@supabase/supabase-js'
import type { GetUserParams, AuthResponse } from '../types.js'

export const getUserTool = {
  name: 'getUser',
  description: 'Get the current authenticated user',
  parameters: {
    type: 'object',
    properties: {},
    description: 'No parameters required for getting current user',
  },
} as const

/**
 * Get the current authenticated user
 */
export async function getUser(client: SupabaseClient, params: GetUserParams): Promise<AuthResponse> {
  try {
    const result = await client.auth.getUser()

    return {
      data: {
        user: result.data.user,
        session: null,
      },
      error: result.error,
    }
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : String(error),
    }
  }
}
