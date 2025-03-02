import {useCallback} from 'react';
import {FlatList, ListRenderItem, StyleSheet} from 'react-native';
import {Text, View} from 'react-native-ui-lib';

import {Screen} from '@/components/ui/Screen';
import {CryptosEnum} from '@/constants/Cryptos';
import {useTransactionsIdsByCoinPaginated} from '@/db/Transaction';
import {CoinBalanceCard} from '@/screens/CoinDetails/CoinBalanceCard';
import {TransactionItem} from '@/screens/CoinDetails/TransactionItem';

interface CoinDetailsScreenProps {
  coin: CryptosEnum;
}

export function CoinDetailsScreen({coin}: CoinDetailsScreenProps) {
  const {transactionsIds, haveMore, nextPage} = useTransactionsIdsByCoinPaginated(coin);

  const keyExtractor = useCallback((item: number) => `${item}`, []);

  const renderItem: ListRenderItem<number> = useCallback(
    ({item}) => <TransactionItem transactionId={item} />,
    [],
  );

  const onEndReached = useCallback(() => {
    nextPage();
  }, [nextPage]);

  return (
    <Screen>
      <FlatList
        data={transactionsIds}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.listContent}
        contentInsetAdjustmentBehavior="automatic"
        onEndReached={transactionsIds.length ? onEndReached : undefined}
        ListHeaderComponent={
          <View paddingV-20>
            <CoinBalanceCard coin={coin} />
          </View>
        }
        ListFooterComponent={
          !haveMore ? (
            <View padding-20 center>
              <Text $textDisabled>No more transactions....</Text>
            </View>
          ) : undefined
        }
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 100,
    paddingHorizontal: 20,
  },
});
