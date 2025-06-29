import fs from 'fs-extra'
import path from 'path'
const SwaggerParser = require('swagger-parser')
import Handlebars from 'handlebars'
import chalk from 'chalk'
import pluralize from 'pluralize'
// Define basic OpenAPI types
interface OpenAPIDocument {
  openapi: string
  info: {
    title: string
    version: string
  }
  servers?: Array<{ url: string }>
  paths?: Record<string, any>
}

interface OperationObject {
  operationId?: string
  summary?: string
  description?: string
  parameters?: any[]
  requestBody?: any
  responses?: any
  tags?: string[]
}

export interface GenerateOptions {
  specPath: string
  outputDir: string
  packageName?: string
  baseUrl?: string
  authType: string
  verbose?: boolean
}

export interface OperationInfo {
  operationId: string
  method: string
  path: string
  summary?: string
  description?: string
  parameters: ParameterInfo[]
  requestBody?: RequestBodyInfo
  responses: ResponseInfo[]
  tags: string[]
}

export interface ParameterInfo {
  name: string
  originalName?: string // Keep original name for URL building
  in: 'query' | 'path' | 'header' | 'cookie'
  required: boolean
  schema: any
  description?: string
}

export interface RequestBodyInfo {
  required: boolean
  content: Record<string, any>
  description?: string
}

export interface ResponseInfo {
  statusCode: string
  description?: string
  content?: Record<string, any>
}

export async function generateFromOpenAPI(options: GenerateOptions): Promise<void> {
  const { specPath, outputDir, packageName, baseUrl, authType, verbose } = options

  // Parse OpenAPI specification - dereference to resolve $ref objects
  const api = (await SwaggerParser.dereference(specPath)) as OpenAPIDocument

  if (verbose) {
    console.log(chalk.gray(`API Title: ${api.info.title}`))
    console.log(chalk.gray(`API Version: ${api.info.version}`))
  }

  // Extract package name from API title if not provided
  const finalPackageName = packageName || generatePackageName(api.info.title)

  // Extract base URL
  const finalBaseUrl = baseUrl || extractBaseUrl(api)

  // Parse operations
  const operations = parseOperations(api)

  if (verbose) {
    console.log(chalk.gray(`Found ${operations.length} operations`))
  }

  // Ensure output directory exists
  await fs.ensureDir(outputDir)
  await fs.ensureDir(path.join(outputDir, 'tools'))

  // Generate files
  await generateTypes(outputDir, api, operations, finalPackageName)
  await generateHandlers(outputDir, api, operations, finalPackageName, finalBaseUrl, authType)
  await generateIndex(outputDir, operations, finalPackageName)
  await generateToolsIndex(outputDir, operations)
  await generateIndividualTools(outputDir, operations)
  await generateExample(outputDir, operations, finalPackageName)
  const createdPackageFiles = await generatePackageFiles(outputDir, api, operations, finalPackageName)

  if (verbose) {
    console.log(chalk.gray('Generated files:'))

    // Show which package files were created (only if they didn't exist)
    if (createdPackageFiles.length > 0) {
      for (const file of createdPackageFiles) {
        console.log(chalk.gray(`  - ${file}`))
      }
    }

    // Always show src files (they are always created/overwritten)
    console.log(chalk.gray('  - src/types.ts'))
    console.log(chalk.gray('  - src/handlers.ts'))
    console.log(chalk.gray('  - src/index.ts'))
    console.log(chalk.gray('  - src/tools/index.ts'))
    console.log(chalk.gray('  - src/example.ts'))
    console.log(chalk.gray(`  - ${operations.length} tool files`))

    // Show which package files were skipped
    const allPackageFiles = ['package.json', 'README.md', 'tsconfig.json', 'LICENSE']
    const skippedFiles = allPackageFiles.filter((file) => !createdPackageFiles.includes(file))
    if (skippedFiles.length > 0) {
      console.log(chalk.gray('Skipped existing files:'))
      for (const file of skippedFiles) {
        console.log(chalk.gray(`  - ${file} (already exists)`))
      }
    }
  }
}

