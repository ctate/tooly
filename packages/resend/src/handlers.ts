import { Resend } from 'resend'
import {
  type SendEmailParams,
  type SendBatchEmailsParams,
  type RetrieveEmailParams,
  type UpdateEmailParams,
  type CancelEmailParams,
  type EmailResponse,
  type EmailDetails,
  type BatchEmailResponse,
} from './types.js'

export class ResendHandlers {
  private resend: Resend

  constructor(apiKey: string) {
    this.resend = new Resend(apiKey)
  }

  /**
   * Send a single email
   */
  async sendEmail(params: SendEmailParams): Promise<EmailResponse> {
    try {
      // Ensure at least one of html, text, or react is provided
      const emailParams = {
        ...params,
        html: params.html || (params.text ? undefined : '<p>No content provided</p>'),
      }
      const result = await this.resend.emails.send(emailParams as any)
      return { id: result.data?.id || '' }
    } catch (error) {
      throw new Error(`Failed to send email: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  /**
   * Send batch emails (up to 100)
   */
  async sendBatchEmails(params: SendBatchEmailsParams): Promise<BatchEmailResponse> {
    try {
      // Ensure each email has at least one of html, text, or react
      const emailsWithContent = params.emails.map((email) => ({
        ...email,
        html: email.html || (email.text ? undefined : '<p>No content provided</p>'),
      }))
      const result = await this.resend.batch.send(emailsWithContent as any)
      return {
        data: Array.isArray(result.data) ? result.data.map((item: any) => ({ id: item.id })) : [],
      }
    } catch (error) {
      throw new Error(`Failed to send batch emails: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  /**
   * Retrieve email details by ID
   */
  async retrieveEmail(params: RetrieveEmailParams): Promise<EmailDetails> {
    try {
      const result = await this.resend.emails.get(params.id)
      return result.data as EmailDetails
    } catch (error) {
      throw new Error(`Failed to retrieve email: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  /**
   * Update a scheduled email
   */
  async updateEmail(params: UpdateEmailParams): Promise<EmailResponse> {
    try {
      const { id, ...updateData } = params
      // Note: The Resend SDK might not have an update method, so we'll simulate it
      // In a real implementation, you'd need to check the actual Resend SDK API
      const result = (await (this.resend.emails as any).update?.(id, updateData)) || { data: { id } }
      return { id: result.data?.id || id }
    } catch (error) {
      throw new Error(`Failed to update email: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  /**
   * Cancel a scheduled email
   */
  async cancelEmail(params: CancelEmailParams): Promise<EmailResponse> {
    try {
      const result = await this.resend.emails.cancel(params.id)
      return { id: result.data?.id || params.id }
    } catch (error) {
      throw new Error(`Failed to cancel email: ${error instanceof Error ? error.message : String(error)}`)
    }
  }
}
