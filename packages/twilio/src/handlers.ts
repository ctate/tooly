import { Twilio } from 'twilio'
import {
  sendSms,
  sendWhatsApp,
  makeCall,
  getCallStatus,
  getMessageStatus,
  listMessages,
  listCalls,
  getPhoneNumber,
} from './tools'
import type {
  SendSmsParams,
  SendWhatsAppParams,
  MakeCallParams,
  GetCallStatusParams,
  GetMessageStatusParams,
  ListMessagesParams,
  ListCallsParams,
  GetPhoneNumberParams,
  MessageResponse,
  CallResponse,
  PhoneNumberDetails,
  MessagesList,
  CallsList,
} from './types'

export class TwilioHandlers {
  private twilio: Twilio

  constructor(accountSid: string, authToken: string) {
    this.twilio = new Twilio(accountSid, authToken)
  }

  /**
   * Send an SMS message
   */
  async sendSms(params: SendSmsParams): Promise<MessageResponse> {
    return sendSms(this.twilio, params)
  }

  /**
   * Send a WhatsApp message
   */
  async sendWhatsApp(params: SendWhatsAppParams): Promise<MessageResponse> {
    return sendWhatsApp(this.twilio, params)
  }

  /**
   * Make a phone call
   */
  async makeCall(params: MakeCallParams): Promise<CallResponse> {
    return makeCall(this.twilio, params)
  }

  /**
   * Get call status and details
   */
  async getCallStatus(params: GetCallStatusParams): Promise<CallResponse> {
    return getCallStatus(this.twilio, params)
  }

  /**
   * Get message status and details
   */
  async getMessageStatus(params: GetMessageStatusParams): Promise<MessageResponse> {
    return getMessageStatus(this.twilio, params)
  }

  /**
   * List messages with optional filtering
   */
  async listMessages(params: ListMessagesParams = {}): Promise<MessagesList> {
    return listMessages(this.twilio, params)
  }

  /**
   * List calls with optional filtering
   */
  async listCalls(params: ListCallsParams = {}): Promise<CallsList> {
    return listCalls(this.twilio, params)
  }

  /**
   * Get phone number details and validation
   */
  async getPhoneNumber(params: GetPhoneNumberParams): Promise<PhoneNumberDetails> {
    return getPhoneNumber(this.twilio, params)
  }
}
