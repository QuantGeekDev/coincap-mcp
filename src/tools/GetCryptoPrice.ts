import { Tool } from "@modelcontextprotocol/sdk/types.js";
import { CONSTANTS } from "../constants.js";
import { z } from "zod";
import { CallToolRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { BaseToolImplementation } from "./BaseTool.js";

class GetCryptoPrice extends BaseToolImplementation {
  name = "get_crypto_price";
  toolDefinition: Tool = {
    name: this.name,
    description: "Get realtime crypto price on crypto",
    inputSchema: {
      type: "object",
      properties: {
        name: {
          type: "string",
          description: "Name of the crypto coin",
        },
      },
    },
  };

  async toolCall(request: z.infer<typeof CallToolRequestSchema>) {
    try {
      const cryptoName = request.params.arguments?.name;
      if (!cryptoName) {
        throw new Error("Missing crypto name");
      }
      
      // Ensure cryptoName is treated as a string
      const cryptoNameString = String(cryptoName);
      // Convert cryptocurrency name to lowercase to ensure API compatibility
      const cryptoNameLowercase = cryptoNameString.toLowerCase();
      const url = CONSTANTS.CRYPTO_PRICE_URL + cryptoNameLowercase;

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
  }
}

export default GetCryptoPrice;
