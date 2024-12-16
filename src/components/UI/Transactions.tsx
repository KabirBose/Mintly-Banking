interface Props {
  transactions: any;
}

export default function Transactions({ transactions }: Props) {
  return (
    <div className="p-5">
      <h3 className="text-center mb-2">Transactions</h3>
      {transactions?.length === 0 && (
        <h4 className="text-center mt-12">No transactions found</h4>
      )}
      {transactions?.map((transaction: any) => (
        <div
          key={transaction.transaction_id}
          className="bg-tomato p-5 border-peach border-4 rounded-lg mb-2"
        >
          <div className="flex justify-between items-center w-full">
            <p className="font-bold">{transaction.name}</p>
            <p className="font-bold flex flex-col justify-center items-center">
              ${transaction.amount.toFixed(2)}
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
