"use client";

import { useState } from "react";
import Balances from "@/components/Plaid/Balances";
import Recurring from "@/components/Plaid/Recurring";

export default function Slider() {
  const [component, setComponent] = useState<any>(<Balances />);
  const [btnText, setBtnText] = useState("Recurring");

  const handleClick = () => {
    if (btnText === "Recurring") {
      setBtnText("Balances");
      setComponent(<Recurring />);
    } else {
      setBtnText("Recurring");
      setComponent(<Balances />);
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
