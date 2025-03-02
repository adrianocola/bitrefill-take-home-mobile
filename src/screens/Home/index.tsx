import FontAwesomeIcons from '@expo/vector-icons/FontAwesome';
import {Link, router} from 'expo-router';
import React from 'react';
import {ScrollView, TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Avatar, Colors, FloatingButton, Text, View} from 'react-native-ui-lib';

import {GradientCard} from '@/components/GradientCard';
import {IconCrypto} from '@/components/ui/IconCrypto';
import {Screen} from '@/components/ui/Screen';
import {NEW_TRANSACTION_ID} from '@/constants/Consts';
import {Cryptos} from '@/constants/Cryptos';
import {useBalanceGroupedByCoin} from '@/hooks/useBalanceGroupedByCoin';
import {CryptoLine} from '@/screens/Home/CryptoLine';
import {formatCurrency} from '@/utils/number';

export function HomeScreen() {
  const {top} = useSafeAreaInsets();

  const {myCoins, totalBalance} = useBalanceGroupedByCoin();

  const navigateToNewTransaction = () => {
    router.navigate({
      pathname: '/transaction/[transactionId]',
      params: {transactionId: NEW_TRANSACTION_ID},
    });
  };

  return (
    <Screen>
      <View row centerV spread padding-20 paddingB-10 style={{paddingTop: top}}>
        <View row centerV gap-10>
          <Avatar source={require('@/assets/images/dwight.jpg')} size={40} />
          <Text text70>Dwight Schrute</Text>
        </View>
        <Link asChild href="/debug">
          <TouchableOpacity hitSlop={10}>
            <FontAwesomeIcons name="bug" size={20} color={Colors.$textDanger} />
          </TouchableOpacity>
        </Link>
      </View>
      <ScrollView>
        <View padding-20 paddingT-0>
          <GradientCard center marginV-20 paddingV-20 paddingH-20 gap-10>
            <Text text30BO>{formatCurrency(totalBalance)}</Text>
            <CryptoLine coinsWithBalance={myCoins} />
          </GradientCard>
          <View gap-20>
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
      </ScrollView>
      <FloatingButton
        visible
        button={{label: 'Add Transaction', onPress: navigateToNewTransaction}}
      />
    </Screen>
  );
}
