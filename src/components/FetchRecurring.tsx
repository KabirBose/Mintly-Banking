"use client";

import { useState } from "react";
import { useAccessToken } from "@/context/AccessTokenContext";

export default function FetchRecurring() {
  const { accessToken } = useAccessToken();
  const [transactions, setTransactions] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFetchRecurringTransactions = async () => {
    if (!accessToken) {
      setError("Access token is required");
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
      setTransactions(data.streams || []);
      setError(null); // Clear previous errors
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    }
  };

  return (
    <div>
      <button onClick={handleFetchRecurringTransactions}>
        Get Recurring Transactions
      </button>

      {transactions && (
        <div>
          <h3>Recurring Transactions:</h3>
          <ul>
            {transactions.map((transaction: any, index: number) => (
              <li key={index}>
                <strong>{transaction.name}</strong> - {transaction.frequency} -
                ${transaction.amount}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
