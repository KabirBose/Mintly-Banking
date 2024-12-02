import { Configuration, PlaidApi, PlaidEnvironments } from "plaid";

// Initialize the Plaid client
const config = new Configuration({
  basePath: PlaidEnvironments[process.env.PLAID_ENV || "sandbox"],
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": process.env.PLAID_CLIENT_ID as string,
      "PLAID-SECRET": process.env.PLAID_SECRET as string,
    },
  },
});

const plaidClient = new PlaidApi(config);

export async function POST(req: Request) {
  try {
    const { access_token } = await req.json();

    if (!access_token) {
      return new Response(
        JSON.stringify({ error: "Access token is required" }),
        { status: 400 }
      );
    }

    // Fetch identity data
    const response = await plaidClient.identityGet({
      access_token,
    });

    return new Response(JSON.stringify(response.data), { status: 200 });
  } catch (err) {
    console.error("Plaid error:", err);
    return new Response(
      JSON.stringify({
        error: err instanceof Error ? err.message : "An unknown error occurred",
      }),
      { status: 500 }
    );
  }
}
