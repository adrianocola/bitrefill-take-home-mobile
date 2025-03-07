import BigNumber from 'bignumber.js';
import dayjs from 'dayjs';
import {count, desc, eq, sql, sum} from 'drizzle-orm';
import {useLiveQuery} from 'drizzle-orm/expo-sqlite';
import {useCallback, useEffect, useRef, useState} from 'react';

import {CoinsEnum} from '@/constants/Coins';
import {NUMBER_PRECISION, TRANSACTIONS_PAGE_SIZE} from '@/constants/Consts';

import {dbDrizzle} from './DrizzleDb';
import initialData from './initialTransactions.json';
import {transactions} from './schema';

const precisionMultiplier = new BigNumber(10).pow(NUMBER_PRECISION);

export enum TransactionTypeEnum {
  BUY = 'buy',
  SELL = 'sell',
}

export type Transaction = typeof transactions.$inferSelect & {
  coin: CoinsEnum;
  type: TransactionTypeEnum;
};

export interface TransactionData extends Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'> {
  type: TransactionTypeEnum;
}

export function toDBValue(value: number | string): number {
  return new BigNumber(value)
    .times(precisionMultiplier)
    .integerValue(BigNumber.ROUND_FLOOR)
    .toNumber();
}

function fromDBValue(value: number | string | null): number {
  return new BigNumber(value ?? 0).div(precisionMultiplier).toNumber();
}

function processTransactionsListFromDb(transactions: Transaction[]) {
  return transactions.map(transaction => ({
    ...transaction,
    quantity: fromDBValue(transaction.quantity),
    pricePerCoin: fromDBValue(transaction.pricePerCoin),
  }));
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
    quantity: toDBValue(transaction.quantity),
    pricePerCoin: toDBValue(transaction.pricePerCoin),
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
    quantity: toDBValue(transaction.quantity),
    pricePerCoin: toDBValue(transaction.pricePerCoin),
    createdAt: new Date(),
    updatedAt: new Date(),
  });
}

export async function updateTransaction(id: number, transaction: TransactionData) {
  const db = dbDrizzle.getDbInstance();
  return db
    .update(transactions)
    .set({
      ...transaction,
      quantity: toDBValue(transaction.quantity),
      pricePerCoin: toDBValue(transaction.pricePerCoin),
      updatedAt: new Date(),
    })
    .where(eq(transactions.id, id));
}

export async function deleteTransaction(id: number) {
  const db = dbDrizzle.getDbInstance();
  return db.delete(transactions).where(eq(transactions.id, id));
}

export async function deleteAllTransactions() {
  const db = dbDrizzle.getDbInstance();
  return db.delete(transactions);
}

export interface TransactionCountGroupedByCoin {
  coin: CoinsEnum;
  count: number;
}
export async function getTransactionsCountGroupedByCoin() {
  const db = dbDrizzle.getDbInstance();
  const data = await db
    .select({
      coin: transactions.coin,
      count: count().as('count'),
    })
    .from(transactions)
    .groupBy(transactions.coin)
    .orderBy(desc(sql`count`));

  return data as TransactionCountGroupedByCoin[];
}

export function useTransaction(id: number) {
  const db = dbDrizzle.getDbInstance();
  const {data} = useLiveQuery(db.select().from(transactions).where(eq(transactions.id, id)));

  return processTransactionsListFromDb(data as Transaction[])[0] ?? null;
}

export function useAllTransactions() {
  const db = dbDrizzle.getDbInstance();
  const {data} = useLiveQuery(db.select().from(transactions).orderBy(transactions.date));

  return processTransactionsListFromDb(data as Transaction[]);
}

export function useTransactionsQuantityByCoin(coin: CoinsEnum) {
  const db = dbDrizzle.getDbInstance();

  const {data} = useLiveQuery(
    db
      .select({
        totalQuantity: sum(transactions.quantity),
      })
      .from(transactions)
      .where(eq(transactions.coin, coin))
      .groupBy(transactions.coin),
  );

  return fromDBValue(data[0]?.totalQuantity ?? 0);
}

export function useTransactionsIdsByCoinPaginated(coin: CoinsEnum) {
  const [transactionsIds, setTransactionsIds] = useState<number[]>([]);
  const pageRef = useRef(0);
  const fetchingRef = useRef(false);
  const haveMoreRef = useRef(true);

  const nextPage = useCallback(
    async (reset = false) => {
      if (!reset && (fetchingRef.current || !haveMoreRef.current)) return;

      fetchingRef.current = true;

      pageRef.current = reset ? 0 : pageRef.current + 1;
      const db = dbDrizzle.getDbInstance();
      const records = await db
        .select({
          id: transactions.id,
        })
        .from(transactions)
        .where(eq(transactions.coin, coin))
        .orderBy(desc(transactions.date))
        .limit(TRANSACTIONS_PAGE_SIZE)
        .offset(pageRef.current * TRANSACTIONS_PAGE_SIZE);

      const ids = records.map(t => t.id);

      setTransactionsIds(
        reset ? ids : prevTransactionsIds => [...prevTransactionsIds, ...records.map(t => t.id)],
      );
      haveMoreRef.current = records.length === TRANSACTIONS_PAGE_SIZE;

      fetchingRef.current = false;
    },
    [coin],
  );

  const reset = useCallback(() => {
    nextPage(true);
  }, [nextPage]);

  useEffect(() => {
    reset();
  }, [reset]);

  return {transactionsIds, haveMore: haveMoreRef.current, nextPage, reset};
}
