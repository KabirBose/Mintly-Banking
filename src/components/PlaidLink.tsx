"use client";

import { useEffect, useState } from "react";
import { usePlaidLink } from "react-plaid-link";
import { useAccessToken } from "@/context/AccessTokenContext";
import { useRouter } from "next/navigation";

export default function PlaidLink() {
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const { setAccessToken } = useAccessToken();
  const router = useRouter();

  useEffect(() => {
    const fetchLinkToken = async () => {
      const response = await fetch("/api/link-token", {
        method: "POST",
      });
      const data = await response.json();
      setLinkToken(data.link_token);
    };

    fetchLinkToken();
  }, []);

  const onSuccess = async (public_token: string) => {
    const response = await fetch("/api/plaid", {
      method: "POST",
      body: JSON.stringify({ public_token }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    setAccessToken(data.access_token);
    router.replace("/dashboard");
  };

  const { open, ready } = usePlaidLink({
    token: linkToken || "",
    onSuccess,
  });

  return (
    <div>
      <button onClick={() => open()} disabled={!ready}>
        Get Started
      </button>
    </div>
  );
}
