# @tooly/openapi

OpenAPI specification code generator for creating Tooly packages.

## Installation

```bash
npm install -g @tooly/openapi
```

## Usage

Create a new Tooly package from an OpenAPI specification:

1. Create a new package directory (e.g., `@tooly/twitter`)
2. Add your OpenAPI specification file (e.g., `openapi.json` or `openapi.yaml`)
3. Run the generator:

```bash
npx @tooly/openapi generate openapi.json
```

This will generate the following structure:

```
src/
├── tools/
│   ├── index.ts
│   └── [individual tool files].ts
├── handlers.ts
├── index.ts
└── types.ts
```

## Options

- `--output, -o`: Output directory (default: `src`)
- `--package-name`: Package name for class names and exports
- `--base-url`: Base URL for the API (overrides spec)
- `--auth-type`: Authentication type (`apikey`, `bearer`, `basic`, `oauth2`)
- `--verbose, -v`: Verbose output

## Example

```bash
npx @tooly/openapi generate twitter-api.json --package-name twitter --auth-type bearer --verbose
```

## Generated Package Structure

The generated code follows the same pattern as existing Tooly packages like `@tooly/firecrawl`:

- **types.ts**: Zod schemas and TypeScript types
- **handlers.ts**: Handler class with API methods
- **index.ts**: Main exports and AI SDK integration
- **tools/**: Individual tool definitions for each API operation

## Authentication

The generator supports different authentication types:

- `apikey`: API key in Authorization header
- `bearer`: Bearer token in Authorization header
- `basic`: Basic authentication
- `oauth2`: OAuth2 (requires additional setup)

## License

MIT
