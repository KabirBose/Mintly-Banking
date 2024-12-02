import { Products, CountryCode } from "plaid";

import { plaidClient } from "@/utils/plaidConfig";

export async function POST() {
  try {
    const response = await plaidClient.linkTokenCreate({
      user: {
        client_user_id: "kabirbose",
      },
      client_name: "Mintly Finance",
      products: [Products.Auth, Products.Transactions],
      country_codes: [CountryCode.Us, CountryCode.Ca],
      language: "en",
    });

    return new Response(
      JSON.stringify({ link_token: response.data.link_token }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Plaid error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to create link token" }),
      {
        status: 500,
      }
    );
  }
}
