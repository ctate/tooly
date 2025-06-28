import { z } from 'zod'

// Base types
export const SupabaseUrlSchema = z.string().url()
export const SupabaseKeySchema = z.string()

// Database schemas
export const TableNameSchema = z.string().min(1)
export const ColumnNameSchema = z.string().min(1)

export const SelectColumnsSchema = z.union([z.string(), z.array(z.string())])

export const FilterOperatorSchema = z.enum([
  'eq',
  'neq',
  'gt',
  'gte',
  'lt',
  'lte',
  'like',
  'ilike',
  'is',
  'in',
  'contains',
])

export const OrderDirectionSchema = z.enum(['asc', 'desc'])

// Database operation schemas
export const SelectDataSchema = z.object({
  table: TableNameSchema,
  columns: SelectColumnsSchema.optional(),
  filters: z
    .array(
      z.object({
        column: ColumnNameSchema,
        operator: FilterOperatorSchema,
        value: z.any(),
      }),
    )
    .optional(),
  orderBy: z
    .object({
      column: ColumnNameSchema,
      ascending: z.boolean().default(true),
    })
    .optional(),
  limit: z.number().min(1).max(1000).optional(),
  offset: z.number().min(0).optional(),
})

export const InsertDataSchema = z.object({
  table: TableNameSchema,
  data: z.union([z.record(z.any()), z.array(z.record(z.any()))]),
})

export const UpdateDataSchema = z.object({
  table: TableNameSchema,
  data: z.record(z.any()),
  filters: z.array(
    z.object({
      column: ColumnNameSchema,
      operator: FilterOperatorSchema,
      value: z.any(),
    }),
  ),
})

export const DeleteDataSchema = z.object({
  table: TableNameSchema,
  filters: z.array(
    z.object({
      column: ColumnNameSchema,
      operator: FilterOperatorSchema,
      value: z.any(),
    }),
  ),
})

export const UpsertDataSchema = z.object({
  table: TableNameSchema,
  data: z.union([z.record(z.any()), z.array(z.record(z.any()))]),
  onConflict: z.string().optional(),
})

// Auth schemas
export const SignUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  options: z
    .object({
      data: z.record(z.any()).optional(),
      emailRedirectTo: z.string().url().optional(),
    })
    .optional(),
})

export const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export const SignInWithOTPSchema = z.object({
  email: z.string().email(),
  options: z
    .object({
      emailRedirectTo: z.string().url().optional(),
      shouldCreateUser: z.boolean().optional(),
    })
    .optional(),
})

export const ResetPasswordSchema = z.object({
  email: z.string().email(),
  redirectTo: z.string().url().optional(),
})

export const UpdateUserSchema = z.object({
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
  data: z.record(z.any()).optional(),
})

// Storage schemas
export const BucketNameSchema = z.string().min(1)
export const FilePathSchema = z.string().min(1)

export const CreateBucketSchema = z.object({
  name: BucketNameSchema,
  options: z
    .object({
      public: z.boolean().default(false),
      fileSizeLimit: z.number().optional(),
      allowedMimeTypes: z.array(z.string()).optional(),
    })
    .optional(),
})

export const UploadFileSchema = z.object({
  bucket: BucketNameSchema,
  path: FilePathSchema,
  file: z.any(), // File, Blob, or ArrayBuffer
  options: z
    .object({
      cacheControl: z.string().optional(),
      contentType: z.string().optional(),
      upsert: z.boolean().default(false),
    })
    .optional(),
})

export const DownloadFileSchema = z.object({
  bucket: BucketNameSchema,
  path: FilePathSchema,
})

export const ListFilesSchema = z.object({
  bucket: BucketNameSchema,
  path: z.string().default(''),
  options: z
    .object({
      limit: z.number().min(1).max(1000).optional(),
      offset: z.number().min(0).optional(),
      sortBy: z
        .object({
          column: z.enum(['name', 'updated_at', 'created_at', 'last_accessed_at']),
          order: OrderDirectionSchema,
        })
        .optional(),
    })
    .optional(),
})

export const DeleteFilesSchema = z.object({
  bucket: BucketNameSchema,
  paths: z.array(FilePathSchema),
})

