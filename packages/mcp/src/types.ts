export interface MCPServerConfig {
  name: string
  version: string
  enabledIntegrations?: string[]
}

export interface IntegrationConfig {
  name: string
  envKeys: string[]
  createInstance: (envVars: Record<string, string>) => any
  getTools: (instance: any) => Record<string, any>
  getToolDescriptions: () => Record<string, string>
}

export interface ToolExecution {
  name: string
  params: any
}

export interface MCPResponse {
  content: Array<{
    type: string
    text: string
  }>
  isError?: boolean
}
