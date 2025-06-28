import { Resend } from 'resend'
import { sendEmail, sendBatchEmails, retrieveEmail, updateEmail, cancelEmail } from './tools/index.js'
import type {
  SendEmailParams,
  SendBatchEmailsParams,
  RetrieveEmailParams,
  UpdateEmailParams,
  CancelEmailParams,
  EmailResponse,
  EmailDetails,
  BatchEmailResponse,
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
    return sendEmail(this.resend, params)
  }

  /**
   * Send batch emails (up to 100)
   */
  async sendBatchEmails(params: SendBatchEmailsParams): Promise<BatchEmailResponse> {
    return sendBatchEmails(this.resend, params)
  }

  /**
   * Retrieve email details by ID
   */
  async retrieveEmail(params: RetrieveEmailParams): Promise<EmailDetails> {
    return retrieveEmail(this.resend, params)
  }

  /**
   * Update a scheduled email
   */
  async updateEmail(params: UpdateEmailParams): Promise<EmailResponse> {
    return updateEmail(this.resend, params)
  }

  /**
   * Cancel a scheduled email
   */
  async cancelEmail(params: CancelEmailParams): Promise<EmailResponse> {
    return cancelEmail(this.resend, params)
  }
}
