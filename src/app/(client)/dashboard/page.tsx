import Balances from "@/components/Balances";
import Identity from "@/components/Identity";
import Recurring from "@/components/Recurring";
import Transactions from "@/components/Transactions";

export default function () {
  return (
    <div className="flex flex-col gap-4 justify-center items-center h-[100vh]">
      <h1>Dashboard</h1>
      <Balances />
    </div>
  );
}
