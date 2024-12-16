"use client";

import { useEffect, useState } from "react";
import RecurringTr from "../UI/RecurringTr";

export default function Recurring() {
  const [recurring, setRecurring] = useState<any>(null);

  const accessToken = localStorage.getItem("access_token")
    ? JSON.parse(localStorage.getItem("access_token") as string)
    : null;

  const fetchRecurringTransactions = async () => {
    if (!accessToken) {
      console.error("No access token available");
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
      console.log(data);
      setRecurring(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchRecurringTransactions();
  }, []);

  return (
    <div>
      <h3 className="text-center mb-2">Recurring</h3>

      {recurring?.inflow_streams.map((transaction: any) => (
        <RecurringTr
          transaction={transaction}
          key={transaction.transaction_ids[0]}
        />
      ))}
      {recurring?.outflow_streams.map((transaction: any) => (
        <RecurringTr
          transaction={transaction}
          key={transaction.transaction_ids[0]}
        />
      ))}
    </div>
  );
}
