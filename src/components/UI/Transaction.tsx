interface Props {
  transaction: string;
}

export default function Transaction({ transaction }: Props) {
  return (
    <div className="w-full bg-tomato text-platinum p-5 rounded-md">
      <p>{transaction}</p>
    </div>
  );
}
