import { plaidClient } from "@/utils/plaidConfig";

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
    if (err instanceof Error) {
      console.error("Plaid error:", err.message);
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
