#!/usr/bin/env node

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import chalk from 'chalk'
import { generateFromOpenAPI } from './generator.js'

const argv = yargs(hideBin(process.argv))
  .command('generate [spec]', 'Generate Tooly package files from OpenAPI specification', (yargs) => {
    return yargs
      .positional('spec', {
        describe: 'Path to OpenAPI specification file (JSON or YAML)',
        type: 'string',
        default: 'openapi.json',
      })
      .option('output', {
        alias: 'o',
        describe: 'Output directory',
        type: 'string',
        default: 'src',
      })
      .option('package-name', {
        describe: 'Package name (used for class names and exports)',
        type: 'string',
      })
      .option('base-url', {
        describe: 'Base URL for the API (overrides spec)',
        type: 'string',
      })
      .option('auth-type', {
        describe: 'Authentication type',
        type: 'string',
        choices: ['apikey', 'bearer', 'basic', 'oauth2'],
        default: 'apikey',
      })
  })
  .option('verbose', {
    alias: 'v',
    describe: 'Verbose output',
    type: 'boolean',
    default: false,
  })
  .help()
  .alias('help', 'h')
  .parseSync()

async function main() {
  try {
    if (argv._.includes('generate')) {
      const spec = argv.spec as string
      const output = argv.output as string
      const packageName = argv['package-name'] as string | undefined
      const baseUrl = argv['base-url'] as string | undefined
      const authType = argv['auth-type'] as string
      const verbose = argv.verbose as boolean

      console.log(chalk.blue('🔧 Generating Tooly package from OpenAPI specification...'))

      if (verbose) {
        console.log(chalk.gray(`Spec file: ${spec}`))
        console.log(chalk.gray(`Output directory: ${output}`))
        console.log(chalk.gray(`Package name: ${packageName || 'auto-detected'}`))
        console.log(chalk.gray(`Auth type: ${authType}`))
      }

      await generateFromOpenAPI({
        specPath: spec,
        outputDir: output,
        packageName,
        baseUrl,
        authType,
        verbose,
      })

      console.log(chalk.green('✅ Generation complete!'))
    } else {
      console.log(chalk.yellow('Use "generate" command to generate files from OpenAPI spec'))
      console.log(chalk.gray('Example: npx @tooly/openapi generate openapi.json'))
    }
  } catch (error) {
    console.error(chalk.red('❌ Error:'), error instanceof Error ? error.message : String(error))
    process.exit(1)
  }
}

main().catch((error) => {
  console.error(chalk.red('❌ Unexpected error:'), error)
  process.exit(1)
})
