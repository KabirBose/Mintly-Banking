"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Transactions from "@/components/UI/Transactions";

export default function () {
  const [transactions, setTransactions] = useState<any>(null);
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
        data.accounts.find((account: any) => account.account_id === id) || null
      );
      setTransactions(
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
      <div className="min-h-[30vh] flex flex-col justify-center items-center">
        <div className="bg-skyblue p-5 rounded-md w-3/4">
          <h3 className="text-center">
            {account?.name} ({account?.mask})
          </h3>
          <h4 className="text-center">{account?.official_name}</h4>
        </div>

        <h4 className="mt-5">Balance: ${account?.balances.available}</h4>
        <h4>
          Spent: $
          {transactions
            ?.reduce(
              (val: any, transaction: any) => val + transaction.amount,
              0
            )
            .toFixed(2)}
        </h4>
      </div>

      <Transactions transactions={transactions} />
    </div>
  );
}
