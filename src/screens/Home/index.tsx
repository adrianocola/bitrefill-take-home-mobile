import {drizzle, useLiveQuery} from 'drizzle-orm/expo-sqlite';
import {Link} from 'expo-router';
import {useSQLiteContext} from 'expo-sqlite';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Text} from 'react-native-ui-lib';

import {IconCrypto} from '@/components/ui/IconCrypto';
import {Screen} from '@/components/ui/Screen';
import {Cryptos, CryptoUsdPrices} from '@/constants/Cryptos';
import * as schema from '@/db/schema';
import {transactions} from '@/db/schema';
import {formatCurrency} from '@/utils/currency';

export function HomeScreen() {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, {schema});

  const {data} = useLiveQuery(drizzleDb.select().from(transactions));

  console.log('DATA', data[data.length - 1]);

  return (
    <Screen>
      <ScrollView>
        <SafeAreaView>
          <Link asChild href="/transaction/TransactionRoute">
            <TouchableOpacity style={styles.button}>
              <Text>NEW TRANSACTION</Text>
            </TouchableOpacity>
          </Link>
          <View style={styles.cryptoContainer}>
            {Object.values(Cryptos).map(crypto => (
              <Link
                asChild
                href={{
                  pathname: '/coin/[coinId]',
                  params: {coinId: crypto.symbol},
                }}
                key={crypto.symbol}>
                <TouchableOpacity>
                  <View style={styles.cryptoItem}>
                    <IconCrypto crypto={crypto.symbol} />
                    <Text>{crypto.name}</Text>
                    <Text>{formatCurrency(CryptoUsdPrices[crypto.symbol])}</Text>
                  </View>
                </TouchableOpacity>
              </Link>
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
  button: {
    backgroundColor: 'red',
    borderRadius: 10,
    padding: 10,
    marginVertical: 20,
  },
});
