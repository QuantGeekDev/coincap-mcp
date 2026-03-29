import { Tool } from "@modelcontextprotocol/sdk/types.js";
import { CONSTANTS, getHeaders } from "../constants.js";
import { z } from "zod";
import { CallToolRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { BaseToolImplementation } from "./BaseTool.js";

class GetCryptoPrice extends BaseToolImplementation {
  name = "get_crypto_price";
  toolDefinition: Tool = {
    name: this.name,
    description: "Get realtime crypto price",
    inputSchema: {
      type: "object",
      properties: {
        name: {
          type: "string",
          description: "Name of the crypto coin (slug, e.g. bitcoin, ethereum)",
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
      const url = CONSTANTS.CRYPTO_PRICE_URL + cryptoName;

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
  }
}

export default GetCryptoPrice;
