import React, {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {Colors, View} from 'react-native-ui-lib';

import {Coins} from '@/constants/Coins';
import {CoinsWithBalance} from '@/hooks/useBalanceGroupedByCoin';

import {CoinChip} from './CoinChip';

interface CoinLineProps {
  coinsWithBalance: CoinsWithBalance[];
}

const MAIN_COUNT = 5;

export const CoinBarChart = ({coinsWithBalance}: CoinLineProps) => {
  const {mainCoinsWithBalance, remainingPercentage} = useMemo(() => {
    if (!coinsWithBalance.length) return {mainCoinsWithBalance: [], remainingPercentage: 0};

    const mainCoinsWithBalance = coinsWithBalance.slice(0, MAIN_COUNT);
    const mainCoinsTotalPercentage = mainCoinsWithBalance.reduce(
      (acc, item) => acc + Math.round(item.percentage),
      0,
    );
    const remainingPercentage = Math.max(0, 100 - mainCoinsTotalPercentage);

    return {mainCoinsWithBalance, remainingPercentage};
  }, [coinsWithBalance]);

  if (!mainCoinsWithBalance.length) return null;

  return (
    <View gap-20 width="100%">
      <View row br100 style={styles.lineContainer}>
        {mainCoinsWithBalance.map((data, i) => (
          <View
            key={data.coin}
            width={`${Math.round(data.percentage)}%`}
            height={10}
            backgroundColor={Coins[data.coin].color}
          />
        ))}
        <View width={`${remainingPercentage}%`} height={10} backgroundColor={Colors.grey20} />
      </View>
      <View row gap-10 center style={styles.chipsContainer}>
        {mainCoinsWithBalance.map((data, i) => (
          <CoinChip key={data.coin} coin={data.coin} percentage={data.percentage} />
        ))}
        <CoinChip percentage={remainingPercentage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  lineContainer: {
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.white,
  },
  chipsContainer: {
    flexWrap: 'wrap',
  },
});
