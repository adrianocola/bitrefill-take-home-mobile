import {useCallback} from 'react';
import {FlatList, ListRenderItem, StyleSheet} from 'react-native';
import {View} from 'react-native-ui-lib';

import {Screen} from '@/components/ui/Screen';
import {CryptosEnum} from '@/constants/Cryptos';
import {useTransactionsIdsByCoinPaginated} from '@/db/Transaction';
import {CoinBalanceCard} from '@/screens/CoinDetails/CoinBalanceCard';
import {TransactionItem} from '@/screens/CoinDetails/TransactionItem';

interface CoinDetailsScreenProps {
  coin: CryptosEnum;
}

export function CoinDetailsScreen({coin}: CoinDetailsScreenProps) {
  const {transactionsIds} = useTransactionsIdsByCoinPaginated(coin);

  const keyExtractor = useCallback((item: number) => `${item}`, []);

  const renderItem: ListRenderItem<number> = useCallback(
    ({item}) => <TransactionItem transactionId={item} />,
    [],
  );

  return (
    <Screen>
      <View paddingH-20 flex>
        <View paddingV-20>
          <CoinBalanceCard coin={coin} />
        </View>
        <FlatList
          data={transactionsIds}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 100,
  },
});
