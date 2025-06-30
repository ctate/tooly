import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { INTEGRATIONS } from './integrations.js'
import type { MCPServerConfig, IntegrationConfig, ToolExecution, MCPResponse } from './types.js'
import { z } from 'zod'

export class ToolyMCPServer {
  private server: McpServer
  private loadedIntegrations: Map<string, any> = new Map()
  private toolRegistry: Map<string, { integration: string; method: any }> = new Map()

  constructor(config: MCPServerConfig) {
    this.server = new McpServer({
      name: config.name,
      version: config.version,
    })

    this.initializeIntegrations(config.enabledIntegrations)
    this.registerTools()
  }

  private initializeIntegrations(enabledIntegrations?: string[]) {
    console.error(`🔍 Initializing integrations...`)

    const integrationsToLoad = enabledIntegrations || Object.keys(INTEGRATIONS)

    for (const integrationName of integrationsToLoad) {
      const integration = INTEGRATIONS[integrationName]
      if (!integration) {
        console.error(`⚠️  Unknown integration: ${integrationName}`)
        continue
      }

      try {
        // Check if required environment variables are available
        const envVars: Record<string, string> = {}
        let hasAllRequiredVars = true

        for (const envKey of integration.envKeys) {
          const value = process.env[envKey]
          if (value) {
            envVars[envKey] = value
          } else {
            hasAllRequiredVars = false
            break
          }
        }

        if (!hasAllRequiredVars) {
          console.error(
            `⚠️  Skipping ${integration.name}: Missing required environment variables [${integration.envKeys.join(', ')}]`,
          )
          continue
        }

        // Create integration instance
        const instance = integration.createInstance(envVars)
        this.loadedIntegrations.set(integrationName, instance)
        console.error(`✅ Loaded ${integration.name} integration`)
      } catch (error) {
        console.error(`❌ Failed to load ${integration.name}:`, error instanceof Error ? error.message : error)
      }
    }

    console.error(`📊 Loaded ${this.loadedIntegrations.size} integrations`)
  }

  private registerTools() {
    console.error(`🔧 Registering tools...`)
    let toolCount = 0

    for (const [integrationName, instance] of this.loadedIntegrations) {
      const integration = INTEGRATIONS[integrationName]
      if (!integration) continue

      const tools = integration.getTools(instance)
      const descriptions = integration.getToolDescriptions()

      for (const [toolName, toolMethod] of Object.entries(tools)) {
        // Create a prefixed tool name to avoid conflicts
        const prefixedToolName = `${integrationName}_${toolName}`

        // Register tool with MCP server
        this.server.registerTool(
          prefixedToolName,
          {
            title: `${integration.name}: ${descriptions[toolName] || toolName}`,
            description: descriptions[toolName] || `Execute ${toolName} on ${integration.name}`,
            inputSchema: {}, // Accept any parameters - validation happens in the tool handlers
          },
          async (params: any) => {
            return this.executeTool({
              name: prefixedToolName,
              params,
            })
          },
        )

        // Store in registry for execution
        this.toolRegistry.set(prefixedToolName, {
          integration: integrationName,
          method: toolMethod,
        })

        toolCount++
      }
    }

    console.error(`🚀 Registered ${toolCount} tools across ${this.loadedIntegrations.size} integrations`)
  }

  private async executeTool(execution: ToolExecution) {
    const tool = this.toolRegistry.get(execution.name)
    if (!tool) {
      return {
        content: [
          {
            type: 'text' as const,
            text: `Tool ${execution.name} not found`,
          },
        ],
        isError: true,
      }
    }

    try {
      console.error(`🔄 Executing ${execution.name} with params:`, JSON.stringify(execution.params, null, 2))

      const result = await tool.method(execution.params)

      console.error(`✅ Tool ${execution.name} executed successfully`)

      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify(result, null, 2),
          },
        ],
      }
    } catch (error) {
      console.error(`❌ Tool ${execution.name} failed:`, error)

      return {
        content: [
          {
            type: 'text' as const,
            text: `Error executing ${execution.name}: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
        isError: true,
      }
    }
  }

  public async start() {
    if (this.loadedIntegrations.size === 0) {
      console.error(`❌ No integrations loaded. Please check your environment variables.`)
      console.error(``)
      console.error(`Available integrations and their required environment variables:`)
      for (const [name, integration] of Object.entries(INTEGRATIONS)) {
        console.error(`  ${integration.name}: ${integration.envKeys.join(', ')}`)
      }
      process.exit(1)
    }

    console.error(`🚀 Starting Tooly MCP Server with ${this.loadedIntegrations.size} integrations...`)

    const transport = new StdioServerTransport()
    await this.server.connect(transport)

    console.error(`📡 MCP Server started and listening on stdio`)
  }

  public getLoadedIntegrations(): string[] {
    return Array.from(this.loadedIntegrations.keys())
  }

  public getAvailableTools(): string[] {
    return Array.from(this.toolRegistry.keys())
  }
}
