"use client";

import { useEffect, useState } from "react";

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
      console.log("Recurring Transactions:", data);
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
        <div
          key={transaction.transaction_ids[0]}
          className="bg-tomato p-5 border-peach border-4 rounded-lg mb-2"
        >
          <div className="flex justify-between items-center w-full">
            <p className="font-bold">{transaction.description}</p>
            <p className="text-lg font-bold flex flex-col justify-center items-center">
              ${transaction.average_amount.amount}
            </p>
          </div>
          <div className="flex gap-1">
            <p>
              {transaction.merchant_name} - {transaction.predicted_next_date}
            </p>
          </div>
          <p>{transaction.date}</p>
        </div>
      ))}
    </div>
  );
}
