import React from 'react';
import {StyleSheet} from 'react-native';
import {Chip, Colors} from 'react-native-ui-lib';

import {Cryptos, CryptosEnum} from '@/constants/Cryptos';

interface CryptoChipProps {
  coin?: CryptosEnum;
  percentage: number;
}

export const CryptoChip = ({coin, percentage}: CryptoChipProps) => {
  if (!percentage) return null;

  return (
    <Chip
      label={`${coin ?? 'Other'}: ${Math.round(percentage)}%`}
      containerStyle={styles.container}
      backgroundColor={coin ? Cryptos[coin].color : Colors.grey20}
      labelStyle={{color: (coin ? Cryptos[coin].textColor : undefined) ?? Colors.white}}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: StyleSheet.hairlineWidth,
  },
});
