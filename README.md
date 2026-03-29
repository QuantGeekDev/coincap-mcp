# Coincap MCP

[![smithery badge](https://smithery.ai/badge/coincap-mcp)](https://smithery.ai/server/coincap-mcp)

## What does this server do?

Allows you to query crypto information from the CoinCap v3 API — real-time prices, market caps, and asset data for 1,000+ cryptocurrencies.

## 🚀 Quick Start

### 1. Get an API Key

CoinCap v3 requires authentication. Get a free key (50 credits) at [pro.coincap.io/dashboard](https://pro.coincap.io/dashboard).

### 2. Configure Claude Desktop

**MacOS**: `~/Library/Application\ Support/Claude/claude_desktop_config.json`  
**Windows**: `%APPDATA%/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "coincap-mcp": {
      "command": "npx",
      "args": ["coincap-mcp"],
      "env": {
        "COINCAP_API_KEY": "your-api-key-here"
      }
    }
  }
}
```

### Installing via Smithery

To install Coincap for Claude Desktop automatically via [Smithery](https://smithery.ai/server/coincap-mcp):

```bash
npx -y @smithery/cli install coincap-mcp --client claude
```

### Prerequisites

- Node.js 18+
- npx
- CoinCap API key (free tier available)

Then, launch Claude Desktop and you're ready to go!

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `COINCAP_API_KEY` | Yes | CoinCap v3 API key. Get one free at [pro.coincap.io](https://pro.coincap.io/dashboard) |

## Sample Prompts

- What is the price of bitcoin?
- What are the available crypto assets?
- What is the market cap of ethereum?

## Tools

#### Bitcoin Price Tool

Gets price for Bitcoin specifically, it's a simple example of a primitive API call tool

#### Get Crypto Price Tool

Gets price for any cryptocurrency available on CoinCap API. It's a good example of how to get mandatory parameter data for your tool calls

#### List Assets

Gets a list of all crypto assets available in the CoinCap API

## Development - local build

To build it locally:

On MacOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
On Windows: `%APPDATA%/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "coincap-mcp": {
      "command": "/path/to/coincap-mcp/build/index.js",
      "env": {
        "COINCAP_API_KEY": "your-api-key-here"
      }
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
