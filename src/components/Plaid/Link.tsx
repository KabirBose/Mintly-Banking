"use client";

import { useEffect, useState } from "react";
import { usePlaidLink } from "react-plaid-link";
import { useRouter } from "next/navigation";

export default function Link() {
  const [linkToken, setLinkToken] = useState<string | null>(null);
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

    localStorage.setItem("access_token", JSON.stringify(data.access_token));
    router.replace("/accounts");
  };

  const { open, ready } = usePlaidLink({
    token: linkToken || "",
    onSuccess,
  });

  return (
    <div>
      <button onClick={() => open()} disabled={!ready}>
        login
      </button>
    </div>
  );
}
