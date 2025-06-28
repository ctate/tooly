import { SupabaseHandlers } from './handlers.js'
import { supabaseTools, toolParameterSchemas } from './tools/index.js'
import {
  BaseToolManager,
  createAITools as coreCreateVercelAITools,
  createOpenAIFunctions as coreCreateOpenAIFunctions,
  createAnthropicTools as coreCreateAnthropicTools,
  bindHandlerMethods,
} from '@tooly/core'

export * from './types.js'
export * from './tools/index.js'
export * from './handlers.js'

/**
 * Main Supabase Tools class for AI SDK integration
 */
export class SupabaseTools extends BaseToolManager<typeof toolParameterSchemas, typeof supabaseTools> {
  private handlers: SupabaseHandlers

  constructor(supabaseUrl: string, supabaseKey: string) {
    super(supabaseTools, toolParameterSchemas)
    this.handlers = new SupabaseHandlers(supabaseUrl, supabaseKey)
  }

  /**
   * Execute tool function implementation
   */
  protected async executeToolFunction(name: string, params: any): Promise<any> {
    switch (name) {
      case 'selectData':
        return this.handlers.selectData(params)
      case 'insertData':
        return this.handlers.insertData(params)
      case 'updateData':
        return this.handlers.updateData(params)
      case 'deleteData':
        return this.handlers.deleteData(params)
      case 'upsertData':
        return this.handlers.upsertData(params)
      case 'signUp':
        return this.handlers.signUp(params)
      case 'signIn':
        return this.handlers.signIn(params)
      case 'signOut':
        return this.handlers.signOut(params)
      case 'getUser':
        return this.handlers.getUser(params)
      case 'uploadFile':
        return this.handlers.uploadFile(params)
      case 'downloadFile':
        return this.handlers.downloadFile(params)
      case 'listFiles':
        return this.handlers.listFiles(params)
      case 'createBucket':
        return this.handlers.createBucket(params)
      default:
        throw new Error(`Unknown tool: ${name}`)
    }
  }

  /**
   * Get individual handlers for direct use
   */
  getHandlers() {
    return this.handlers
  }
}

/**
 * Create AI SDK compatible tools
 */
export function createAITools(supabaseUrl: string, supabaseKey: string) {
  const supabaseTools = new SupabaseTools(supabaseUrl, supabaseKey)
  const handlers = supabaseTools.getHandlers()

  const toolDescriptions = {
    selectData: 'Select/query data from a Supabase table',
    insertData: 'Insert new data into a Supabase table',
    updateData: 'Update existing data in a Supabase table',
    deleteData: 'Delete data from a Supabase table',
    upsertData: 'Upsert data in a Supabase table (insert or update)',
    signUp: 'Create a new user account with Supabase Auth',
    signIn: 'Sign in a user with email and password',
    signOut: 'Sign out the current user',
    getUser: 'Get the current authenticated user',
    uploadFile: 'Upload a file to Supabase Storage',
    downloadFile: 'Download a file from Supabase Storage',
    listFiles: 'List files in a Supabase Storage bucket',
    createBucket: 'Create a new storage bucket in Supabase',
  }

  const boundMethods = bindHandlerMethods(handlers, [
    'selectData',
    'insertData',
    'updateData',
    'deleteData',
    'upsertData',
    'signUp',
    'signIn',
    'signOut',
    'getUser',
    'uploadFile',
    'downloadFile',
    'listFiles',
    'createBucket',
  ])

  return coreCreateVercelAITools(supabaseTools, boundMethods, toolDescriptions)
}

/**
 * Helper function to create OpenAI function calling setup
 */
export function createOpenAIFunctions(supabaseUrl: string, supabaseKey: string) {
  const supabaseTools = new SupabaseTools(supabaseUrl, supabaseKey)
  return coreCreateOpenAIFunctions(supabaseTools)
}

/**
 * Helper function to create Anthropic function calling setup
 */
export function createAnthropicTools(supabaseUrl: string, supabaseKey: string) {
  const supabaseTools = new SupabaseTools(supabaseUrl, supabaseKey)
  return coreCreateAnthropicTools(supabaseTools)
}

// Default export
export default SupabaseTools
