interface Props {
  transaction: any;
}

export default function RecurringTr({ transaction }: Props) {
  return (
    <div className="bg-tomato p-5 border-peach border-4 rounded-lg mb-2">
      <div className="flex justify-between items-center w-full">
        <p className="font-bold w-3/4">{transaction.description}</p>
        <p className="font-bold flex flex-col justify-center items-center">
          ${transaction.average_amount.amount.toFixed(2)}
        </p>
      </div>

      <div className="flex flex-col">
        <p>{transaction.merchant_name}</p>
        <p>Last payment:{transaction.last_date}</p>
        <p>Next payment: {transaction.predicted_next_date}</p>
      </div>
    </div>
  );
}
