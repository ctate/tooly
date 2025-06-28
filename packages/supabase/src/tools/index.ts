import { z } from 'zod'
import {
  SelectDataSchema,
  InsertDataSchema,
  UpdateDataSchema,
  DeleteDataSchema,
  UpsertDataSchema,
  SignUpSchema,
  SignInSchema,
  CreateBucketSchema,
  UploadFileSchema,
  DownloadFileSchema,
  ListFilesSchema,
} from '../types.js'

// Export all tools
export * from './select-data.js'
export * from './insert-data.js'
export * from './update-data.js'
export * from './delete-data.js'
export * from './upsert-data.js'
export * from './sign-up.js'
export * from './sign-in.js'
export * from './sign-out.js'
export * from './get-user.js'
export * from './upload-file.js'
export * from './download-file.js'
export * from './list-files.js'
export * from './create-bucket.js'

// Import tool definitions
import { selectDataTool } from './select-data.js'
import { insertDataTool } from './insert-data.js'
import { updateDataTool } from './update-data.js'
import { deleteDataTool } from './delete-data.js'
import { upsertDataTool } from './upsert-data.js'
import { signUpTool } from './sign-up.js'
import { signInTool } from './sign-in.js'
import { signOutTool } from './sign-out.js'
import { getUserTool } from './get-user.js'
import { uploadFileTool } from './upload-file.js'
import { downloadFileTool } from './download-file.js'
import { listFilesTool } from './list-files.js'
import { createBucketTool } from './create-bucket.js'

// Export all tools as an array
export const supabaseTools = [
  selectDataTool,
  insertDataTool,
  updateDataTool,
  deleteDataTool,
  upsertDataTool,
  signUpTool,
  signInTool,
  signOutTool,
  getUserTool,
  uploadFileTool,
  downloadFileTool,
  listFilesTool,
  createBucketTool,
] as const

// Tool parameter validation schemas
export const toolParameterSchemas = {
  selectData: SelectDataSchema,
  insertData: InsertDataSchema,
  updateData: UpdateDataSchema,
  deleteData: DeleteDataSchema,
  upsertData: UpsertDataSchema,
  signUp: SignUpSchema,
  signIn: SignInSchema,
  signOut: z.object({}),
  getUser: z.object({}),
  uploadFile: UploadFileSchema,
  downloadFile: DownloadFileSchema,
  listFiles: ListFilesSchema,
  createBucket: CreateBucketSchema,
} as const
