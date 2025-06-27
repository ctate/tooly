import { z } from "zod";
import {
  SendEmailSchema,
  SendBatchEmailsSchema,
  UpdateEmailSchema,
  type SendEmailParams,
  type SendBatchEmailsParams,
  type RetrieveEmailParams,
  type UpdateEmailParams,
  type CancelEmailParams,
} from "./types.js";

// Tool definitions for OpenAI/Anthropic function calling
export const sendEmailTool = {
  name: "sendEmail",
  description: "Send a single email using Resend",
  parameters: {
    type: "object",
    properties: {
      from: {
        type: "string",
        description:
          'Sender email address. To include a friendly name, use the format "Your Name <sender@domain.com>"',
      },
      to: {
        type: "array",
        items: { type: "string" },
        description: "Recipient email addresses (max 50)",
        maxItems: 50,
      },
      subject: {
        type: "string",
        description: "Email subject",
      },
      html: {
        type: "string",
        description: "The HTML version of the message",
      },
      text: {
        type: "string",
        description: "The plain text version of the message",
      },
      bcc: {
        type: "array",
        items: { type: "string" },
        description: "BCC recipient email addresses",
      },
      cc: {
        type: "array",
        items: { type: "string" },
        description: "CC recipient email addresses",
      },
      reply_to: {
        type: "array",
        items: { type: "string" },
        description: "Reply-to email addresses",
      },
      scheduled_at: {
        type: "string",
        description:
          'Schedule email to be sent later. Use natural language (e.g., "in 1 min") or ISO 8601 format',
      },
      headers: {
        type: "object",
        description: "Custom headers to add to the email",
      },
      attachments: {
        type: "array",
        items: {
          type: "object",
          properties: {
            filename: { type: "string" },
            content: { type: "string", description: "Base64 encoded content" },
            path: { type: "string" },
            content_type: { type: "string" },
          },
          required: ["filename"],
        },
        description: "File attachments (max 40MB per email)",
      },
      tags: {
        type: "array",
        items: {
          type: "object",
          properties: {
            name: { type: "string", maxLength: 256 },
            value: { type: "string", maxLength: 256 },
          },
          required: ["name", "value"],
        },
        description: "Custom tags for email tracking",
      },
    },
    required: ["from", "to", "subject"],
  },
} as const;

export const sendBatchEmailsTool = {
  name: "sendBatchEmails",
  description: "Send up to 100 batch emails at once using Resend",
  parameters: {
    type: "object",
    properties: {
      emails: {
        type: "array",
        items: sendEmailTool.parameters,
        maxItems: 100,
        description: "Array of email objects to send (max 100)",
      },
    },
    required: ["emails"],
  },
} as const;

export const retrieveEmailTool = {
  name: "retrieveEmail",
  description: "Retrieve details of a single email by ID",
  parameters: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "The email ID to retrieve",
      },
    },
    required: ["id"],
  },
} as const;

export const updateEmailTool = {
  name: "updateEmail",
  description: "Update a scheduled email",
  parameters: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "The email ID to update",
      },
      scheduled_at: {
        type: "string",
        description:
          'New scheduled time. Use natural language (e.g., "in 1 min") or ISO 8601 format',
      },
    },
    required: ["id"],
  },
} as const;

export const cancelEmailTool = {
  name: "cancelEmail",
  description: "Cancel a scheduled email",
  parameters: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "The email ID to cancel",
      },
    },
    required: ["id"],
  },
} as const;

// Export all tools as an array
export const resendTools = [
  sendEmailTool,
  sendBatchEmailsTool,
  retrieveEmailTool,
  updateEmailTool,
  cancelEmailTool,
] as const;

// Tool parameter validation schemas
export const toolParameterSchemas = {
  sendEmail: SendEmailSchema,
  sendBatchEmails: z.object({ emails: SendBatchEmailsSchema }),
  retrieveEmail: z.object({ id: z.string() }),
  updateEmail: z.object({ id: z.string() }).merge(UpdateEmailSchema),
  cancelEmail: z.object({ id: z.string() }),
} as const;
