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

export const plaidClient = new PlaidApi(config);
