import { z } from "zod";

// Common tool definition interfaces
export interface ToolDefinition {
  readonly name: string;
  readonly description: string;
  readonly parameters: {
    readonly type: "object";
    readonly properties: Record<string, any>;
    readonly required?: readonly string[];
  };
}

export type ToolDefinitions = readonly ToolDefinition[];

// Tool parameter schemas type
export type ToolParameterSchemas = Record<string, z.ZodSchema>;

// Tool execution result
export interface ToolExecutionResult {
  success: boolean;
  data?: any;
  error?: string;
}

// AI Framework tool interfaces
export interface VercelAITool {
  description: string;
  parameters: z.ZodSchema;
  execute: (...args: any[]) => Promise<any>;
}

export type VercelAITools = Record<string, VercelAITool>;

export interface OpenAIFunctionSetup {
  tools: ToolDefinitions;
  executeFunction: (name: string, parameters: any) => Promise<any>;
}

export interface AnthropicToolDefinition {
  name: string;
  description: string;
  input_schema: {
    type: "object";
    properties: Record<string, any>;
    required?: readonly string[];
  };
}

export interface AnthropicToolSetup {
  tools: AnthropicToolDefinition[];
  executeFunction: (name: string, parameters: any) => Promise<any>;
}

// Base handler interface
export interface BaseHandler {
  [methodName: string]: (...args: any[]) => Promise<any>;
}

// Tool manager interface
export interface ToolManager<
  TSchemas extends ToolParameterSchemas = ToolParameterSchemas,
  TTools extends ToolDefinitions = ToolDefinitions,
> {
  getTools(): TTools;
  getToolSchemas(): TSchemas;
  executeFunction(name: string, parameters: any): Promise<any>;
}
