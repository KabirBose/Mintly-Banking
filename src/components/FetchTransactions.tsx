"use client";

import { useAccessToken } from "@/context/AccessTokenContext";

export default function FetchTransactions() {
  const { accessToken } = useAccessToken();

  const fetchTransactions = async () => {
    if (!accessToken) {
      console.error("No transactions available");
      return;
    }

    try {
      const response = await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ access_token: accessToken }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch transactions");
      }

      const data = await response.json();
      console.log("Transactions:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return <button onClick={fetchTransactions}>Fetch Transactions</button>;
}
