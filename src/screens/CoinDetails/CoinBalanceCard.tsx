import React from 'react';
import {StyleSheet} from 'react-native';
import {Card, Text, View} from 'react-native-ui-lib';

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
    <Card center padding-20 backgroundColor={cryptoData.color} style={styles.container}>
      <View absH style={styles.iconContainer}>
        <IconCrypto crypto={coin} size={120} style={styles.icon} color="black" />
      </View>
      <View gap-8 paddingL-100 center>
        <Text text30BL color={cryptoData.textColor}>
          {formatCurrency(totalQuantity * CryptoUsdPrices[coin])}
        </Text>
        <Text text70 color={cryptoData.textColor}>
          {totalQuantity} {coin}
        </Text>
      </View>
    </Card>
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
  icon: {
    backgroundColor: 'black',
    borderRadius: 100,
  },
});
