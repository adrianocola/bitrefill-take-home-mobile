import FeatherIcons from '@expo/vector-icons/Feather';
import React from 'react';
import {StyleSheet} from 'react-native';
import {Colors, Picker, PickerProps, Text, View} from 'react-native-ui-lib';

import {IconCrypto} from '@/components/ui/IconCrypto';
import {CryptosEnum} from '@/constants/Cryptos';

interface CoinSelectorProps {
  value?: CryptosEnum;
  onChange?: (value?: CryptosEnum) => void;
}

export const CoinSelector = React.memo(({value, onChange}: CoinSelectorProps) => {
  const renderPicker: PickerProps['renderPicker'] = (
    selectedItem?: CryptosEnum,
    itemLabel?: string,
  ) => {
    if (!selectedItem) {
      return (
        <View row spread centerV style={styles.picker}>
          <Text style={{color: Colors.grey40}}>Select a coin</Text>
          <FeatherIcons name="chevron-down" size={32} color={Colors.$textDisabled} />
        </View>
      );
    }

    return (
      <View row spread centerV style={styles.picker}>
        <View row centerV gap-10>
          <IconCrypto crypto={selectedItem} />
          <Text>{itemLabel}</Text>
        </View>
        <FeatherIcons name="chevron-down" size={32} color={Colors.$textDisabled} />
      </View>
    );
  };

  const renderItem: PickerProps['renderItem'] = (value, props, itemLabel) => {
    return (
      <View>
        <View row padding-10 centerV gap-10>
          <IconCrypto crypto={value as CryptosEnum} />
          <Text>{itemLabel}</Text>
        </View>
        <View height={1} style={styles.divider} />
      </View>
    );
  };

  return (
    <Picker
      useSafeArea
      value={value}
      placeholder={'Select Coin'}
      topBarProps={{title: 'Coins'}}
      renderPicker={renderPicker}
      renderItem={renderItem}
      onChange={newValue => onChange?.(newValue as CryptosEnum)}>
      {Object.values(CryptosEnum).map(crypto => (
        <Picker.Item key={crypto} label={crypto} value={crypto} />
      ))}
    </Picker>
  );
});

const styles = StyleSheet.create({
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.grey10,
  },
  picker: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.white,
    padding: 10,
  },
});
