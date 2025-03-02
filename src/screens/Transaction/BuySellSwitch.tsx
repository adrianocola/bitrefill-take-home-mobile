import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, {useEffect} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Animated, {
  Easing,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Colors, Text, View} from 'react-native-ui-lib';

import {TransactionTypeEnum} from '@/db/Transaction';

const AnimatedView = Animated.createAnimatedComponent(View);

interface BuySellSwitchProps {
  value: TransactionTypeEnum;
  onChange: (value: TransactionTypeEnum) => void;
}

export const BuySellSwitch = ({value, onChange}: BuySellSwitchProps) => {
  const position = useSharedValue(value === TransactionTypeEnum.BUY ? 0 : 1);
  const width = useSharedValue(0);
  const green = useSharedValue(Colors.green10);
  const red = useSharedValue(Colors.red10);

  const animatedStyles = useAnimatedStyle(() => ({
    left: interpolate(position.value, [0, 1], [0, width.value / 2]),
    backgroundColor: interpolateColor(position.value, [0, 1], [green.value, red.value]),
  }));

  useEffect(() => {
    position.value = withTiming(value === TransactionTypeEnum.BUY ? 0 : 1, {
      duration: 200,
      easing: Easing.linear,
    });
  }, [position, value]);

  return (
    <View
      row
      width="100%"
      height={50}
      br30
      bg-$backgroundElevated
      style={styles.container}
      onLayout={({nativeEvent}) => (width.value = nativeEvent.layout.width)}>
      <TouchableOpacity style={styles.item} onPress={() => onChange(TransactionTypeEnum.BUY)}>
        <View flex row center gap-4>
          <MaterialIcons name="call-received" color={Colors.$textNeutral} size={24} />
          <Text text80 color={Colors.$textNeutral}>
            BUY
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={() => onChange(TransactionTypeEnum.SELL)}>
        <View flex row center gap-4>
          <MaterialIcons name="call-made" color={Colors.$textNeutral} size={24} />
          <Text color={Colors.$textNeutral}>SELL</Text>
        </View>
      </TouchableOpacity>
      <AnimatedView
        absH
        height="100%"
        width="50%"
        row
        center
        gap-4
        backgroundColor="rgba(255,255,255,0.5)"
        style={animatedStyles}>
        <MaterialIcons
          name={value === TransactionTypeEnum.BUY ? 'call-received' : 'call-made'}
          color={Colors.$textDefault}
          size={24}
        />
        <Text text80BL>{value === TransactionTypeEnum.BUY ? 'BUY' : 'SELL'}</Text>
      </AnimatedView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.$textDefault,
  },
  item: {
    flex: 1,
  },
});
