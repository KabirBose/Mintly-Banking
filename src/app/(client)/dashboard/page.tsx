import Balances from "@/components/Plaid/Balances";
import Identity from "@/components/Plaid/Identity";
import Recurring from "@/components/Plaid/Recurring";
import Transactions from "@/components/Plaid/Transactions";

export default function () {
  return (
    <div className="flex flex-col gap-4 justify-center items-center h-[100vh]">
      <h1>Dashboard</h1>
      <Identity />
      <Balances />
      <Recurring />
    </div>
  );
}
