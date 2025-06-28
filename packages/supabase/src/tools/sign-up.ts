import { SupabaseClient } from '@supabase/supabase-js'
import type { SignUpParams, AuthResponse } from '../types.js'

export const signUpTool = {
  name: 'signUp',
  description: 'Create a new user account with Supabase Auth',
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
        minLength: 6,
        description: 'User password (minimum 6 characters)',
      },
      options: {
        type: 'object',
        properties: {
          data: {
            type: 'object',
            description: 'Additional user metadata',
          },
          emailRedirectTo: {
            type: 'string',
            format: 'uri',
            description: 'URL to redirect to after email confirmation',
          },
        },
        description: 'Additional options for sign up',
      },
    },
    required: ['email', 'password'],
  },
} as const

/**
 * Create a new user account
 */
export async function signUp(client: SupabaseClient, params: SignUpParams): Promise<AuthResponse> {
  try {
    const result = await client.auth.signUp({
      email: params.email,
      password: params.password,
      options: params.options,
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
