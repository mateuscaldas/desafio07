import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(transactions: Transaction[]): Promise<Balance> {
    const incomes: number[] = [];
    const outcomes: number[] = [];

    transactions.map(income => {
      if (income.type === 'income') {
        incomes.push(income.value);
      }
      return null;
    });

    transactions.map(income => {
      if (income.type === 'outcome') {
        outcomes.push(income.value);
      }
      return null;
    });

    const totalIncome = incomes.reduce((acc, curr) => acc + Number(curr), 0);
    const totalOutcome = outcomes.reduce((acc, curr) => acc + Number(curr), 0);

    const total = totalIncome - totalOutcome;

    const balance = {
      income: totalIncome,
      outcome: totalOutcome,
      total,
    };

    return balance;
  }
}

export default TransactionsRepository;
