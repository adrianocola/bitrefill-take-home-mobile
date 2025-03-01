import React, {useMemo} from 'react';
import {Alert} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-controller';
import {Button, Card, Chip, Text, View} from 'react-native-ui-lib';

import {Screen} from '@/components/ui/Screen';
import {insertRandomTransactions, useTransactionsCountGroupedByCoin} from '@/db/Transaction';
import {formatNumber} from '@/utils/number';

const counts = [1, 10, 100, 1_000, 10_000];

export function DebugScreen() {
  const transactionsCountByCoin = useTransactionsCountGroupedByCoin();
  const totalTransactions = useMemo(
    () => transactionsCountByCoin.reduce((acc, item) => acc + item.count, 0),
    [transactionsCountByCoin],
  );

  const onInsertRandomTransactions = async (count: number) => {
    const start = Date.now();
    await insertRandomTransactions(count);
    Alert.alert(
      'Success',
      `Inserted ${formatNumber(count)} transactions in ${Date.now() - start} ms`,
    );
  };

  return (
    <Screen>
      <KeyboardAwareScrollView>
        <View flex padding-20>
          <Card padding-20>
            <Text>Total Transactions: {totalTransactions}</Text>
          </Card>
          <View row gap-8 marginV-20 style={{flexWrap: 'wrap'}}>
            {transactionsCountByCoin.map(item => (
              <Chip key={item.coin} label={`${item.coin}: ${item.count}`} />
            ))}
          </View>
          <Text text50>Add random transactions:</Text>
          {counts.map(count => (
            <Button
              key={count}
              marginT-20
              label={formatNumber(count)}
              animateLayout
              onPress={() => onInsertRandomTransactions(count)}
            />
          ))}
        </View>
      </KeyboardAwareScrollView>
    </Screen>
  );
}
