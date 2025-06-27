import { z } from 'zod'
import { type ToolDefinitions, type ToolParameterSchemas, type ToolManager } from './types.js'

/**
 * Abstract base class for creating tool managers
 */
export abstract class BaseToolManager<
  TSchemas extends ToolParameterSchemas = ToolParameterSchemas,
  TTools extends ToolDefinitions = ToolDefinitions,
> implements ToolManager<TSchemas, TTools>
{
  protected tools: TTools
  protected toolSchemas: TSchemas

  constructor(tools: TTools, toolSchemas: TSchemas) {
    this.tools = tools
    this.toolSchemas = toolSchemas
  }

  /**
   * Get all tool definitions for OpenAI/Anthropic
   */
  getTools(): TTools {
    return this.tools
  }

  /**
   * Get tool parameter schemas for validation
   */
  getToolSchemas(): TSchemas {
    return this.toolSchemas
  }

  /**
   * Execute a tool function by name with parameter validation
   */
  async executeFunction(name: string, parameters: any): Promise<any> {
    // Validate parameters based on tool name
    const schema = this.toolSchemas[name as keyof TSchemas]
    if (!schema) {
      throw new Error(`Unknown tool: ${name}`)
    }

    const validatedParams = schema.parse(parameters)

    // Delegate to the concrete implementation
    return this.executeToolFunction(name, validatedParams)
  }

  /**
   * Abstract method that concrete classes must implement
   * to handle tool execution
   */
  protected abstract executeToolFunction(name: string, params: any): Promise<any>

  /**
   * Helper method to get tool definition by name
   */
  protected getToolDefinition(name: string) {
    return this.tools.find((tool) => tool.name === name)
  }

  /**
   * Helper method to validate tool exists
   */
  protected validateToolExists(name: string): void {
    const tool = this.getToolDefinition(name)
    if (!tool) {
      throw new Error(`Tool '${name}' is not defined`)
    }
  }
}
