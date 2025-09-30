interface Transaction {
  id: number
  amount: number
  type: 'Income' | 'Expense' | 'Saving' | 'Investment'
  description: string
  category?: string
  created_at: string
}

interface GroupedTransaction {
  transactions: Transaction[]
  amount: number
}

interface GroupedTransactions {
  [date: string]: GroupedTransaction
}

export const groupAndSumTransactionsByDate = (transactions: Transaction[]): GroupedTransactions => {
  const grouped: GroupedTransactions = {}
  for (const transaction of transactions) {
    const date = transaction.created_at.split('T')[0]
    if (!grouped[date]) {
      grouped[date] = { transactions: [], amount: 0 }
    }
    grouped[date].transactions.push(transaction)
    const amount = transaction.type === 'Expense' ? -transaction.amount : transaction.amount
    grouped[date].amount += amount
  }
  return grouped
}