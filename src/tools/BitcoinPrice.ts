import { Tool } from "@modelcontextprotocol/sdk/types.js";
import { CONSTANTS, getHeaders } from "../constants.js";
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
      const response = await fetch(CONSTANTS.BITCOIN_PRICE_URL, {
        headers: getHeaders(),
      });
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

export default BitcoinPriceTool;
