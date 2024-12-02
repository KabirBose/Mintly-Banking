import FetchBalance from "@/components/FetchBalance";
import FetchIdentity from "@/components/FetchIdentity";
import FetchRecurring from "@/components/FetchRecurring";
import FetchTransactions from "@/components/FetchTransactions";
import PlaidLink from "@/components/PlaidLink";

export default function () {
  return (
    <div className="flex flex-col gap-5">
      <h1>Mintly</h1>
      <PlaidLink />
      <FetchTransactions />
      <FetchBalance />
      <FetchRecurring />
      <FetchIdentity />
    </div>
  );
}
