interface Props {
  transaction: string;
}

export default function Transaction({ transaction }: Props) {
  return (
    <div className="w-full bg-gray-800 p-5 rounded-md">
      <p>{transaction}</p>
    </div>
  );
}
