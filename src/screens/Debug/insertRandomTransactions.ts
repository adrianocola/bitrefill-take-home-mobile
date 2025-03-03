import {CoinsEnum, CoinUsdPrices} from '@/constants/Coins';
import {dbDrizzle} from '@/db/DrizzleDb';
import {transactions} from '@/db/schema';
import {toDBValue, TransactionTypeEnum} from '@/db/Transaction';
import {getRandomPastDate, randomItem, randomRange} from '@/utils/random';

export async function insertRandomTransactions(quantity: number) {
  const db = dbDrizzle.getDbInstance();
  const coins = Object.values(CoinsEnum);
  const chunkSize = 1000;

  const generateRecords = (count: number) =>
    new Array(count).fill(null).map(() => {
      const coin = randomItem(coins);
      const paid = randomRange(0, 100);
      const pricePerCoin = CoinUsdPrices[coin] * (1 + randomRange(-0.5, 0.5));
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
