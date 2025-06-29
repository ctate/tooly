import { z } from 'zod'
import {
  CreateOrderSchema,
  CaptureOrderSchema,
  CaptureAuthorizedPaymentSchema,
  ReauthorizePaymentSchema,
  RefundCapturedPaymentSchema,
} from '../types.js'

// Export all tools
export * from './create-order.js'
export * from './show-order-details.js'
export * from './capture-order.js'
export * from './authorize-order.js'
export * from './show-authorized-payment.js'
export * from './capture-authorized-payment.js'
export * from './void-authorized-payment.js'
export * from './reauthorize-payment.js'
export * from './show-captured-payment.js'
export * from './refund-captured-payment.js'
export * from './show-refund-details.js'

// Import tool definitions
import { createOrderTool } from './create-order.js'
import { showOrderDetailsTool } from './show-order-details.js'
import { captureOrderTool } from './capture-order.js'
import { authorizeOrderTool } from './authorize-order.js'
import { showAuthorizedPaymentTool } from './show-authorized-payment.js'
import { captureAuthorizedPaymentTool } from './capture-authorized-payment.js'
import { voidAuthorizedPaymentTool } from './void-authorized-payment.js'
import { reauthorizePaymentTool } from './reauthorize-payment.js'
import { showCapturedPaymentTool } from './show-captured-payment.js'
import { refundCapturedPaymentTool } from './refund-captured-payment.js'
import { showRefundDetailsTool } from './show-refund-details.js'

// Export all tools as an array
export const paypalTools = [
  createOrderTool,
  showOrderDetailsTool,
  captureOrderTool,
  authorizeOrderTool,
  showAuthorizedPaymentTool,
  captureAuthorizedPaymentTool,
  voidAuthorizedPaymentTool,
  reauthorizePaymentTool,
  showCapturedPaymentTool,
  refundCapturedPaymentTool,
  showRefundDetailsTool,
] as const

// Tool parameter validation schemas
export const toolParameterSchemas = {
  createOrder: CreateOrderSchema,
  showOrderDetails: z.object({ id: z.string() }),
  captureOrder: z.object({ id: z.string() }).merge(CaptureOrderSchema),
  authorizeOrder: z.object({ id: z.string() }),
  showAuthorizedPayment: z.object({ authorization_id: z.string() }),
  captureAuthorizedPayment: z.object({ authorization_id: z.string() }).merge(CaptureAuthorizedPaymentSchema),
  voidAuthorizedPayment: z.object({ authorization_id: z.string() }),
  reauthorizePayment: z.object({ authorization_id: z.string() }).merge(ReauthorizePaymentSchema),
  showCapturedPayment: z.object({ capture_id: z.string() }),
  refundCapturedPayment: z.object({ capture_id: z.string() }).merge(RefundCapturedPaymentSchema),
  showRefundDetails: z.object({ refund_id: z.string() }),
} as const
