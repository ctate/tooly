import { ResendHandlers } from "./handlers.js";
import { resendTools, toolParameterSchemas } from "./tools.js";
import { z } from "zod";

export * from "./types.js";
export * from "./tools.js";
export * from "./handlers.js";

/**
 * Main Resend Tools class for AI SDK integration
 */
export class ResendTools {
  private handlers: ResendHandlers;

  constructor(apiKey: string) {
    this.handlers = new ResendHandlers(apiKey);
  }

  /**
   * Get all tool definitions for OpenAI/Anthropic
   */
  getTools() {
    return resendTools;
  }

  /**
   * Execute a tool function by name
   */
  async executeFunction(name: string, parameters: any) {
    // Validate parameters based on tool name
    const schema =
      toolParameterSchemas[name as keyof typeof toolParameterSchemas];
    if (!schema) {
      throw new Error(`Unknown tool: ${name}`);
    }

    const validatedParams = schema.parse(parameters);

    switch (name) {
      case "sendEmail":
        return this.handlers.sendEmail(validatedParams as any);
      case "sendBatchEmails":
        return this.handlers.sendBatchEmails(validatedParams as any);
      case "retrieveEmail":
        return this.handlers.retrieveEmail(validatedParams as any);
      case "updateEmail":
        return this.handlers.updateEmail(validatedParams as any);
      case "cancelEmail":
        return this.handlers.cancelEmail(validatedParams as any);
      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  }

  /**
   * Get individual handlers for direct use
   */
  getHandlers() {
    return this.handlers;
  }
}

/**
 * Create Vercel AI SDK compatible tools
 */
export function createVercelAITools(apiKey: string) {
  const resendTools = new ResendTools(apiKey);
  const handlers = resendTools.getHandlers();

  return {
    sendEmail: {
      description: "Send a single email using Resend",
      parameters: toolParameterSchemas.sendEmail,
      execute: handlers.sendEmail.bind(handlers),
    },
    sendBatchEmails: {
      description: "Send up to 100 batch emails at once using Resend",
      parameters: toolParameterSchemas.sendBatchEmails,
      execute: handlers.sendBatchEmails.bind(handlers),
    },
    retrieveEmail: {
      description: "Retrieve details of a single email by ID",
      parameters: toolParameterSchemas.retrieveEmail,
      execute: handlers.retrieveEmail.bind(handlers),
    },
    updateEmail: {
      description: "Update a scheduled email",
      parameters: toolParameterSchemas.updateEmail,
      execute: handlers.updateEmail.bind(handlers),
    },
    cancelEmail: {
      description: "Cancel a scheduled email",
      parameters: toolParameterSchemas.cancelEmail,
      execute: handlers.cancelEmail.bind(handlers),
    },
  };
}

/**
 * Helper function to create OpenAI function calling setup
 */
export function createOpenAIFunctions(apiKey: string) {
  const resendTools = new ResendTools(apiKey);

  return {
    tools: resendTools.getTools(),
    executeFunction: resendTools.executeFunction.bind(resendTools),
  };
}

/**
 * Helper function to create Anthropic function calling setup
 */
export function createAnthropicTools(apiKey: string) {
  const resendTools = new ResendTools(apiKey);

  // Convert OpenAI-style tools to Anthropic format
  const anthropicTools = resendTools.getTools().map((tool) => ({
    name: tool.name,
    description: tool.description,
    input_schema: {
      type: "object",
      properties: tool.parameters.properties,
      required: tool.parameters.required,
    },
  }));

  return {
    tools: anthropicTools,
    executeFunction: resendTools.executeFunction.bind(resendTools),
  };
}

// Default export
export default ResendTools;
