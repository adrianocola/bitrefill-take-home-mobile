import BigNumber from 'bignumber.js';
import {useMemo} from 'react';

import {CoinsEnum, CoinUsdPrices} from '@/constants/Coins';
import {useAllTransactions} from '@/db/Transaction';

export interface CoinsWithBalance {
  coin: CoinsEnum;
  totalQuantity: number;
  balance: number;
  percentage: number;
}

export function useBalanceGroupedByCoin() {
  const allTransactions = useAllTransactions();

  const coinQuantityMap = allTransactions.reduce(
    (acc, transaction) => {
      acc[transaction.coin] = (acc[transaction.coin] ?? new BigNumber(0)).plus(
        transaction.quantity,
      );
      return acc;
    },
    {} as Record<CoinsEnum, BigNumber>,
  );

  return useMemo(() => {
    const coinBalanceMap = Object.entries(coinQuantityMap).reduce(
      (acc, [key, quantity]) => {
        const coin = key as CoinsEnum;
        acc[coin] = new BigNumber(quantity).times(CoinUsdPrices[coin]);
        return acc;
      },
      {} as Record<CoinsEnum, BigNumber>,
    );

    const totalBalance = Object.values(coinBalanceMap)
      .reduce((acc, balance) => acc.plus(balance), BigNumber(0))
      .toNumber();

    const withPercentage: CoinsWithBalance[] = Object.entries(coinBalanceMap)
      .map(([key, balance]) => {
        const coin = key as CoinsEnum;
        return {
          coin,
          totalQuantity: coinQuantityMap[coin].toNumber(),
          balance: balance.toNumber(),
          percentage: balance.div(totalBalance).times(100).toNumber(),
        };
      })
      .sort((a, b) => b.balance - a.balance);

    return {myCoins: withPercentage, allTransactions, totalBalance};
  }, [allTransactions, coinQuantityMap]);
}
