import {drizzle, useLiveQuery} from 'drizzle-orm/expo-sqlite';
import {useSQLiteContext} from 'expo-sqlite';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {IconCrypto} from '@/components/ui/IconCrypto';
import {Screen} from '@/components/ui/Screen';
import {ThemedText} from '@/components/ui/ThemedText';
import {Cryptos, CryptosEnum, CryptoUsdPrices} from '@/constants/Cryptos';
import * as schema from '@/db/schema';
import {transactions} from '@/db/schema';
import {addTransaction, updateTransaction} from '@/db/Transaction';
import {formatCurrency} from '@/utils/currency';

export default function HomeScreen() {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, {schema});

  const onAddTransaction = async () => {
    const result = await addTransaction({
      coin: CryptosEnum.BTC,
      quantity: 1,
      pricePerCoin: 1000,
      type: 'buy',
      date: new Date(),
    });
    console.log('ADDED', result);
  };

  const onUpdateTransaction = async () => {
    const result = await updateTransaction(1, {
      quantity: 3,
      pricePerCoin: 3000,
    });
    console.log('UPDATED', result);
  };

  const {data} = useLiveQuery(drizzleDb.select().from(transactions));

  console.log('DATA', data);

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
          <TouchableOpacity onPress={onAddTransaction} style={styles.button}>
            <ThemedText>ADD TRANSACTION</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity onPress={onUpdateTransaction} style={styles.button}>
            <ThemedText>UPDATE TRANSACTION</ThemedText>
          </TouchableOpacity>
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
  button: {
    backgroundColor: 'red',
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
  },
});
