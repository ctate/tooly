# Changelog

## 0.0.2

### Patch Changes

- adds supabase, notion, github, twilio
- Updated dependencies
  - @tooly/core@0.0.5

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.0.1] - 2024-12-19

### Added

- Initial release of @tooly/github package
- Support for GitHub Issues API
- Support for GitHub Repositories API
- Support for GitHub Users API
- AI SDK integration with `createAITools`
- OpenAI function calling with `createOpenAIFunctions`
- Anthropic tools integration with `createAnthropicTools`
- Direct usage through `GitHubTools` class

### Tools

- `createIssue` - Create new issues
- `getIssue` - Get issue details
- `updateIssue` - Update existing issues
- `searchIssues` - Search for issues
- `getRepository` - Get repository details
- `getUser` - Get user details
