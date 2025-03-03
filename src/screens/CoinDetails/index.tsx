import {useCallback, useEffect} from 'react';
import {ActivityIndicator, FlatList, ListRenderItem, StyleSheet} from 'react-native';
import {Colors, Text, View} from 'react-native-ui-lib';

import {Screen} from '@/components/Screen';
import {CoinsEnum} from '@/constants/Coins';
import {useTransactionsIdsByCoinPaginated} from '@/db/Transaction';
import {CoinBalanceCard} from '@/screens/CoinDetails/CoinBalanceCard';
import {TransactionItem} from '@/screens/CoinDetails/TransactionItem';
import {useResetCoinsList} from '@/state/coins';

interface CoinDetailsScreenProps {
  coin: CoinsEnum;
}

export function CoinDetailsScreen({coin}: CoinDetailsScreenProps) {
  const resetCoinsList = useResetCoinsList();
  const {transactionsIds, haveMore, nextPage, reset} = useTransactionsIdsByCoinPaginated(coin);

  const keyExtractor = useCallback((item: number) => `${item}`, []);

  const renderItem: ListRenderItem<number> = useCallback(
    ({item}) => <TransactionItem transactionId={item} />,
    [],
  );

  const onEndReached = useCallback(() => {
    nextPage();
  }, [nextPage]);

  useEffect(() => {
    if (!resetCoinsList) return;

    reset();
  }, [reset, resetCoinsList]);

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
          <View padding-20 center>
            {haveMore ? (
              <ActivityIndicator color={Colors.$textDefault} />
            ) : (
              <Text $textDisabled>No more transactions....</Text>
            )}
          </View>
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
