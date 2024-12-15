"use client";

import { useEffect, useState } from "react";
import Balance from "../UI/Balance";

export default function Balances() {
  const [balances, setBalances] = useState<any>(null);
  const [total, setTotal] = useState<any>(0);
  const [accounts, setAccounts] = useState<any>(null);

  const accessToken = localStorage.getItem("access_token")
    ? JSON.parse(localStorage.getItem("access_token") as string)
    : null;

  const fetchBalances = async () => {
    if (!accessToken) {
      console.error("No access token available");
      return;
    }

    try {
      const response = await fetch("/api/account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ access_token: accessToken }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch balances");
      }

      const data = await response.json();

      setBalances(data);
      setAccounts(data.accounts.length);
      setTotal(
        data?.accounts
          .reduce(
            (val: any, transaction: any) =>
              val + transaction.balances.available,
            0
          )
          .toFixed(2)
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchBalances();
  }, []);

  return (
    <div>
      <h3 className="text-center mb-3">My Accounts</h3>
      {balances && (
        <div className="flex flex-col justify-center items-center gap-5 bg-peach p-5 rounded-md w-full">
          {balances.accounts.map((account: any) => (
            <Balance
              key={account.account_id}
              account={account.name}
              mask={account.mask}
              amount={account.balances.available}
              currency={account.balances.iso_currency_code}
              accountID={account.account_id}
            />
          ))}
        </div>
      )}
      <h4 className="text-center mt-5">Total: ${total}</h4>
      <h4 className="text-center">Accounts: {accounts}</h4>
    </div>
  );
}
