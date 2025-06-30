# @tooly/mcp

## 0.0.2

### Patch Changes

- adds vercel, stripe, openapi generator, mcp server
- Updated dependencies
  - @tooly/core@0.0.7
  - @tooly/firecrawl@0.0.3
  - @tooly/github@0.0.4
  - @tooly/jira@0.0.2
  - @tooly/linear@0.0.7
  - @tooly/notion@0.0.4
  - @tooly/paypal@0.0.2
  - @tooly/resend@0.0.7
  - @tooly/stripe@0.0.2
  - @tooly/supabase@0.0.4
  - @tooly/twilio@0.0.7
  - @tooly/vercel@0.0.2

## 0.0.1

### Added

- Initial release of MCP server for Tooly integrations
- Support for 11 integrations: GitHub, Linear, Notion, Stripe, Supabase, Resend, Twilio, Vercel, Jira, PayPal, Firecrawl
- CLI interface with `run` and `list-integrations` commands
- Automatic integration detection based on environment variables
- Tool prefixing to prevent naming conflicts
- Comprehensive error handling and logging
- Compatible with Claude Desktop, Cursor, and other MCP clients
