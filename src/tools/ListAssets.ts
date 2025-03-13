import { Tool } from "@modelcontextprotocol/sdk/types.js";
import { CONSTANTS } from "../constants.js";
import { BaseToolImplementation } from "./BaseTool.js";

class ListAssetsTool extends BaseToolImplementation {
  name = "list_assets";
  toolDefinition: Tool = {
    name: this.name,
    description: "Get all available crypto assets",
    inputSchema: {
      type: "object",
    },
  };

  toolCall = async () => {
    try {
      const url = CONSTANTS.CRYPTO_PRICE_URL;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error fetching coincap data: ${response.status} ${response.statusText}`);
      }

      const body = await response.json();

      return {
        content: [{ type: "text", text: JSON.stringify(body.data) }],
      };
    } catch (error) {
      return {
        content: [
          { type: "error", text: JSON.stringify((error as any).message) },
        ],
      };
    }
  };
}

export default ListAssetsTool;
