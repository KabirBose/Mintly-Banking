import { Configuration, PlaidApi, PlaidEnvironments } from "plaid";

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

    const response = await plaidClient.accountsBalanceGet({ access_token });

    return new Response(JSON.stringify(response.data), { status: 200 });
  } catch (err) {
    // Narrowing the type of 'err'
    if (err instanceof Error) {
      console.error("Plaid error:", err.message); // Access 'message' safely
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
      });
    } else {
      console.error("Unknown error:", err);
      return new Response(
        JSON.stringify({ error: "An unknown error occurred" }),
        { status: 500 }
      );
    }
  }
}
