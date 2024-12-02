"use client";

import { useState } from "react";
import { useAccessToken } from "@/context/AccessTokenContext";

export default function FetchIdentity() {
  const { accessToken } = useAccessToken();
  const [identity, setIdentity] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFetchIdentityData = async () => {
    if (!accessToken) {
      setError("Access token is required");
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
      setIdentity(data);
      setError(null); // Clear previous errors
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    }
  };

  return (
    <div>
      <button onClick={handleFetchIdentityData}>Get Identity Data</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {identity && (
        <div>
          <h3>User Identity:</h3>
          <pre>{JSON.stringify(identity, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
