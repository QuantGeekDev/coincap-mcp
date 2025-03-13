import { Tool } from "@modelcontextprotocol/sdk/types.js";
import { BITCOIN_PRICE_URL } from "../constants.js";
import { BaseToolImplementation } from "./BaseTool.js";

class BitcoinPriceTool extends BaseToolImplementation {
  name = "bitcoin_price";
  toolDefinition: Tool = {
    name: this.name,
    description: "Get realtime bitcoin price",
    inputSchema: {
      type: "object",
    },
  };

  toolCall = async () => {
    try {
      const response = await fetch(BITCOIN_PRICE_URL);
      if (!response.ok) {
        throw new Error(`Error fetching coincap data: ${response.status} ${response.statusText}`);
      }

      const body = await response.json();

      return {
        content: [{ type: "text", text: `${JSON.stringify(body.data)}` }],
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

export default BitcoinPriceTool;
