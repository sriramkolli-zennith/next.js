import { useFormatCurrency } from "@/hooks/use-format-currency"

interface TransactionSummaryItemProps {
  date: string
  amount: number
}

export default function TransactionSummaryItem({date, amount}: TransactionSummaryItemProps) {
  const formattedAmount = useFormatCurrency(amount)
  return (<div className="flex text-gray-500 dark:text-gray-400 font-semibold">
    <div className="grow">
      {date}
    </div>

    <div className="min-w-[70px] text-right font-semibold">{formattedAmount}</div>
    <div className="min-w-[100px]"></div>
  </div>)
}