export const CreateSignedUrlSchema = z.object({
  bucket: BucketNameSchema,
  path: FilePathSchema,
  expiresIn: z.number().min(1).max(31536000), // Max 1 year
})

// Response schemas
export const DatabaseResponseSchema = z.object({
  data: z.any(),
  error: z.any().nullable(),
})

export const AuthResponseSchema = z.object({
  data: z
    .object({
      user: z.any().nullable(),
      session: z.any().nullable(),
    })
    .nullable(),
  error: z.any().nullable(),
})

export const StorageResponseSchema = z.object({
  data: z.any().nullable(),
  error: z.any().nullable(),
})

export const FileObjectSchema = z.object({
  name: z.string(),
  id: z.string().optional(),
  updated_at: z.string().optional(),
  created_at: z.string().optional(),
  last_accessed_at: z.string().optional(),
  metadata: z.record(z.any()).optional(),
})

export const BucketSchema = z.object({
  id: z.string(),
  name: z.string(),
  owner: z.string().optional(),
  public: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
  allowed_mime_types: z.array(z.string()).optional(),
  file_size_limit: z.number().optional(),
})

// Export inferred types
export type TableName = z.infer<typeof TableNameSchema>
export type ColumnName = z.infer<typeof ColumnNameSchema>
export type SelectColumns = z.infer<typeof SelectColumnsSchema>
export type FilterOperator = z.infer<typeof FilterOperatorSchema>
export type OrderDirection = z.infer<typeof OrderDirectionSchema>

export type SelectDataInput = z.infer<typeof SelectDataSchema>
export type InsertDataInput = z.infer<typeof InsertDataSchema>
export type UpdateDataInput = z.infer<typeof UpdateDataSchema>
export type DeleteDataInput = z.infer<typeof DeleteDataSchema>
export type UpsertDataInput = z.infer<typeof UpsertDataSchema>

export type SignUpInput = z.infer<typeof SignUpSchema>
export type SignInInput = z.infer<typeof SignInSchema>
export type SignInWithOTPInput = z.infer<typeof SignInWithOTPSchema>
export type ResetPasswordInput = z.infer<typeof ResetPasswordSchema>
export type UpdateUserInput = z.infer<typeof UpdateUserSchema>

export type CreateBucketInput = z.infer<typeof CreateBucketSchema>
export type UploadFileInput = z.infer<typeof UploadFileSchema>
export type DownloadFileInput = z.infer<typeof DownloadFileSchema>
export type ListFilesInput = z.infer<typeof ListFilesSchema>
export type DeleteFilesInput = z.infer<typeof DeleteFilesSchema>
export type CreateSignedUrlInput = z.infer<typeof CreateSignedUrlSchema>

export type DatabaseResponse = z.infer<typeof DatabaseResponseSchema>
export type AuthResponse = z.infer<typeof AuthResponseSchema>
export type StorageResponse = z.infer<typeof StorageResponseSchema>
export type FileObject = z.infer<typeof FileObjectSchema>
export type Bucket = z.infer<typeof BucketSchema>

// Tool parameter types
export interface SelectDataParams extends SelectDataInput {}
export interface InsertDataParams extends InsertDataInput {}
export interface UpdateDataParams extends UpdateDataInput {}
export interface DeleteDataParams extends DeleteDataInput {}
export interface UpsertDataParams extends UpsertDataInput {}

export interface SignUpParams extends SignUpInput {}
export interface SignInParams extends SignInInput {}
export interface SignInWithOTPParams extends SignInWithOTPInput {}
export interface ResetPasswordParams extends ResetPasswordInput {}
export interface UpdateUserParams extends UpdateUserInput {}
export interface GetUserParams {}
export interface SignOutParams {}

export interface CreateBucketParams extends CreateBucketInput {}
export interface UploadFileParams extends UploadFileInput {}
export interface DownloadFileParams extends DownloadFileInput {}
export interface ListFilesParams extends ListFilesInput {}
export interface DeleteFilesParams extends DeleteFilesInput {}
export interface CreateSignedUrlParams extends CreateSignedUrlInput {}
export interface ListBucketsParams {}
export interface DeleteBucketParams {
  name: string
}
