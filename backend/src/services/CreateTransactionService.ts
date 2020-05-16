import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateCategoryService from './CreateCategoryService';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: Request): Promise<Transaction> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    const transactions = await transactionsRepository.find();

    const balance = await transactionsRepository.getBalance(transactions);

    if (balance.total < value && type === 'outcome') {
      throw new AppError("You don't have money!!");
    }

    const createCategory = new CreateCategoryService();

    const categoryCreated = await createCategory.execute(category);

    const transaction = transactionsRepository.create({
      title,
      value,
      type,
      category: categoryCreated,
    });

    await transactionsRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
