import FetchBalance from "@/components/FetchBalance";
import FetchIdentity from "@/components/FetchIdentity";
import FetchRecurring from "@/components/FetchRecurring";
import FetchTransactions from "@/components/FetchTransactions";

export default function () {
  return (
    <div className="flex flex-col gap-4 justify-center items-center h-[100vh]">
      <h1>Dashboard</h1>
      <FetchBalance />
    </div>
  );
}
