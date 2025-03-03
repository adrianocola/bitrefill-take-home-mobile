import React from 'react';
import {StyleSheet} from 'react-native';
import {Colors, Text, View} from 'react-native-ui-lib';

import {CoinIcon} from '@/components/CoinIcon';
import {GradientCard} from '@/components/GradientCard';
import {Coins, CoinsEnum, CoinUsdPrices} from '@/constants/Coins';
import {useTransactionsQuantityByCoin} from '@/db/Transaction';
import {formatCurrency} from '@/utils/number';

interface CoinBalanceCardProps {
  coin: CoinsEnum;
}

export const CoinBalanceCard = ({coin}: CoinBalanceCardProps) => {
  const totalQuantity = useTransactionsQuantityByCoin(coin);
  const coinData = Coins[coin];
  return (
    <GradientCard
      center
      padding-20
      backgroundColor={coinData.color}
      style={styles.container}
      color="rgba(255,255,255,0.25)">
      <View absH style={styles.iconContainer}>
        <CoinIcon coin={coin} size={120} logoOnly color={coinData.textColor ?? Colors.white} />
      </View>
      <View gap-8 paddingL-100 center>
        <Text text30BL color={coinData.textColor}>
          {formatCurrency(totalQuantity * CoinUsdPrices[coin])}
        </Text>
        <Text text70 color={coinData.textColor}>
          {totalQuantity} {coin}
        </Text>
      </View>
    </GradientCard>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  iconContainer: {
    opacity: 0.5,
    left: 10,
  },
});
