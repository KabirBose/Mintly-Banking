"use client";

import { useAccessToken } from "@/context/AccessTokenContext";

export default function FetchRecurring() {
  const { accessToken } = useAccessToken();

  const fetchRecurringTransactions = async () => {
    if (!accessToken) {
      console.error("No recurring payments available");
      return;
    }

    try {
      const response = await fetch("/api/recurring", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ access_token: accessToken }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch recurring transactions");
      }

      const data = await response.json();
      console.log("Recurring Transactions:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <button onClick={fetchRecurringTransactions}>
      Fetch Recurring Transactions
    </button>
  );
}
