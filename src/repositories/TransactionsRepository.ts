import Transaction from '../models/Transaction';

interface CreateTransaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const totalIncome = this.transactions.reduce(
      (total, { type, value }) => {
        if (type === 'income') {
          // eslint-disable-next-line no-param-reassign
          total[type] += value;
        }
        if (type === 'outcome') {
          // eslint-disable-next-line no-param-reassign
          total[type] += value;
        }
        return total;
      },
      {
        income: 0,
        outcome: 0,
      },
    );

    return {
      income: totalIncome.income,
      outcome: totalIncome.outcome,
      total: totalIncome.income - totalIncome.outcome,
    };
  }

  public create({ title, value, type }: CreateTransaction): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
