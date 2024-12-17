# Coincap MCP

## What does this server do?

Allows you to query crypto information from coincap's public API - no API keys or registration required

<a href="https://glama.ai/mcp/servers/sg1ysa9nrk"><img width="380" height="200" src="https://glama.ai/mcp/servers/sg1ysa9nrk/badge" alt="coincap-mcp MCP server" /></a>

## 🚀 Quick Start

To get started, add this configuration to your Claude Desktop config file:

**MacOS**: `~/Library/Application\ Support/Claude/claude_desktop_config.json`  
**Windows**: `%APPDATA%/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "mongodb": {
      "command": "npx",
      "args": ["coincap-mcp"]
    }
  }
}
```

### Prerequisites

- Node.js 18+
- npx

Then, launch Claude Desktop and you're ready to go!

## Sample Prompts

- What is the price of bitcoin?
- What are the available crypto assets?
- What is the market cap of ethereum?

## Tools

#### Bitcoin Price Tool

Gets price for Bitcoin specifically, it's a simple example of a primitive API call tool

#### Get Crypto Price Tool

Gets price for any cryptocurrency available on coincap API. It's a good example of how to get mandatory parameter data for your tool calls

#### List Assets

Gets a list of all crypto assets available in coincap API

## Development - local build

To build it locally:

On MacOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
On Windows: `%APPDATA%/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "coincap-mcp": {
      "command": "/path/to/coincap-mcp/build/index.js"
    }
  }
}
```

## Development

Install dependencies:

```bash
npm install
```

Build the server:

```bash
npm run build
```

For development with auto-rebuild:

```bash
npm run watch
```

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
