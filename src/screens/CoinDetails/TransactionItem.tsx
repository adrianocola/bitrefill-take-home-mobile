import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import dayjs from 'dayjs';
import {Link} from 'expo-router';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import Animated, {FadeOut, LinearTransition} from 'react-native-reanimated';
import {Colors, Text, View} from 'react-native-ui-lib';

import {TransactionTypeEnum} from '@/db/schema';
import {useTransaction} from '@/db/Transaction';
import {formatCurrency, formatNumber} from '@/utils/number';

interface TransactionItemProps {
  transactionId: number;
}

export const TransactionItem = ({transactionId}: TransactionItemProps) => {
  const transaction = useTransaction(transactionId);

  if (!transaction) return null;

  const isBuy = transaction.type === TransactionTypeEnum.BUY;
  const textColor = isBuy ? Colors.$textSuccessLight : Colors.$textDangerLight;

  return (
    <Animated.View exiting={FadeOut} layout={LinearTransition.delay(200)}>
      <Link
        asChild
        href={{
          pathname: '/transaction/[transactionId]',
          params: {transactionId: transactionId},
        }}>
        <TouchableOpacity>
          <View row padding-10 centerV marginV-10 br20 spread bg-$backgroundElevated>
            <View>
              <MaterialIcons
                name={isBuy ? 'call-received' : 'call-made'}
                color={textColor}
                size={24}
              />
              <Text $textDisabled>{dayjs(transaction.date).format('l LT')}</Text>
            </View>
            <View right>
              <Text text70BL color={textColor}>
                {formatCurrency(transaction.quantity * transaction.pricePerCoin)}
              </Text>
              <Text text80 color={textColor}>
                {formatNumber(transaction.quantity)} {transaction.coin}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Link>
    </Animated.View>
  );
};
