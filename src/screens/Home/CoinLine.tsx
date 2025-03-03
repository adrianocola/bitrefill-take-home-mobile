import {Link} from 'expo-router';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Text, View} from 'react-native-ui-lib';

import {CoinIcon} from '@/components/CoinIcon';
import {Coins, CoinsEnum} from '@/constants/Coins';
import {formatCurrency, formatNumber} from '@/utils/number';

interface CoinLineProps {
  coin: CoinsEnum;
  balance: number;
  totalQuantity: number;
}

export const CoinLine = React.memo(({coin, balance, totalQuantity}: CoinLineProps) => {
  return (
    <Link
      asChild
      href={{
        pathname: '/coin/[coinId]',
        params: {coinId: coin},
      }}>
      <TouchableOpacity>
        <View row centerV spread>
          <View row centerV gap-8>
            <CoinIcon coin={coin} size={40} />
            <Text text60BL>{Coins[coin].name}</Text>
          </View>
          <View right>
            <Text text70BL>{formatCurrency(balance)}</Text>
            <Text $textNeutral text80>
              {formatNumber(totalQuantity)} {coin}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
});
