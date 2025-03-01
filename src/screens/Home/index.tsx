import FontAwesomeIcons from '@expo/vector-icons/FontAwesome';
import {Link, router} from 'expo-router';
import React, {useMemo} from 'react';
import {ScrollView, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Avatar, Card, Colors, FloatingButton, Text, View} from 'react-native-ui-lib';

import {IconCrypto} from '@/components/ui/IconCrypto';
import {Screen} from '@/components/ui/Screen';
import {NEW_TRANSACTION_ID} from '@/constants/Consts';
import {Cryptos, CryptoUsdPrices} from '@/constants/Cryptos';
import {useTransactionsGroupedByCoin} from '@/db/Transaction';
import {formatCurrency} from '@/utils/number';

export function HomeScreen() {
  const transactionsGroupedByCoin = useTransactionsGroupedByCoin();
  const myCoins = useMemo(() => {
    return transactionsGroupedByCoin
      .map(data => ({
        ...data,
        balance: CryptoUsdPrices[data.coin] * data.totalQuantity,
      }))
      .sort((a, b) => b.balance - a.balance);
  }, [transactionsGroupedByCoin]);

  const balance = useMemo(() => {
    return myCoins.reduce((acc, item) => acc + item.balance, 0);
  }, [myCoins]);

  const navigateToNewTransaction = () => {
    router.navigate({
      pathname: '/transaction/[transactionId]',
      params: {transactionId: NEW_TRANSACTION_ID},
    });
  };

  return (
    <Screen>
      <ScrollView>
        <SafeAreaView>
          <View padding-20>
            <View row centerV spread>
              <View row centerV gap-10>
                <Avatar source={require('@/assets/images/dwight.jpg')} size={48} />
                <Text text50>Dwight Schrute</Text>
              </View>
              <Link asChild href="/debug">
                <TouchableOpacity hitSlop={10}>
                  <FontAwesomeIcons name="bug" size={20} color={Colors.$textDisabled} />
                </TouchableOpacity>
              </Link>
            </View>
            <Card center marginV-20 paddingV-20>
              <Card.Section
                content={[{text: 'my balance', text70: true, grey20: true}]}
                contentStyle={{alignItems: 'center'}}
              />
              <Text text30BO>{formatCurrency(balance)}</Text>
            </Card>
            <View gap-16>
              {myCoins.map(item => (
                <Link
                  key={item.coin}
                  asChild
                  href={{
                    pathname: '/coin/[coinId]',
                    params: {coinId: item.coin},
                  }}>
                  <TouchableOpacity>
                    <View row centerV spread>
                      <View row centerV gap-8>
                        <IconCrypto crypto={item.coin} size={40} />
                        <Text text60BL>{Cryptos[item.coin].name}</Text>
                      </View>
                      <View right>
                        <Text text70BL>{formatCurrency(item.balance)}</Text>
                        <Text $textNeutral text80>
                          {item.totalQuantity} {item.coin}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </Link>
              ))}
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
      <FloatingButton
        visible
        button={{label: 'New Transaction', onPress: navigateToNewTransaction}}
      />
    </Screen>
  );
}
