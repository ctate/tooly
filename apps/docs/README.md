# Tooly Documentation

This is the documentation site for Tooly - AI-powered tool packages for modern applications. Built with Next.js and [Fumadocs](https://fumadocs.dev).

## Getting Started

Run the development server:

```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

Open http://localhost:3000 with your browser to see the documentation site.

## Documentation Structure

The documentation includes:

- **Introduction**: Overview of Tooly and its features
- **Getting Started**: Quick setup guide for new users
- **Packages**: Detailed documentation for each package
  - `@tooly/core`: Base abstractions and utilities
  - `@tooly/resend`: Email tools powered by Resend API
  - `@tooly/linear`: Project management tools powered by Linear API
- **Examples**: Real-world usage examples and patterns

## Content Structure

| Path                      | Description                              |
| ------------------------- | ---------------------------------------- |
| `content/docs/`           | Main documentation content in MDX format |
| `content/docs/packages/`  | Package-specific documentation           |
| `app/(home)`              | Landing page showcasing Tooly features   |
| `app/docs`                | Documentation layout and routing         |
| `app/api/search/route.ts` | Search functionality for documentation   |

## File Organization

- `lib/source.ts`: Content source adapter configuration
- `app/layout.config.tsx`: Shared layout options and navigation
- `content/docs/`: All documentation content
- `source.config.ts`: MDX configuration and frontmatter schema

## Contributing

To contribute to the documentation:

1. Edit MDX files in `content/docs/`
2. Add new package documentation in `content/docs/packages/`
3. Update examples in `content/docs/examples.mdx`
4. Test changes with `npm run dev`

## Learn More

- [Tooly Packages](https://github.com/ctate/tool) - Source code and packages
- [Fumadocs](https://fumadocs.dev) - Documentation framework
- [Next.js Documentation](https://nextjs.org/docs) - Web framework documentation
