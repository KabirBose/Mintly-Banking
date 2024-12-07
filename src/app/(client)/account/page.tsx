import Balances from "@/components/Plaid/Balances";
import Identity from "@/components/Plaid/Identity";
import Recurring from "@/components/Plaid/Recurring";

export default function () {
  return (
    <div className="flex flex-col gap-12 justify-center items-center min-h-[100vh]">
      <Identity />
      <Balances />
      <Recurring />
    </div>
  );
}
