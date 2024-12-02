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
