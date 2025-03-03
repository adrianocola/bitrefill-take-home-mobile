import {useMemo} from 'react';

import {CoinsEnum, CoinUsdPrices} from '@/constants/Coins';
import {useTransactionsQuantityGroupedByCoin} from '@/db/Transaction';

export interface CoinsWithBalance {
  coin: CoinsEnum;
  totalQuantity: number;
  balance: number;
  percentage: number;
}

export function useBalanceGroupedByCoin() {
  const transactionsGroupedByCoin = useTransactionsQuantityGroupedByCoin();
  return useMemo(() => {
    const withBalance = transactionsGroupedByCoin
      .map(data => ({
        ...data,
        balance: CoinUsdPrices[data.coin] * data.totalQuantity,
      }))
      .sort((a, b) => b.balance - a.balance);

    const totalBalance = withBalance.reduce((acc, item) => acc + item.balance, 0);

    const withPercentage: CoinsWithBalance[] = withBalance.map(data => ({
      ...data,
      percentage: (data.balance / totalBalance) * 100,
    }));

    return {myCoins: withPercentage, totalBalance};
  }, [transactionsGroupedByCoin]);
}
