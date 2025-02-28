import {ScrollView, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {IconCrypto} from '@/components/ui/IconCrypto';
import {Screen} from '@/components/ui/Screen';
import {ThemedText} from '@/components/ui/ThemedText';
import {Cryptos, CryptoUsdPrices} from '@/constants/Cryptos';
import {formatCurrency} from '@/utils/currency';

export default function HomeScreen() {
  return (
    <Screen>
      <ScrollView>
        <SafeAreaView>
          <View style={styles.cryptoContainer}>
            {Object.values(Cryptos).map(crypto => (
              <View key={crypto.symbol} style={styles.cryptoItem}>
                <IconCrypto crypto={crypto.symbol} />
                <ThemedText>{crypto.name}</ThemedText>
                <ThemedText>{formatCurrency(CryptoUsdPrices[crypto.symbol])}</ThemedText>
              </View>
            ))}
          </View>
        </SafeAreaView>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  cryptoContainer: {
    gap: 16,
  },
  cryptoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
