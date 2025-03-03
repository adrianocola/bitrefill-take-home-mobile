import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Alert} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-controller';
import {Button, Card, Chip, Colors, Text, View} from 'react-native-ui-lib';

import {Screen} from '@/components/Screen';
import {
  deleteAllTransactions,
  getTransactionsCountGroupedByCoin,
  initializeTransactions,
  TransactionCountGroupedByCoin,
} from '@/db/Transaction';
import {formatNumber} from '@/utils/number';

import {insertRandomTransactions} from './insertRandomTransactions';

const counts = [1, 10, 100];

export function DebugScreen() {
  const [loading, setLoading] = useState(false);
  const [transactionsCountGroupedByCoin, setTransactionsCountGroupedByCoin] = useState<
    TransactionCountGroupedByCoin[]
  >([]);

  const totalTransactions = useMemo(
    () => transactionsCountGroupedByCoin.reduce((acc, item) => acc + item.count, 0),
    [transactionsCountGroupedByCoin],
  );

  const fetchData = useCallback(async () => {
    const data = await getTransactionsCountGroupedByCoin();
    setTransactionsCountGroupedByCoin(data);
  }, []);

  const onInsertRandomTransactions = async (count: number) => {
    setLoading(true);
    const start = Date.now();
    await insertRandomTransactions(count);
    Alert.alert(
      'Success',
      `Inserted ${formatNumber(count)} transactions in ${Date.now() - start} ms`,
    );
    setTimeout(() => {
      fetchData();
      setLoading(false);
    }, count);
  };

  const onResetDB = async () => {
    const start = Date.now();
    await deleteAllTransactions();
    await initializeTransactions();
    Alert.alert('Success', `DB Cleared in ${Date.now() - start} ms`);
    await fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Screen>
      <KeyboardAwareScrollView>
        <View flex padding-20>
          <Card padding-20>
            <Text>Total Transactions: {totalTransactions}</Text>
          </Card>
          <View row gap-8 marginV-20 style={{flexWrap: 'wrap'}}>
            {transactionsCountGroupedByCoin.map(item => (
              <Chip key={item.coin} label={`${item.coin}: ${item.count}`} />
            ))}
          </View>
          <Text text50>Add random transactions:</Text>
          <Text text80 color={Colors.$textDisabled}>
            From 1 year ago to now
          </Text>
          {counts.map(count => (
            <Button
              key={count}
              marginT-20
              label={formatNumber(count)}
              animateLayout
              disabled={loading}
              onPress={() => onInsertRandomTransactions(count)}
            />
          ))}
          <Button
            bg-$backgroundDangerHeavy
            marginT-40
            label="Reset DB"
            animateLayout
            disabled={loading}
            onPress={onResetDB}
          />
        </View>
      </KeyboardAwareScrollView>
    </Screen>
  );
}
