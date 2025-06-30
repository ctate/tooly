#!/usr/bin/env node
import { Command } from 'commander'
import { config } from 'dotenv'
import { ToolyMCPServer } from './server.js'
import { INTEGRATIONS } from './integrations.js'

// Load environment variables
config()

const program = new Command()

program.name('tooly-mcp').description('Run Tooly integrations as an MCP server').version('0.0.1')

program
  .command('run')
  .description('Start the MCP server')
  .option('-n, --name <name>', 'Server name', 'Tooly MCP Server')
  .option('-v, --version <version>', 'Server version', '1.0.0')
  .option('-i, --integrations <integrations>', 'Comma-separated list of integrations to enable')
  .option('--list-integrations', 'List all available integrations')
  .action(async (options) => {
    if (options.listIntegrations) {
      console.log('\nAvailable integrations:')
      for (const [key, integration] of Object.entries(INTEGRATIONS)) {
        console.log(`  ${key}: ${integration.name}`)
        console.log(`    Required env vars: ${integration.envKeys.join(', ')}`)
      }
      console.log('')
      return
    }

    const enabledIntegrations = options.integrations
      ? options.integrations.split(',').map((s: string) => s.trim())
      : undefined

    const server = new ToolyMCPServer({
      name: options.name,
      version: options.version,
      enabledIntegrations,
    })

    await server.start()
  })

program
  .command('list-integrations')
  .description('List all available integrations and their requirements')
  .action(() => {
    console.log('\n📦 Available Tooly Integrations:\n')

    for (const [key, integration] of Object.entries(INTEGRATIONS)) {
      console.log(`🔧 ${integration.name} (${key})`)
      console.log(`   Environment variables: ${integration.envKeys.join(', ')}`)

      const tools = integration.getToolDescriptions()
      const toolNames = Object.keys(tools)
      console.log(`   Tools (${toolNames.length}): ${toolNames.join(', ')}`)
      console.log('')
    }

    console.log('💡 Usage:')
    console.log('  npx @tooly/mcp run                    # Run with all available integrations')
    console.log('  npx @tooly/mcp run -i github,linear   # Run with specific integrations')
    console.log('')
  })

// Handle unknown commands
program.on('command:*', () => {
  console.error('Invalid command: %s\nSee --help for a list of available commands.', program.args.join(' '))
  process.exit(1)
})

// Default to run command if no subcommand provided
if (process.argv.length === 2) {
  program.parse(['node', 'tooly-mcp', 'run'])
} else {
  program.parse()
}
