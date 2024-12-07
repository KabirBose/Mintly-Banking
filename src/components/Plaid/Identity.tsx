"use client";

import { useEffect, useState } from "react";

export default function Identity() {
  const [identity, setIdentity] = useState<any>(null);

  const accessToken = localStorage.getItem("access_token")
    ? JSON.parse(localStorage.getItem("access_token") as string)
    : null;

  const fetchIdentity = async () => {
    if (!accessToken) {
      console.error("No access token available");
      return;
    }

    try {
      const response = await fetch("/api/identity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ access_token: accessToken }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch identity data");
      }

      const data = await response.json();
      console.log("Identity", data);
      setIdentity(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchIdentity();
  }, []);

  return (
    <div>
      <h3 className="text-center mb-2">Identity</h3>

      {identity && (
        <div>
          <div className="flex flex-col justify-center items-center gap-5 bg-gray-900 p-5 rounded-md w-full">
            {identity.accounts.map((account: any) => (
              <div key={account.account_id}>
                <p>{account.owners[0].names}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
