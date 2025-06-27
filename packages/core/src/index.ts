// Export types
export * from './types.js'

// Export base class
export * from './base-tool-manager.js'

// Export AI framework helpers
export * from './ai-helpers.js'

// Re-export commonly used types for convenience
export type {
  ToolDefinition,
  ToolDefinitions,
  ToolParameterSchemas,
  ToolManager,
  VercelAITools,
  OpenAIFunctionSetup,
  AnthropicToolSetup,
  BaseHandler,
} from './types.js'

export { BaseToolManager } from './base-tool-manager.js'

export { createVercelAITools, createOpenAIFunctions, createAnthropicTools, bindHandlerMethods } from './ai-helpers.js'
