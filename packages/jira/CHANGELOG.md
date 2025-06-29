# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.0.1] - 2024-12-19

### Added

- Initial release of @tooly/jira package
- Support for JIRA Cloud and Server/Data Center
- Create, read, update, and search JIRA issues
- Get JIRA projects and user information
- Compatible with OpenAI function calling, Anthropic tool use, and AI SDK
- Full TypeScript support with comprehensive type definitions

### Tools

- `createIssue` - Create a new issue in JIRA
- `getIssue` - Get issue details by key
- `updateIssue` - Update an existing issue
- `searchIssues` - Search for issues using JQL or filters
- `getProjects` - Get all accessible JIRA projects
- `getUser` - Get user details (current user if no ID provided)
