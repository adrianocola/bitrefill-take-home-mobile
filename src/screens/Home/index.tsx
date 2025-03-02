import FeatherIcons from '@expo/vector-icons/Feather';
import {Link, router} from 'expo-router';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Animated, {
  clamp,
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Avatar, Colors, FloatingButton, Text, View} from 'react-native-ui-lib';

import {GradientCard} from '@/components/GradientCard';
import {IconCrypto} from '@/components/ui/IconCrypto';
import {Screen} from '@/components/ui/Screen';
import {NEW_TRANSACTION_ID} from '@/constants/Consts';
import {Cryptos} from '@/constants/Cryptos';
import {useBalanceGroupedByCoin} from '@/hooks/useBalanceGroupedByCoin';
import {CryptoBarChart} from '@/screens/Home/CryptoBarChart';
import {formatCurrency, formatNumber} from '@/utils/number';

export function HomeScreen() {
  const {top} = useSafeAreaInsets();
  const animatedRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(animatedRef);

  const {myCoins, totalBalance} = useBalanceGroupedByCoin();

  const bottomButtonAnimatedStyle = useAnimatedStyle(() => ({
    bottom: clamp(-scrollOffset.value, -500, 0),
  }));

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    shadowColor: interpolateColor(scrollOffset.value, [0, 200], ['#000000', '#222222']),
    borderBottomColor: interpolateColor(scrollOffset.value, [0, 200], ['#000000', '#222222']),
  }));

  const plusIconAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollOffset.value, [0, 200], [0, 1], Extrapolation.CLAMP),
  }));

  const navigateToNewTransaction = () => {
    router.navigate({
      pathname: '/transaction/[transactionId]',
      params: {transactionId: NEW_TRANSACTION_ID},
    });
  };

  return (
    <Screen>
      <Animated.View style={[styles.header, headerAnimatedStyle]}>
        <View row centerV spread padding-20 paddingB-10 style={{paddingTop: top}}>
          <View row centerV gap-10>
            <Avatar source={require('@/assets/images/dwight.jpg')} size={40} />
            <Text text70>Dwight Schrute</Text>
          </View>
          <Animated.View style={plusIconAnimatedStyle}>
            <Link
              asChild
              href={{
                pathname: '/transaction/[transactionId]',
                params: {transactionId: NEW_TRANSACTION_ID},
              }}>
              <TouchableOpacity hitSlop={10}>
                <FeatherIcons name="plus" size={28} color={Colors.$textDefault} />
              </TouchableOpacity>
            </Link>
          </Animated.View>
        </View>
      </Animated.View>

      <Animated.ScrollView ref={animatedRef}>
        <View padding-20 paddingB-100 paddingT-0>
          <GradientCard center marginV-20 paddingV-20 paddingH-20 gap-10 color="rgba(0,0,0,0.5)">
            <Text text30BO>{formatCurrency(totalBalance)}</Text>
            <CryptoBarChart coinsWithBalance={myCoins} />
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
                        {formatNumber(item.totalQuantity)} {item.coin}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </Link>
            ))}
          </View>
        </View>
      </Animated.ScrollView>
      <Animated.View style={[styles.bottomButtonContainer, bottomButtonAnimatedStyle]}>
        <FloatingButton
          bottomMargin={50}
          fullWidth
          visible
          button={{label: 'Add Transaction', onPress: navigateToNewTransaction}}
        />
      </Animated.View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'black',
    shadowColor: 'rgb(10, 10, 10)',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.75,
    shadowRadius: 10,
    elevation: 5,
    zIndex: 10,
  },
  bottomButtonContainer: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
  },
});
