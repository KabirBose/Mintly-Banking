"use client";

import { useAccessToken } from "@/context/AccessTokenContext";

export default function FetchBalance() {
  const { accessToken } = useAccessToken();

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
      console.log("Account Balances:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return <button onClick={fetchBalances}>Fetch Account Balances</button>;
}
