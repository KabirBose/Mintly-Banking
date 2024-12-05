"use client";

import { useEffect, useState } from "react";

export default function Balances() {
  const [balances, setBalances] = useState<any>(null);

  const accessToken = localStorage.getItem("access_token")
    ? JSON.parse(localStorage.getItem("access_token") as string)
    : null;

  const fetchBalances = async () => {
    if (!accessToken) {
      console.error("No access token available");
      return;
    }

    try {
      const response = await fetch("/api/balance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ access_token: accessToken }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch balances");
      }

      const data = await response.json();
      console.log(data);
      setBalances(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchBalances();
  }, []);

  return (
    <div>
      <h3 className="text-center mb-5">Account Balances</h3>

      {balances && (
        <div className="flex flex-col justify-center items-center gap-5 bg-gray-900 p-5 rounded-md w-[100%]">
          {balances.accounts.map((account: any, i: number) => (
            <div
              key={account.account_id}
              className="w-full bg-gray-800 p-5 rounded-md"
            >
              <p>
                {account.name} ({account.mask})
              </p>
              <p>
                ${account.balances.available}{" "}
                {account.balances.iso_currency_code}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
