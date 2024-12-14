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
    <div className="min-h-[100vh]">
      <h3 className="text-center mb-3">transactions</h3>

      {account?.map((transaction: any) => (
        <div key={transaction.transaction_id} className="bg-tomato p-5">
          <div className="flex justify-between items-center w-full">
            <p className="font-bold">{transaction.name}</p>
            <p className="text-lg font-bold flex flex-col justify-center items-center">
              ${transaction.amount}
            </p>
          </div>
          <div className="flex gap-1">
            <p>{transaction.merchant_name}</p>
            <p>({transaction.website}) </p>
          </div>
          <p>{transaction.date}</p>
        </div>
      ))}
    </div>
  );
}
