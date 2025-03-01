import dayjs from 'dayjs';
import {eq, sql, sum} from 'drizzle-orm';
import {useLiveQuery} from 'drizzle-orm/expo-sqlite';

import {dbDrizzle} from './DrizzleDb';
import initialData from './initialTransactions.json';
import {Transaction, transactions} from './schema';

export enum TransactionTypeEnum {
  BUY = 'buy',
  SELL = 'sell',
}

export interface TransactionData extends Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'> {
  type: TransactionTypeEnum;
}

export async function initializeTransactions() {
  const db = dbDrizzle.getDbInstance();

  const result = db
    .select({count: sql<number>`COUNT(*)`})
    .from(transactions)
    .get();

  if (result && result.count > 0) return;

  const initialTransactions = initialData.transactions.map(transaction => ({
    ...transaction,
    id: undefined,
    date: dayjs(transaction.date, 'YYYY-MM-DD').toDate(),
    createdAt: new Date(),
    updatedAt: new Date(),
  }));

  return db.insert(transactions).values(initialTransactions);
}

export async function addTransaction(transaction: TransactionData) {
  const db = dbDrizzle.getDbInstance();
  return db.insert(transactions).values({
    ...transaction,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
}

export async function updateTransaction(id: number, transaction: Partial<TransactionData>) {
  const db = dbDrizzle.getDbInstance();
  return db
    .update(transactions)
    .set({
      ...transaction,
      updatedAt: new Date(),
    })
    .where(eq(transactions.id, id));
}

export async function deleteAllTransactions() {
  const db = dbDrizzle.getDbInstance();
  return db.delete(transactions);
}

export function useTransaction(id: number) {
  const db = dbDrizzle.getDbInstance();
  const {data} = useLiveQuery(db.select().from(transactions).where(eq(transactions.id, id)));

  return data;
}

export function useTransactionsGroupedByCoin() {
  const db = dbDrizzle.getDbInstance();
  const {data} = useLiveQuery(
    db
      .select({
        coin: transactions.coin,
        totalQuantity: sum(transactions.quantity),
      })
      .from(transactions)
      .groupBy(transactions.coin),
  );

  return data;
}
