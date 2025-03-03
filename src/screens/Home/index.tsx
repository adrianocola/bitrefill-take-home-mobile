import FeatherIcons from '@expo/vector-icons/Feather';
import Constants from 'expo-constants';
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
import {Colors, FloatingButton, Image, Text, View} from 'react-native-ui-lib';

import {CoinIcon} from '@/components/CoinIcon';
import {GradientCard} from '@/components/GradientCard';
import {Screen} from '@/components/Screen';
import {Coins} from '@/constants/Coins';
import {NEW_TRANSACTION_ID} from '@/constants/Consts';
import {useBalanceGroupedByCoin} from '@/hooks/useBalanceGroupedByCoin';
import {formatCurrency, formatNumber} from '@/utils/number';

import {CoinBarChart} from './CoinBarChart';

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
    borderBottomColor: interpolateColor(scrollOffset.value, [0, 200], ['#000000', '#333333']),
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
            <Image
              source={require('@/assets/images/adaptive-icon.png')}
              width={48}
              aspectRatio={1}
            />
            <Text text70BL>{Constants.expoConfig?.name}</Text>
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
            <CoinBarChart coinsWithBalance={myCoins} />
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
                      <CoinIcon coin={item.coin} size={40} />
                      <Text text60BL>{Coins[item.coin].name}</Text>
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
    elevation: 10,
    filter: 'dropShadow(#ffffff, 0, 10px, 10px)',
    zIndex: 10,
  },
  bottomButtonContainer: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
  },
});
