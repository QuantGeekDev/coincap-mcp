export const COINCAP_BASE_URL = "https://rest.coincap.io/v3";
export const CONSTANTS = {
  CRYPTO_PRICE_URL: `${COINCAP_BASE_URL}/assets/`,
  BITCOIN_PRICE_URL: `${COINCAP_BASE_URL}/assets/bitcoin`,
  LIST_ASSETS_URL: `${COINCAP_BASE_URL}/assets`,
  PROJECT_NAME: "coincap-mcp",
  PROJECT_VERSION: "1.0.0",
};

/**
 * Get the CoinCap API key from environment.
 * V3 requires authentication. Get a free key (50 credits) at:
 * https://pro.coincap.io/dashboard
 * Or create one programmatically via POST https://rest.coincap.io/v3/prepaid/create
 */
export function getApiKey(): string | undefined {
  return process.env.COINCAP_API_KEY;
}

/**
 * Build headers for CoinCap v3 API requests.
 */
export function getHeaders(): Record<string, string> {
  const key = getApiKey();
  const headers: Record<string, string> = {
    "Accept": "application/json",
  };
  if (key) {
    headers["Authorization"] = `Bearer ${key}`;
  }
  return headers;
}
