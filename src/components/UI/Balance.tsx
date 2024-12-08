import Link from "next/link";

interface Props {
  account: string;
  mask: string;
  amount: number;
  currency: string;
}

export default function Balance({ account, mask, amount, currency }: Props) {
  return (
    <div className="w-full bg-tomato text-platinum p-5 rounded-md flex justify-around items-center">
      <div className="w-1/2">
        <p className="font-bold">
          {account} ({mask})
        </p>
        <p>
          ${amount} {currency}
        </p>
      </div>

      <Link href="/">→</Link>
    </div>
  );
}
