import React from 'react';
import {StyleSheet} from 'react-native';
import {Colors, Text, View} from 'react-native-ui-lib';

import {GradientCard} from '@/components/GradientCard';
import {IconCrypto} from '@/components/ui/IconCrypto';
import {Cryptos, CryptosEnum, CryptoUsdPrices} from '@/constants/Cryptos';
import {useTransactionsQuantityByCoin} from '@/db/Transaction';
import {formatCurrency} from '@/utils/number';

interface CoinBalanceCardProps {
  coin: CryptosEnum;
}

export const CoinBalanceCard = ({coin}: CoinBalanceCardProps) => {
  const totalQuantity = useTransactionsQuantityByCoin(coin);
  const cryptoData = Cryptos[coin];
  return (
    <GradientCard
      center
      padding-20
      backgroundColor={cryptoData.color}
      style={styles.container}
      color="rgba(255,255,255,0.25)">
      <View absH style={styles.iconContainer}>
        <IconCrypto
          crypto={coin}
          size={120}
          logoOnly
          color={cryptoData.textColor ?? Colors.white}
        />
      </View>
      <View gap-8 paddingL-100 center>
        <Text text30BL color={cryptoData.textColor}>
          {formatCurrency(totalQuantity * CryptoUsdPrices[coin])}
        </Text>
        <Text text70 color={cryptoData.textColor}>
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
