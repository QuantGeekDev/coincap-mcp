import { Tool } from "@modelcontextprotocol/sdk/types.js";
import { CONSTANTS, getHeaders } from "../constants.js";
import { BaseToolImplementation } from "./BaseTool.js";

class ListAssetsTool extends BaseToolImplementation {
  name = "list_assets";
  toolDefinition: Tool = {
    name: this.name,
    description: "Get all available crypto assets with market data",
    inputSchema: {
      type: "object",
      properties: {
        limit: {
          type: "number",
          description: "Number of assets to return (default: 100)",
        },
      },
    },
  };

  toolCall = async (request?: any) => {
    try {
      const limit = request?.params?.arguments?.limit || 100;
      const url = `${CONSTANTS.LIST_ASSETS_URL}?limit=${limit}`;

      const response = await fetch(url, { headers: getHeaders() });
      if (response.status === 401 || response.status === 403) {
        return {
          content: [
            {
              type: "text",
              text: "Authentication required. Set COINCAP_API_KEY environment variable. Get a free key at https://pro.coincap.io/dashboard",
            },
          ],
        };
      }
      if (!response.ok) {
        throw new Error(`CoinCap API error: ${response.status} ${response.statusText}`);
      }

      const body = await response.json();

      return {
        content: [{ type: "text", text: JSON.stringify(body.data) }],
      };
    } catch (error) {
      return {
        content: [
          { type: "text", text: `Error: ${(error as any).message}` },
        ],
      };
    }
  };
}

export default ListAssetsTool;
