import Balances from "@/components/Plaid/Balances";
import Identity from "@/components/Plaid/Identity";
import Recurring from "@/components/Plaid/Recurring";

export default function () {
  return (
    <div className="flex flex-col gap-4 justify-center items-center h-[100vh]">
      <Identity />
      <Balances />
      <Recurring />
    </div>
  );
}
