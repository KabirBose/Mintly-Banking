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
    </div>
  );
}
