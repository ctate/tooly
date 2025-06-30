# @tooly/mcp

🔌 **Universal MCP Server for Tooly Integrations**

Connect any Tooly integration to AI applications that support the Model Context Protocol (MCP).

## Quick Start

```bash
# Run with all available integrations
npx @tooly/mcp@latest run

# List available integrations
npx @tooly/mcp@latest list-integrations
```

## Configuration

### Claude Desktop (`claude_desktop_config.json`)

```json
{
  "mcpServers": {
    "tooly": {
      "command": "npx",
      "args": ["@tooly/mcp@latest", "run", "-i", "github,linear"],
      "env": {
        "GITHUB_TOKEN": "your_github_token",
        "LINEAR_API_KEY": "your_linear_api_key"
      }
    }
  }
}
```

## Supported Integrations

| Integration   | Environment Variables                       |
| ------------- | ------------------------------------------- |
| **GitHub**    | `GITHUB_TOKEN`                              |
| **Linear**    | `LINEAR_API_KEY`                            |
| **Notion**    | `NOTION_API_KEY`                            |
| **Stripe**    | `STRIPE_SECRET_KEY`                         |
| **Supabase**  | `SUPABASE_URL`, `SUPABASE_ANON_KEY`         |
| **Resend**    | `RESEND_API_KEY`                            |
| **Twilio**    | `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`   |
| **Vercel**    | `VERCEL_TOKEN`                              |
| **Jira**      | `JIRA_HOST`, `JIRA_EMAIL`, `JIRA_API_TOKEN` |
| **PayPal**    | `PAYPAL_CLIENT_ID`, `PAYPAL_CLIENT_SECRET`  |
| **Firecrawl** | `FIRECRAWL_API_KEY`                         |

## Tool Naming

Tools are prefixed with their integration name:

- `github_createIssue`
- `linear_searchIssues`
- `notion_createPage`

## CLI Commands

```bash
# Start server
npx @tooly/mcp run

# With specific integrations
npx @tooly/mcp run --integrations github,linear

# List all integrations
npx @tooly/mcp list-integrations
```

## License

MIT License
