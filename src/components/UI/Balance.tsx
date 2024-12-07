interface Props {
  account: string;
  mask: string;
  amount: number;
  currency: string;
}

export default function Balance({ account, mask, amount, currency }: Props) {
  return (
    <div className="w-full bg-tomato text-platinum p-5 rounded-md">
      <p>
        {account} ({mask})
      </p>
      <p>
        ${amount} {currency}
      </p>
    </div>
  );
}
