"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function () {
  const [account, setAccount] = useState<any>(null);
  const { id } = useParams();

  const accessToken = localStorage.getItem("access_token")
    ? JSON.parse(localStorage.getItem("access_token") as string)
    : null;

  const fetchBalances = async () => {
    if (!accessToken) {
      console.error("No access token available");
      return;
    }

    try {
      const response = await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ access_token: accessToken }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch balances");
      }

      const data = await response.json();
      setAccount(
        data.transactions.filter((account: any) => account.account_id === id) ||
          null
      );
      console.log(
        data.transactions.filter((account: any) => account.account_id === id) ||
          null
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
      <p>Current ID: {id}</p>
      {account?.map((transaction: any) => (
        <p key={transaction.transaction_id}>{transaction.name}</p>
      ))}
    </div>
  );
}
