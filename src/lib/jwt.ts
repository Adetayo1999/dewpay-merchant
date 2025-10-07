// JWT payload interface based on the login response
interface JWTPayload {
  id: number;
  merchant_id: string;
  wallet_no: string | null;
  account_no: string | null;
  account_name: string | null;
  reference: string;
  bank: string | null;
  onedisk_id: string | null;
  full_name: string | null;
  email: string;
  onedisk_access_token: string | null;
  phone: string | null;
  iat: number;
}

/**
 * Decodes a JWT token and returns the payload
 * @param token - The JWT token to decode
 * @returns The decoded payload or null if invalid
 */
export const decodeJWT = (token: string): JWTPayload | null => {
  try {
    // Split the token into parts
    const parts = token.split(".");

    if (parts.length !== 3) {
      throw new Error("Invalid JWT format");
    }

    // Decode the payload (second part)
    const payload = parts[1];

    // Add padding if needed for base64 decoding
    const paddedPayload = payload + "=".repeat((4 - (payload.length % 4)) % 4);

    // Decode base64
    const decodedPayload = atob(paddedPayload);

    // Parse JSON
    return JSON.parse(decodedPayload);
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return null;
  }
};

/**
 * Extracts user information from a decoded JWT payload
 * @param payload - The decoded JWT payload
 * @returns User object with all JWT fields
 */
export const extractUserFromJWT = (payload: JWTPayload) => {
  return {
    id: payload.id?.toString() || "",
    email: payload.email || "",
    firstName: payload.full_name?.split(" ")[0] || "",
    lastName: payload.full_name?.split(" ").slice(1).join(" ") || "",
    role: "merchant",
    status: "active" as const,
    createdAt: new Date(payload.iat * 1000).toISOString(), // Convert Unix timestamp to ISO string
    merchant_id: payload.merchant_id || "",
    wallet_no: payload.wallet_no || null,
    account_no: payload.account_no || null,
    account_name: payload.account_name || null,
    reference: payload.reference || "",
    bank: payload.bank || null,
    onedisk_id: payload.onedisk_id || null,
    full_name: payload.full_name || null,
    onedisk_access_token: payload.onedisk_access_token || null,
    phone: payload.phone || null,
    iat: payload.iat || 0,
  };
};
