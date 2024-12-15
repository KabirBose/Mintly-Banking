interface Props {
  transactions: any;
}

export default function Transactions({ transactions }: Props) {
  return (
    <div>
      <h3 className="text-center mb-2">Transactions</h3>
      {transactions?.map((transaction: any) => (
        <div
          key={transaction.transaction_id}
          className="bg-tomato p-5 border-peach border-4 rounded-lg mb-2"
        >
          <div className="flex justify-between items-center w-full">
            <p className="font-bold">{transaction.name}</p>
            <p className="text-lg font-bold flex flex-col justify-center items-center">
              ${transaction.amount}
            </p>
          </div>
          <div className="flex gap-1">
            <p>
              {transaction.merchant_name} - {transaction.website}
            </p>
          </div>
          <p>{transaction.date}</p>
        </div>
      ))}
    </div>
  );
}
