import { createClient, SupabaseClient } from '@supabase/supabase-js'
import {
  selectData,
  insertData,
  updateData,
  deleteData,
  upsertData,
  signUp,
  signIn,
  signOut,
  getUser,
  uploadFile,
  downloadFile,
  listFiles,
  createBucket,
} from './tools/index.js'
import type {
  SelectDataParams,
  InsertDataParams,
  UpdateDataParams,
  DeleteDataParams,
  UpsertDataParams,
  SignUpParams,
  SignInParams,
  SignOutParams,
  GetUserParams,
  UploadFileParams,
  DownloadFileParams,
  ListFilesParams,
  CreateBucketParams,
  DatabaseResponse,
  AuthResponse,
  StorageResponse,
} from './types'

export class SupabaseHandlers {
  private client: SupabaseClient

  constructor(supabaseUrl: string, supabaseKey: string) {
    this.client = createClient(supabaseUrl, supabaseKey)
  }

  /**
   * Select/query data from a table
   */
  async selectData(params: SelectDataParams): Promise<DatabaseResponse> {
    return selectData(this.client, params)
  }

  /**
   * Insert data into a table
   */
  async insertData(params: InsertDataParams): Promise<DatabaseResponse> {
    return insertData(this.client, params)
  }

  /**
   * Update data in a table
   */
  async updateData(params: UpdateDataParams): Promise<DatabaseResponse> {
    return updateData(this.client, params)
  }

  /**
   * Delete data from a table
   */
  async deleteData(params: DeleteDataParams): Promise<DatabaseResponse> {
    return deleteData(this.client, params)
  }

  /**
   * Upsert data in a table
   */
  async upsertData(params: UpsertDataParams): Promise<DatabaseResponse> {
    return upsertData(this.client, params)
  }

  /**
   * Sign up a new user
   */
  async signUp(params: SignUpParams): Promise<AuthResponse> {
    return signUp(this.client, params)
  }

  /**
   * Sign in a user
   */
  async signIn(params: SignInParams): Promise<AuthResponse> {
    return signIn(this.client, params)
  }

  /**
   * Sign out current user
   */
  async signOut(params: SignOutParams): Promise<AuthResponse> {
    return signOut(this.client, params)
  }

  /**
   * Get current user
   */
  async getUser(params: GetUserParams): Promise<AuthResponse> {
    return getUser(this.client, params)
  }

  /**
   * Upload a file to storage
   */
  async uploadFile(params: UploadFileParams): Promise<StorageResponse> {
    return uploadFile(this.client, params)
  }

  /**
   * Download a file from storage
   */
  async downloadFile(params: DownloadFileParams): Promise<StorageResponse> {
    return downloadFile(this.client, params)
  }

  /**
   * List files in storage bucket
   */
  async listFiles(params: ListFilesParams): Promise<StorageResponse> {
    return listFiles(this.client, params)
  }

  /**
   * Create a storage bucket
   */
  async createBucket(params: CreateBucketParams): Promise<StorageResponse> {
    return createBucket(this.client, params)
  }
}
