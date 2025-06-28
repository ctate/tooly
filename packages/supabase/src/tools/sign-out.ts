import { SupabaseClient } from '@supabase/supabase-js'
import type { SignOutParams, AuthResponse } from '../types.js'

export const signOutTool = {
  name: 'signOut',
  description: 'Sign out the current user',
  parameters: {
    type: 'object',
    properties: {},
    description: 'No parameters required for sign out',
  },
} as const

/**
 * Sign out the current user
 */
export async function signOut(client: SupabaseClient, params: SignOutParams): Promise<AuthResponse> {
  try {
    const result = await client.auth.signOut()

    return {
      data: null,
      error: result.error,
    }
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : String(error),
    }
  }
}
