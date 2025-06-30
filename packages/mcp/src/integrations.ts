import { GitHubTools } from '@tooly/github'
import { LinearTools } from '@tooly/linear'
import { NotionTools } from '@tooly/notion'
import { StripeTools } from '@tooly/stripe'
import { SupabaseTools } from '@tooly/supabase'
import { ResendTools } from '@tooly/resend'
import { TwilioTools } from '@tooly/twilio'
import { VercelTools } from '@tooly/vercel'
import { JiraTools } from '@tooly/jira'
import { PayPalTools } from '@tooly/paypal'
import { FirecrawlTools } from '@tooly/firecrawl'
import type { IntegrationConfig } from './types.js'

export const INTEGRATIONS: Record<string, IntegrationConfig> = {
  github: {
    name: 'GitHub',
    envKeys: ['GITHUB_TOKEN', 'GITHUB_API_KEY'],
    createInstance: (envVars) => {
      const token = envVars.GITHUB_TOKEN || envVars.GITHUB_API_KEY
      if (!token) throw new Error('GitHub token not found')
      return new GitHubTools(token)
    },
    getTools: (instance: GitHubTools) => ({
      createIssue: instance.getHandlers().createIssue.bind(instance.getHandlers()),
      getIssue: instance.getHandlers().getIssue.bind(instance.getHandlers()),
      updateIssue: instance.getHandlers().updateIssue.bind(instance.getHandlers()),
      searchIssues: instance.getHandlers().searchIssues.bind(instance.getHandlers()),
      getRepository: instance.getHandlers().getRepository.bind(instance.getHandlers()),
      getUser: instance.getHandlers().getUser.bind(instance.getHandlers()),
    }),
    getToolDescriptions: () => ({
      createIssue: 'Create a new issue in a GitHub repository',
      getIssue: 'Get details of a specific GitHub issue',
      updateIssue: 'Update an existing GitHub issue',
      searchIssues: 'Search for GitHub issues',
      getRepository: 'Get information about a GitHub repository',
      getUser: 'Get information about a GitHub user',
    }),
  },

  linear: {
    name: 'Linear',
    envKeys: ['LINEAR_API_KEY'],
    createInstance: (envVars) => {
      const apiKey = envVars.LINEAR_API_KEY
      if (!apiKey) throw new Error('Linear API key not found')
      return new LinearTools(apiKey)
    },
    getTools: (instance: LinearTools) => ({
      createIssue: instance.getHandlers().createIssue.bind(instance.getHandlers()),
      getIssue: instance.getHandlers().getIssue.bind(instance.getHandlers()),
      updateIssue: instance.getHandlers().updateIssue.bind(instance.getHandlers()),
      searchIssues: instance.getHandlers().searchIssues.bind(instance.getHandlers()),
      createProject: instance.getHandlers().createProject.bind(instance.getHandlers()),
      getTeams: instance.getHandlers().getTeams.bind(instance.getHandlers()),
      getUser: instance.getHandlers().getUser.bind(instance.getHandlers()),
    }),
    getToolDescriptions: () => ({
      createIssue: 'Create a new issue in Linear',
      getIssue: 'Get details of a specific Linear issue',
      updateIssue: 'Update an existing Linear issue',
      searchIssues: 'Search for Linear issues',
      createProject: 'Create a new project in Linear',
      getTeams: 'Get all teams in the Linear workspace',
      getUser: 'Get Linear user details',
    }),
  },

  notion: {
    name: 'Notion',
    envKeys: ['NOTION_API_KEY'],
    createInstance: (envVars) => {
      const apiKey = envVars.NOTION_API_KEY
      if (!apiKey) throw new Error('Notion API key not found')
      return new NotionTools(apiKey)
    },
    getTools: (instance: NotionTools) => ({
      createPage: instance.getHandlers().createPage.bind(instance.getHandlers()),
      getPage: instance.getHandlers().getPage.bind(instance.getHandlers()),
      updatePage: instance.getHandlers().updatePage.bind(instance.getHandlers()),
      searchPages: instance.getHandlers().searchPages.bind(instance.getHandlers()),
      createDatabase: instance.getHandlers().createDatabase.bind(instance.getHandlers()),
      getDatabase: instance.getHandlers().getDatabase.bind(instance.getHandlers()),
      updateDatabase: instance.getHandlers().updateDatabase.bind(instance.getHandlers()),
      queryDatabase: instance.getHandlers().queryDatabase.bind(instance.getHandlers()),
    }),
    getToolDescriptions: () => ({
      createPage: 'Create a new page in Notion',
      getPage: 'Get details of a specific Notion page',
      updatePage: 'Update an existing Notion page',
      searchPages: 'Search for Notion pages',
      createDatabase: 'Create a new database in Notion',
      getDatabase: 'Get details of a specific Notion database',
      updateDatabase: 'Update an existing Notion database',
      queryDatabase: 'Query a Notion database',
    }),
  },

  stripe: {
    name: 'Stripe',
    envKeys: ['STRIPE_SECRET_KEY'],
    createInstance: (envVars) => {
      const secretKey = envVars.STRIPE_SECRET_KEY
      if (!secretKey) throw new Error('Stripe secret key not found')
      return new StripeTools(secretKey)
    },
    getTools: (instance: StripeTools) => ({
      createCustomer: instance.getHandlers().createCustomer.bind(instance.getHandlers()),
      getCustomer: instance.getHandlers().getCustomer.bind(instance.getHandlers()),
      listCustomers: instance.getHandlers().listCustomers.bind(instance.getHandlers()),
      createPaymentIntent: instance.getHandlers().createPaymentIntent.bind(instance.getHandlers()),
      getPaymentIntent: instance.getHandlers().getPaymentIntent.bind(instance.getHandlers()),
      createInvoice: instance.getHandlers().createInvoice.bind(instance.getHandlers()),
      getInvoice: instance.getHandlers().getInvoice.bind(instance.getHandlers()),
    }),
    getToolDescriptions: () => ({
      createCustomer: 'Create a new Stripe customer',
      getCustomer: 'Get details of a specific Stripe customer',
      listCustomers: 'List Stripe customers',
      createPaymentIntent: 'Create a new Stripe payment intent',
      getPaymentIntent: 'Get details of a specific Stripe payment intent',
      createInvoice: 'Create a new Stripe invoice',
      getInvoice: 'Get details of a specific Stripe invoice',
    }),
  },

  supabase: {
    name: 'Supabase',
    envKeys: ['SUPABASE_URL', 'SUPABASE_ANON_KEY'],
    createInstance: (envVars) => {
      const url = envVars.SUPABASE_URL
      const anonKey = envVars.SUPABASE_ANON_KEY
      if (!url || !anonKey) throw new Error('Supabase URL and anon key are required')
      return new SupabaseTools(url, anonKey)
    },
    getTools: (instance: SupabaseTools) => ({
      selectData: instance.getHandlers().selectData.bind(instance.getHandlers()),
      insertData: instance.getHandlers().insertData.bind(instance.getHandlers()),
      updateData: instance.getHandlers().updateData.bind(instance.getHandlers()),
      deleteData: instance.getHandlers().deleteData.bind(instance.getHandlers()),
      upsertData: instance.getHandlers().upsertData.bind(instance.getHandlers()),
      signUp: instance.getHandlers().signUp.bind(instance.getHandlers()),
      signIn: instance.getHandlers().signIn.bind(instance.getHandlers()),
      signOut: instance.getHandlers().signOut.bind(instance.getHandlers()),
      getUser: instance.getHandlers().getUser.bind(instance.getHandlers()),
      uploadFile: instance.getHandlers().uploadFile.bind(instance.getHandlers()),
      downloadFile: instance.getHandlers().downloadFile.bind(instance.getHandlers()),
      listFiles: instance.getHandlers().listFiles.bind(instance.getHandlers()),
      createBucket: instance.getHandlers().createBucket.bind(instance.getHandlers()),
    }),
    getToolDescriptions: () => ({
      selectData: 'Select data from Supabase table',
      insertData: 'Insert data into Supabase table',
      updateData: 'Update data in Supabase table',
      deleteData: 'Delete data from Supabase table',
      upsertData: 'Upsert data in Supabase table',
      signUp: 'Sign up a new user in Supabase',
      signIn: 'Sign in a user in Supabase',
      signOut: 'Sign out a user in Supabase',
      getUser: 'Get user details from Supabase',
      uploadFile: 'Upload file to Supabase storage',
      downloadFile: 'Download file from Supabase storage',
      listFiles: 'List files in Supabase storage',
      createBucket: 'Create a new bucket in Supabase storage',
    }),
  },

  resend: {
    name: 'Resend',
    envKeys: ['RESEND_API_KEY'],
    createInstance: (envVars) => {
      const apiKey = envVars.RESEND_API_KEY
      if (!apiKey) throw new Error('Resend API key not found')
      return new ResendTools(apiKey)
    },
    getTools: (instance: ResendTools) => ({
      sendEmail: instance.getHandlers().sendEmail.bind(instance.getHandlers()),
      sendBatchEmails: instance.getHandlers().sendBatchEmails.bind(instance.getHandlers()),
      retrieveEmail: instance.getHandlers().retrieveEmail.bind(instance.getHandlers()),
      updateEmail: instance.getHandlers().updateEmail.bind(instance.getHandlers()),
      cancelEmail: instance.getHandlers().cancelEmail.bind(instance.getHandlers()),
    }),
    getToolDescriptions: () => ({
      sendEmail: 'Send an email using Resend',
      sendBatchEmails: 'Send multiple emails in batch using Resend',
      retrieveEmail: 'Retrieve details of a sent email',
      updateEmail: 'Update an email',
      cancelEmail: 'Cancel a scheduled email',
    }),
  },

  twilio: {
    name: 'Twilio',
    envKeys: ['TWILIO_ACCOUNT_SID', 'TWILIO_AUTH_TOKEN'],
    createInstance: (envVars) => {
      const accountSid = envVars.TWILIO_ACCOUNT_SID
      const authToken = envVars.TWILIO_AUTH_TOKEN
      if (!accountSid || !authToken) throw new Error('Twilio Account SID and Auth Token are required')
      return new TwilioTools(accountSid, authToken)
    },
    getTools: (instance: TwilioTools) => ({
      sendSms: instance.getHandlers().sendSms.bind(instance.getHandlers()),
      sendWhatsApp: instance.getHandlers().sendWhatsApp.bind(instance.getHandlers()),
      makeCall: instance.getHandlers().makeCall.bind(instance.getHandlers()),
      getCallStatus: instance.getHandlers().getCallStatus.bind(instance.getHandlers()),
      getMessageStatus: instance.getHandlers().getMessageStatus.bind(instance.getHandlers()),
      listMessages: instance.getHandlers().listMessages.bind(instance.getHandlers()),
      listCalls: instance.getHandlers().listCalls.bind(instance.getHandlers()),
      getPhoneNumber: instance.getHandlers().getPhoneNumber.bind(instance.getHandlers()),
    }),
    getToolDescriptions: () => ({
      sendSms: 'Send an SMS message using Twilio',
      sendWhatsApp: 'Send a WhatsApp message using Twilio',
      makeCall: 'Make a phone call using Twilio',
      getCallStatus: 'Get the status of a phone call',
      getMessageStatus: 'Get the status of a message',
      listMessages: 'List messages sent via Twilio',
      listCalls: 'List calls made via Twilio',
      getPhoneNumber: 'Get details of a phone number',
    }),
  },

  vercel: {
    name: 'Vercel',
    envKeys: ['VERCEL_TOKEN'],
    createInstance: (envVars) => {
      const token = envVars.VERCEL_TOKEN
      if (!token) throw new Error('Vercel token not found')
      return new VercelTools(token)
    },
    getTools: (instance: VercelTools) => ({
      createProject: instance.getHandlers().createProject.bind(instance.getHandlers()),
      getProject: instance.getHandlers().getProject.bind(instance.getHandlers()),
      updateProject: instance.getHandlers().updateProject.bind(instance.getHandlers()),
      deleteProject: instance.getHandlers().deleteProject.bind(instance.getHandlers()),
      listProjects: instance.getHandlers().listProjects.bind(instance.getHandlers()),
      getDeployment: instance.getHandlers().getDeployment.bind(instance.getHandlers()),
      listDeployments: instance.getHandlers().listDeployments.bind(instance.getHandlers()),
      listProjectDomains: instance.getHandlers().listProjectDomains.bind(instance.getHandlers()),
      getTeam: instance.getHandlers().getTeam.bind(instance.getHandlers()),
    }),
    getToolDescriptions: () => ({
      createProject: 'Create a new project in Vercel',
      getProject: 'Get details of a specific Vercel project',
      updateProject: 'Update an existing Vercel project',
      deleteProject: 'Delete a Vercel project',
      listProjects: 'List all Vercel projects',
      getDeployment: 'Get details of a specific deployment',
      listDeployments: 'List deployments for a project',
      listProjectDomains: 'List domains for a project',
      getTeam: 'Get team information',
    }),
  },

  jira: {
    name: 'Jira',
    envKeys: ['JIRA_HOST', 'JIRA_EMAIL', 'JIRA_API_TOKEN'],
    createInstance: (envVars) => {
      const host = envVars.JIRA_HOST
      const email = envVars.JIRA_EMAIL
      const apiToken = envVars.JIRA_API_TOKEN
      if (!host || !email || !apiToken) throw new Error('Jira host, email, and API token are required')
      return new JiraTools({
        protocol: 'https',
        host: host.replace(/^https?:\/\//, ''),
        username: email,
        password: apiToken,
        apiVersion: '3',
      })
    },
    getTools: (instance: JiraTools) => ({
      createIssue: instance.getHandlers().createIssue.bind(instance.getHandlers()),
      getIssue: instance.getHandlers().getIssue.bind(instance.getHandlers()),
      updateIssue: instance.getHandlers().updateIssue.bind(instance.getHandlers()),
      searchIssues: instance.getHandlers().searchIssues.bind(instance.getHandlers()),
      getProjects: instance.getHandlers().getProjects.bind(instance.getHandlers()),
      getUser: instance.getHandlers().getUser.bind(instance.getHandlers()),
    }),
    getToolDescriptions: () => ({
      createIssue: 'Create a new issue in Jira',
      getIssue: 'Get details of a specific Jira issue',
      updateIssue: 'Update an existing Jira issue',
      searchIssues: 'Search for Jira issues',
      getProjects: 'Get all accessible Jira projects',
      getUser: 'Get Jira user details',
    }),
  },

  paypal: {
    name: 'PayPal',
    envKeys: ['PAYPAL_CLIENT_ID', 'PAYPAL_CLIENT_SECRET'],
    createInstance: (envVars) => {
      const clientId = envVars.PAYPAL_CLIENT_ID
      const clientSecret = envVars.PAYPAL_CLIENT_SECRET
      const environment = envVars.PAYPAL_ENVIRONMENT || 'sandbox'
      if (!clientId || !clientSecret) throw new Error('PayPal client ID and secret are required')
      return new PayPalTools(clientId, clientSecret, environment as 'sandbox' | 'live' | undefined)
    },
    getTools: (instance: PayPalTools) => ({
      createOrder: instance.getHandlers().createOrder.bind(instance.getHandlers()),
      showOrderDetails: instance.getHandlers().showOrderDetails.bind(instance.getHandlers()),
      authorizeOrder: instance.getHandlers().authorizeOrder.bind(instance.getHandlers()),
      captureOrder: instance.getHandlers().captureOrder.bind(instance.getHandlers()),
      showAuthorizedPayment: instance.getHandlers().showAuthorizedPayment.bind(instance.getHandlers()),
      captureAuthorizedPayment: instance.getHandlers().captureAuthorizedPayment.bind(instance.getHandlers()),
      reauthorizePayment: instance.getHandlers().reauthorizePayment.bind(instance.getHandlers()),
      voidAuthorizedPayment: instance.getHandlers().voidAuthorizedPayment.bind(instance.getHandlers()),
      showCapturedPayment: instance.getHandlers().showCapturedPayment.bind(instance.getHandlers()),
      refundCapturedPayment: instance.getHandlers().refundCapturedPayment.bind(instance.getHandlers()),
      showRefundDetails: instance.getHandlers().showRefundDetails.bind(instance.getHandlers()),
    }),
    getToolDescriptions: () => ({
      createOrder: 'Create a new PayPal order',
      showOrderDetails: 'Get details of a PayPal order',
      authorizeOrder: 'Authorize a PayPal order',
      captureOrder: 'Capture a PayPal order',
      showAuthorizedPayment: 'Get details of an authorized payment',
      captureAuthorizedPayment: 'Capture an authorized payment',
      reauthorizePayment: 'Reauthorize a payment',
      voidAuthorizedPayment: 'Void an authorized payment',
      showCapturedPayment: 'Get details of a captured payment',
      refundCapturedPayment: 'Refund a captured payment',
      showRefundDetails: 'Get details of a refund',
    }),
  },

  firecrawl: {
    name: 'Firecrawl',
    envKeys: ['FIRECRAWL_API_KEY'],
    createInstance: (envVars) => {
      const apiKey = envVars.FIRECRAWL_API_KEY
      if (!apiKey) throw new Error('Firecrawl API key not found')
      return new FirecrawlTools(apiKey)
    },
    getTools: (instance: FirecrawlTools) => ({
      scrapeUrl: instance.getHandlers().scrapeUrl.bind(instance.getHandlers()),
      crawlUrl: instance.getHandlers().crawlUrl.bind(instance.getHandlers()),
      checkCrawlStatus: instance.getHandlers().checkCrawlStatus.bind(instance.getHandlers()),
      batchScrape: instance.getHandlers().batchScrape.bind(instance.getHandlers()),
      mapUrl: instance.getHandlers().mapUrl.bind(instance.getHandlers()),
      search: instance.getHandlers().search.bind(instance.getHandlers()),
    }),
    getToolDescriptions: () => ({
      scrapeUrl: 'Scrape content from a single URL',
      crawlUrl: 'Crawl a website and extract content from multiple pages',
      checkCrawlStatus: 'Check the status of a crawl job',
      batchScrape: 'Scrape multiple URLs in a batch',
      mapUrl: 'Get a map of all URLs on a website',
      search: 'Search for content across crawled websites',
    }),
  },
}
