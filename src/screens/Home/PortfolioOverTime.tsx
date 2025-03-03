import FeatherIcons from '@expo/vector-icons/Feather';
import dayjs from 'dayjs';
import {lineDataItem} from 'gifted-charts-core';
import React, {useMemo, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {LineChart} from 'react-native-gifted-charts';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Colors, Text, View} from 'react-native-ui-lib';

import {CoinsEnum} from '@/constants/Coins';
import {Transaction} from '@/db/Transaction';

const LABELS_WIDTH = 40;
const X_POINTS = 10;

const formatNumber = (value: number) => {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 100_000) return `${(value / 1_000).toFixed(0)}K`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
  return value.toString();
};

interface PortfolioOverTimeProps {
  allTransactions: Transaction[];
}

export const PortfolioOverTime = ({allTransactions}: PortfolioOverTimeProps) => {
  const [width, setWidth] = useState(0);
  const animatedValue = useSharedValue(0);

  const toggleChartView = () => {
    animatedValue.value = withTiming(animatedValue.value === 1 ? 0 : 1, {duration: 500});
  };

  const chartAnimatedStyle = useAnimatedStyle(() => ({
    height: interpolate(animatedValue.value, [0, 1], [0, 175]),
    opacity: animatedValue.value,
  }));

  const iconAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{rotate: `${interpolate(animatedValue.value, [0, 1], [0, 180])}deg`}],
  }));

  const chartData = useMemo(() => {
    if (!allTransactions.length) return [];

    const data: lineDataItem[] = [];
    const first = allTransactions[0];
    const endDate = dayjs().endOf('day');
    const hoursDiff = endDate.diff(dayjs(first.date), 'hour');
    const timeFormat = hoursDiff < 300 * 24 ? 'D MMM' : 'MMM YY';
    const hoursPeriod = hoursDiff / X_POINTS;

    const coinsPrice: Partial<Record<CoinsEnum, number>> = {};
    const coinsBalance: Partial<Record<CoinsEnum, number>> = {};
    let refDate = dayjs(first.date).add(hoursPeriod, 'hour');
    let tIndex = 0;

    while (refDate.isBefore(endDate)) {
      for (; tIndex < allTransactions.length; tIndex++) {
        const transaction = allTransactions[tIndex];

        if (dayjs(transaction.date).isAfter(refDate)) break;

        coinsBalance[transaction.coin] =
          (coinsBalance[transaction.coin] || 0) + transaction.quantity;
        coinsPrice[transaction.coin] = transaction.pricePerCoin;
      }

      const value = Object.entries(coinsBalance).reduce(
        (acc, [coin, balance]) => acc + balance * (coinsPrice[coin as CoinsEnum] ?? 0),
        0,
      );
      data.push({value, label: refDate.format(timeFormat)});
      refDate = refDate.add(hoursPeriod, 'hour');
    }

    return data;
  }, [allTransactions]);

  const chartWidth = width - 2 * LABELS_WIDTH;
  const spacing = chartData.length > 1 ? chartWidth / (chartData.length + 1) : chartWidth;
  const maxValue = Math.max(...chartData.map(item => item.value ?? 0));

  return (
    <View
      marginT-20
      width="100%"
      onLayout={({nativeEvent}) => setWidth(nativeEvent.layout.width)}
      style={{overflow: 'hidden'}}>
      <Animated.View style={[chartAnimatedStyle]}>
        <LineChart
          data={chartData}
          width={chartWidth}
          height={100}
          maxValue={maxValue * 1.1}
          spacing={spacing}
          disableScroll
          hideDataPoints
          rotateLabel
          showVerticalLines
          noOfSections={5}
          rulesType="solid"
          yAxisLabelWidth={LABELS_WIDTH}
          color={Colors.$textDefault}
          dataPointsColor={Colors.$textDefault}
          yAxisColor={Colors.$textDefault}
          xAxisColor={Colors.$textDefault}
          yAxisTextStyle={{color: Colors.$textDefault, fontSize: 12}}
          rulesColor="rgba(255,255,255,0.05)"
          verticalLinesColor="rgba(255,255,255,0.05)"
          formatYLabel={value => formatNumber(parseFloat(value))}
          xAxisLabelsHeight={50}
          xAxisLabelTextStyle={{
            color: Colors.$textDefault,
            fontSize: 12,
            textAlign: 'left',
            width: 50,
            top: 25,
            left: 25,
          }}
        />
      </Animated.View>
      <TouchableOpacity onPress={toggleChartView}>
        <View row flex center>
          <Text>Balance over time</Text>
          <Animated.View style={iconAnimatedStyle}>
            <FeatherIcons name="chevron-down" size={24} color={Colors.$textDefault} />
          </Animated.View>
        </View>
      </TouchableOpacity>
    </View>
  );
};
