import React from 'react';
import {StyleSheet} from 'react-native';
import {Chip, Colors} from 'react-native-ui-lib';

import {Coins, CoinsEnum} from '@/constants/Coins';

interface CoinChipProps {
  coin?: CoinsEnum;
  percentage: number;
}

export const CoinChip = ({coin, percentage}: CoinChipProps) => {
  if (!percentage) return null;

  return (
    <Chip
      label={`${coin ?? 'Other'}: ${Math.round(percentage)}%`}
      containerStyle={styles.container}
      backgroundColor={coin ? Coins[coin].color : Colors.grey20}
      labelStyle={{color: (coin ? Coins[coin].textColor : undefined) ?? Colors.white}}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: StyleSheet.hairlineWidth,
  },
});
