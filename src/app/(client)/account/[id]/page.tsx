"use client";

import { useParams } from "next/navigation";

export default function Account() {
  const { id } = useParams();

  return (
    <div>
      <p>Current ID: {id}</p>
    </div>
  );
}
