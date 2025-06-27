import { LinearHandlers } from "./handlers.js";
import { linearTools, toolParameterSchemas } from "./tools.js";
import { z } from "zod";

export * from "./types.js";
export * from "./tools.js";
export * from "./handlers.js";

/**
 * Main Linear Tools class for AI SDK integration
 */
export class LinearTools {
  private handlers: LinearHandlers;

  constructor(apiKey: string) {
    this.handlers = new LinearHandlers(apiKey);
  }

  /**
   * Get all tool definitions for OpenAI/Anthropic
   */
  getTools() {
    return linearTools;
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
      case "createIssue":
        return this.handlers.createIssue(validatedParams as any);
      case "getIssue":
        return this.handlers.getIssue(validatedParams as any);
      case "updateIssue":
        return this.handlers.updateIssue(validatedParams as any);
      case "searchIssues":
        return this.handlers.searchIssues(validatedParams as any);
      case "createProject":
        return this.handlers.createProject(validatedParams as any);
      case "getTeams":
        return this.handlers.getTeams(validatedParams as any);
      case "getUser":
        return this.handlers.getUser(validatedParams as any);
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
  const linearTools = new LinearTools(apiKey);
  const handlers = linearTools.getHandlers();

  return {
    createIssue: {
      description: "Create a new issue in Linear",
      parameters: toolParameterSchemas.createIssue,
      execute: handlers.createIssue.bind(handlers),
    },
    getIssue: {
      description: "Get details of a specific issue by ID or identifier",
      parameters: toolParameterSchemas.getIssue,
      execute: handlers.getIssue.bind(handlers),
    },
    updateIssue: {
      description: "Update an existing issue",
      parameters: toolParameterSchemas.updateIssue,
      execute: handlers.updateIssue.bind(handlers),
    },
    searchIssues: {
      description: "Search for issues using various filters",
      parameters: toolParameterSchemas.searchIssues,
      execute: handlers.searchIssues.bind(handlers),
    },
    createProject: {
      description: "Create a new project in Linear",
      parameters: toolParameterSchemas.createProject,
      execute: handlers.createProject.bind(handlers),
    },
    getTeams: {
      description: "Get all teams in the Linear workspace",
      parameters: toolParameterSchemas.getTeams,
      execute: handlers.getTeams.bind(handlers),
    },
    getUser: {
      description: "Get user details (current user if no ID provided)",
      parameters: toolParameterSchemas.getUser,
      execute: handlers.getUser.bind(handlers),
    },
  };
}

/**
 * Helper function to create OpenAI function calling setup
 */
export function createOpenAIFunctions(apiKey: string) {
  const linearTools = new LinearTools(apiKey);

  return {
    tools: linearTools.getTools(),
    executeFunction: linearTools.executeFunction.bind(linearTools),
  };
}

/**
 * Helper function to create Anthropic function calling setup
 */
export function createAnthropicTools(apiKey: string) {
  const linearTools = new LinearTools(apiKey);

  // Convert OpenAI-style tools to Anthropic format
  const anthropicTools = linearTools.getTools().map((tool) => ({
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
    executeFunction: linearTools.executeFunction.bind(linearTools),
  };
}

// Default export
export default LinearTools;
