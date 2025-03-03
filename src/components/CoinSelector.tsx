import FeatherIcons from '@expo/vector-icons/Feather';
import React from 'react';
import {StyleSheet} from 'react-native';
import {Colors, Picker, PickerProps, Text, View} from 'react-native-ui-lib';

import {CoinIcon} from '@/components/CoinIcon';
import {CoinsEnum} from '@/constants/Coins';

interface CoinSelectorProps {
  value?: CoinsEnum;
  onChange?: (value?: CoinsEnum) => void;
}

export const CoinSelector = React.memo(({value, onChange}: CoinSelectorProps) => {
  const renderInput: PickerProps['renderInput'] = (
    selectedItem?: CoinsEnum,
    itemLabel?: string,
  ) => {
    if (!selectedItem) {
      return (
        <View row spread centerV style={styles.picker} bg-$backgroundNeutralLight>
          <Text style={{color: Colors.grey40}}>Select a coin</Text>
          <FeatherIcons name="chevron-down" size={32} color={Colors.$textDisabled} />
        </View>
      );
    }

    return (
      <View row spread centerV style={styles.picker} bg-$backgroundNeutralLight>
        <View row centerV gap-10>
          <CoinIcon coin={selectedItem} />
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
          <CoinIcon coin={value as CoinsEnum} />
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
      renderInput={renderInput}
      renderItem={renderItem}
      onChange={newValue => onChange?.(newValue as CoinsEnum)}>
      {Object.values(CoinsEnum).map(coin => (
        <Picker.Item key={coin} label={coin} value={coin} />
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
