"use client";

import React, { useState } from "react";
import Accounts from "@/components/Plaid/Accounts";
import Recurring from "@/components/Plaid/Recurring";

export default function Changer() {
  const [component, setComponent] = useState<React.ReactNode>(<Accounts />);
  const [btnText, setBtnText] = useState<string>("Recurring");

  const handleClick = () => {
    if (btnText === "Recurring") {
      setBtnText("Accounts");
      setComponent(<Recurring />);
    } else {
      setBtnText("Recurring");
      setComponent(<Accounts />);
    }
  };

  return (
    <div>
      {component}
      <button
        className="w-full bg-blackolive text-skyblue mt-3"
        onClick={handleClick}
      >
        Show {btnText}
      </button>
    </div>
  );
}
