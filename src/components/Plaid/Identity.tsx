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
      const response = await fetch("/api/account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ access_token: accessToken }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch identity data");
      }

      const data = await response.json();
      setIdentity(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchIdentity();
  }, []);

  return (
    <div className="text-center">
      {identity && <h3>Welcome, {identity.accounts[0].owners[0].names}!</h3>}
    </div>
  );
}
