"use client";

export default function Recurring() {
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
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <button onClick={fetchRecurringTransactions}>
        Fetch Recurring Transactions
      </button>
    </div>
  );
}