function generatePackageName(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

function extractBaseUrl(api: OpenAPIDocument): string {
  if (api.servers && api.servers.length > 0) {
    return api.servers[0].url
  }
  return 'https://api.example.com'
}

function parseOperations(api: OpenAPIDocument): OperationInfo[] {
  const operations: OperationInfo[] = []

  if (!api.paths) return operations

  for (const [pathStr, pathItem] of Object.entries(api.paths)) {
    if (!pathItem) continue

    const methods = ['get', 'post', 'put', 'patch', 'delete', 'head', 'options'] as const

    for (const method of methods) {
      const operation = (pathItem as any)[method] as OperationObject | undefined
      if (!operation) continue

      const operationId = operation.operationId || generateOperationId(method, pathStr)

      operations.push({
        operationId,
        method: method.toUpperCase(),
        path: pathStr,
        summary: operation.summary,
        description: operation.description,
        parameters: parseParameters(operation.parameters),
        requestBody: parseRequestBody(operation.requestBody),
        responses: parseResponses(operation.responses),
        tags: operation.tags || [],
      })
    }
  }

  return operations
}

function generateOperationId(method: string, path: string): string {
  const pathParts = path.split('/').filter((part) => part && !part.startsWith('{'))
  const resource = pathParts[pathParts.length - 1] || 'resource'
  const action = method.toLowerCase()

  if (action === 'get' && path.includes('{')) {
    return `get${capitalize(singularize(resource))}`
  }
  if (action === 'get') {
    return `list${capitalize(pluralize(resource))}`
  }
  if (action === 'post') {
    return `create${capitalize(singularize(resource))}`
  }
  if (action === 'put' || action === 'patch') {
    return `update${capitalize(singularize(resource))}`
  }
  if (action === 'delete') {
    return `delete${capitalize(singularize(resource))}`
  }

  return `${action}${capitalize(singularize(resource))}`
}

function parseParameters(parameters?: any[]): ParameterInfo[] {
  if (!parameters) return []

  return parameters
    .filter((param) => {
      // Skip reference objects that we can't resolve
      if ('$ref' in param) {
        console.warn(`Skipping unresolved parameter reference: ${param.$ref}`)
        return false
      }
      // Skip parameters without names
      if (!param.name) {
        console.warn('Skipping parameter without name:', param)
        return false
      }
      return true
    })
    .map((param) => {
      return {
        name: sanitizeParameterName(param.name),
        originalName: param.name, // Keep original for URL building
        in: param.in || 'query',
        required: param.required || false,
        schema: param.schema || { type: 'string' },
        description: sanitizeDescription(param.description),
      }
    })
}

function sanitizeParameterName(name: string): string {
  // Replace invalid JavaScript identifier characters
  return name.replace(/[\[\]]/g, '_').replace(/[^a-zA-Z0-9_$]/g, '_')
}

function sanitizeDescription(description?: string): string | undefined {
  if (!description) return undefined

  // Replace newlines and escape quotes
  return description
    .replace(/\n/g, ' ')
    .replace(/\r/g, ' ')
    .replace(/'/g, "\\'")
    .replace(/"/g, '\\"')
    .replace(/\s+/g, ' ')
    .trim()
}

function parseRequestBody(requestBody?: any): RequestBodyInfo | undefined {
  if (!requestBody) return undefined

  if ('$ref' in requestBody) {
    // Handle reference objects - simplified for now
    return {
      required: false,
      content: {},
    }
  }

  return {
    required: requestBody.required || false,
    content: requestBody.content,
    description: requestBody.description,
  }
}

function parseResponses(responses?: any): ResponseInfo[] {
  if (!responses) return []

  return Object.entries(responses).map(([statusCode, response]) => {
    if (typeof response === 'object' && response && '$ref' in response) {
      // Handle reference objects - simplified for now
      return {
        statusCode,
        description: 'Referenced response',
      }
    }

    const responseObj = response as any
    return {
      statusCode,
      description: responseObj.description,
      content: responseObj.content,
    }
  })
}

async function generateTypes(
  outputDir: string,
  api: OpenAPIDocument,
  operations: OperationInfo[],
  packageName: string,
): Promise<void> {
  const template = await getTemplate('types.hbs')
  const content = template({
    api,
    operations,
    packageName,
    capitalizedPackageName: capitalize(packageName),
  })

  await fs.writeFile(path.join(outputDir, 'types.ts'), content)
}

async function generateHandlers(
  outputDir: string,
  api: OpenAPIDocument,
  operations: OperationInfo[],
  packageName: string,
  baseUrl: string,
  authType: string,
): Promise<void> {
  const template = await getTemplate('handlers.hbs')
  const content = template({
    api,
    operations,
    packageName,
    capitalizedPackageName: capitalize(packageName),
    baseUrl,
    authType,
  })

  await fs.writeFile(path.join(outputDir, 'handlers.ts'), content)
}

async function generateIndex(outputDir: string, operations: OperationInfo[], packageName: string): Promise<void> {
  const template = await getTemplate('index.hbs')
  const content = template({
    operations,
    packageName,
    capitalizedPackageName: capitalize(packageName),
  })

  await fs.writeFile(path.join(outputDir, 'index.ts'), content)
}

async function generateToolsIndex(outputDir: string, operations: OperationInfo[]): Promise<void> {
  const template = await getTemplate('tools-index.hbs')
  const content = template({
    operations,
  })

  await fs.writeFile(path.join(outputDir, 'tools', 'index.ts'), content)
}

async function generateIndividualTools(outputDir: string, operations: OperationInfo[]): Promise<void> {
  const template = await getTemplate('tool.hbs')

  for (const operation of operations) {
    const content = template({
      operation,
      fileName: camelToKebab(operation.operationId),
    })

    const fileName = `${camelToKebab(operation.operationId)}.ts`
    await fs.writeFile(path.join(outputDir, 'tools', fileName), content)
  }
}

async function generateExample(outputDir: string, operations: OperationInfo[], packageName: string): Promise<void> {
  const template = await getTemplate('example.hbs')

  // Pick the first operation as an example, or one with required parameters
  const exampleOperation = operations.find((op) => op.parameters.some((p) => p.required)) || operations[0]

  const content = template({
    operations,
    packageName,
    exampleOperation,
  })

  await fs.writeFile(path.join(outputDir, 'example.ts'), content)
}

async function generatePackageFiles(
  outputDir: string,
  api: OpenAPIDocument,
  operations: OperationInfo[],
  packageName: string,
): Promise<string[]> {
  const createdFiles: string[] = []
  const exampleOperation = operations.find((op) => op.parameters.some((p) => p.required)) || operations[0]

  // Generate package.json (only if it doesn't exist)
  const packageJsonPath = path.join(outputDir, 'package.json')
  if (!(await fs.pathExists(packageJsonPath))) {
    const packageTemplate = await getTemplate('package.hbs')
    const packageContent = packageTemplate({
      api,
      operations,
      packageName,
    })
    await fs.writeFile(packageJsonPath, packageContent)
    createdFiles.push('package.json')
  }

  // Generate README.md (only if it doesn't exist)
  const readmePath = path.join(outputDir, 'README.md')
  if (!(await fs.pathExists(readmePath))) {
    const readmeTemplate = await getTemplate('readme.hbs')
    const readmeContent = readmeTemplate({
      api,
      operations,
      packageName,
      exampleOperation,
    })
    await fs.writeFile(readmePath, readmeContent)
    createdFiles.push('README.md')
  }

  // Generate tsconfig.json (only if it doesn't exist)
  const tsconfigPath = path.join(outputDir, 'tsconfig.json')
  if (!(await fs.pathExists(tsconfigPath))) {
    const tsconfigTemplate = await getTemplate('tsconfig.hbs')
    const tsconfigContent = tsconfigTemplate({})
    await fs.writeFile(tsconfigPath, tsconfigContent)
    createdFiles.push('tsconfig.json')
  }

  // Generate LICENSE (only if it doesn't exist)
  const licensePath = path.join(outputDir, 'LICENSE')
  if (!(await fs.pathExists(licensePath))) {
    const licenseTemplate = await getTemplate('license.hbs')
    const licenseContent = licenseTemplate({
      api,
      currentYear: new Date().getFullYear(),
    })
    await fs.writeFile(licensePath, licenseContent)
    createdFiles.push('LICENSE')
  }

  return createdFiles
}

async function getTemplate(templateName: string): Promise<HandlebarsTemplateDelegate> {
  const templatePath = path.join(__dirname, '..', 'templates', templateName)
  const templateContent = await fs.readFile(templatePath, 'utf-8')
  return Handlebars.compile(templateContent)
}

// Helper functions
function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function singularize(str: string): string {
  return pluralize.singular(str)
}

function camelToKebab(str: string): string {
  return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase()
}

function camelCase(str: string): string {
  return str.replace(/[-_](.)/g, (_, char) => char.toUpperCase())
}

function pascalCase(str: string): string {
  const camelCased = camelCase(str)
  return camelCased.charAt(0).toUpperCase() + camelCased.slice(1)
}

// Register Handlebars helpers
Handlebars.registerHelper('capitalize', capitalize)
Handlebars.registerHelper('camelToKebab', camelToKebab)
Handlebars.registerHelper('camelCase', camelCase)
Handlebars.registerHelper('pascalCase', pascalCase)
Handlebars.registerHelper('singularize', singularize)
Handlebars.registerHelper('upper', (str: string) => str.toUpperCase())
Handlebars.registerHelper('json', (context) => JSON.stringify(context, null, 2))
Handlebars.registerHelper('eq', (a, b) => a === b)
Handlebars.registerHelper('paramName', (param) => param.originalName || param.name)
