import BigNumber from 'bignumber.js';
import dayjs from 'dayjs';
import {count, desc, eq, sql, sum} from 'drizzle-orm';
import {useLiveQuery} from 'drizzle-orm/expo-sqlite';

import {NUMBER_PRECISION} from '@/constants/Consts';
import {CryptosEnum, CryptoUsdPrices} from '@/constants/Cryptos';
import {getRandomPastDate, randomItem, randomRange} from '@/utils/random';

import {dbDrizzle} from './DrizzleDb';
import initialData from './initialTransactions.json';
import {Transaction, transactions} from './schema';

export enum TransactionTypeEnum {
  BUY = 'buy',
  SELL = 'sell',
}

const precisionMultiplier = new BigNumber(10).pow(NUMBER_PRECISION);

export interface TransactionData extends Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'> {
  type: TransactionTypeEnum;
}

function toDBValue(value: number | string): number {
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

export async function insertRandomTransactions(quantity: number) {
  const db = dbDrizzle.getDbInstance();
  const coins = Object.values(CryptosEnum);
  const chunkSize = 1000;

  const generateRecords = (count: number) =>
    new Array(count).fill(null).map(() => {
      const coin = randomItem(coins);
      const paid = randomRange(0, 100);
      const pricePerCoin = CryptoUsdPrices[coin] * (1 + randomRange(-0.5, 0.5));
      const type = randomRange(0, 1) <= 0.25 ? TransactionTypeEnum.SELL : TransactionTypeEnum.BUY;
      const quantity = (type === TransactionTypeEnum.BUY ? 1 : -1) * (paid / pricePerCoin);

      return {
        coin,
        quantity: toDBValue(quantity),
        pricePerCoin: toDBValue(pricePerCoin),
        type,
        date: getRandomPastDate(365),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

  while (quantity > 0) {
    const chunkRecords = generateRecords(Math.min(chunkSize, quantity));
    await db.insert(transactions).values(chunkRecords);
    quantity -= chunkSize;
  }
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

export async function updateTransaction(id: number, transaction: Partial<TransactionData>) {
  const db = dbDrizzle.getDbInstance();
  return db
    .update(transactions)
    .set({
      ...transaction,
      quantity: transaction.quantity !== undefined ? toDBValue(transaction.quantity) : undefined,
      pricePerCoin:
        transaction.pricePerCoin !== undefined ? toDBValue(transaction.pricePerCoin) : undefined,
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

  return processTransactionsListFromDb(data)[0] ?? null;
}

export function useTransactionsByCoin(coin: CryptosEnum) {
  const db = dbDrizzle.getDbInstance();
  const {data} = useLiveQuery(
    db
      .select()
      .from(transactions)
      .where(eq(transactions.coin, coin))
      .orderBy(desc(transactions.date)),
  );

  return processTransactionsListFromDb(data);
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

  return data.map(item => ({
    ...item,
    coin: item.coin as CryptosEnum,
    totalQuantity: fromDBValue(item.totalQuantity),
  }));
}

export function useTransactionsCountGroupedByCoin() {
  const db = dbDrizzle.getDbInstance();
  const {data} = useLiveQuery(
    db
      .select({
        coin: transactions.coin,
        count: count().as('count'),
      })
      .from(transactions)
      .groupBy(transactions.coin)
      .orderBy(desc(sql`count`)),
  );

  return data;
}
