import { SupabaseClient } from '@supabase/supabase-js'
import type { SignInParams, AuthResponse } from '../types.js'

export const signInTool = {
  name: 'signIn',
  description: 'Sign in a user with email and password',
  parameters: {
    type: 'object',
    properties: {
      email: {
        type: 'string',
        format: 'email',
        description: 'User email address',
      },
      password: {
        type: 'string',
        description: 'User password',
      },
    },
    required: ['email', 'password'],
  },
} as const

/**
 * Sign in a user with email and password
 */
export async function signIn(client: SupabaseClient, params: SignInParams): Promise<AuthResponse> {
  try {
    const result = await client.auth.signInWithPassword({
      email: params.email,
      password: params.password,
    })

    return {
      data: {
        user: result.data.user,
        session: result.data.session,
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
