import {
  type ToolManager,
  type VercelAITools,
  type OpenAIFunctionSetup,
  type AnthropicToolSetup,
  type BaseHandler,
} from './types.js'

/**
 * Create AI SDK compatible tools from a tool manager
 */
export function createAITools<TManager extends ToolManager>(
  toolManager: TManager,
  handlers: BaseHandler,
  toolDescriptions: Record<string, string>,
): VercelAITools {
  const tools = toolManager.getTools()
  const schemas = toolManager.getToolSchemas()
  const result: VercelAITools = {}

  for (const tool of tools) {
    const handler = handlers[tool.name]
    if (!handler) {
      throw new Error(`No handler found for tool: ${tool.name}`)
    }

    const schema = schemas[tool.name]
    if (!schema) {
      throw new Error(`No schema found for tool: ${tool.name}`)
    }

    result[tool.name] = {
      description: toolDescriptions[tool.name] || tool.description,
      parameters: schema,
      execute: handler.bind(handlers),
    }
  }

  return result
}

/**
 * Create OpenAI function calling setup from a tool manager
 */
export function createOpenAIFunctions<TManager extends ToolManager>(toolManager: TManager): OpenAIFunctionSetup {
  return {
    tools: toolManager.getTools(),
    executeFunction: toolManager.executeFunction.bind(toolManager),
  }
}

/**
 * Create Anthropic tool use setup from a tool manager
 */
export function createAnthropicTools<TManager extends ToolManager>(toolManager: TManager): AnthropicToolSetup {
  const tools = toolManager.getTools()

  // Convert OpenAI-style tools to Anthropic format
  const anthropicTools = tools.map((tool) => ({
    name: tool.name,
    description: tool.description,
    input_schema: {
      type: 'object' as const,
      properties: tool.parameters.properties,
      required: tool.parameters.required || [],
    },
  }))

  return {
    tools: anthropicTools,
    executeFunction: toolManager.executeFunction.bind(toolManager),
  }
}

/**
 * Utility function to bind handler methods to a tool manager
 */
export function bindHandlerMethods<THandler extends Record<string, any>>(
  handler: THandler,
  methodNames: (keyof THandler)[],
): BaseHandler {
  const boundMethods: BaseHandler = {}

  for (const methodName of methodNames) {
    const method = handler[methodName]
    if (typeof method === 'function') {
      boundMethods[methodName as string] = method.bind(handler)
    }
  }

  return boundMethods
}
