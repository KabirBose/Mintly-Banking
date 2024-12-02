"use client";

import { useAccessToken } from "@/context/AccessTokenContext";

export default function FetchIdentity() {
  const { accessToken } = useAccessToken();

  const fetchIdentityData = async () => {
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
      console.log("Identity Data:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return <button onClick={fetchIdentityData}>Fetch Identity Data</button>;
}
