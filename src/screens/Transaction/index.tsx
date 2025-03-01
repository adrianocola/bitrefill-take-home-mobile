import FeatherIcon from '@expo/vector-icons/Feather';
import dayjs from 'dayjs';
import {useNavigation} from 'expo-router';
import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-controller';
import {
  Button,
  Colors,
  DateTimePicker,
  SegmentedControl,
  TextField,
  View,
} from 'react-native-ui-lib';
import {Toast} from 'toastify-react-native';

import {CoinSelector} from '@/components/CoinSelector';
import {Screen} from '@/components/ui/Screen';
import {CryptosEnum, CryptoUsdPrices} from '@/constants/Cryptos';
import {addTransaction, TransactionTypeEnum} from '@/db/Transaction';
import {validateIsNumber, validateMaxNumber, validateMaxPrecision} from '@/utils/validator';

import {FormLabel} from './FormLabel';

interface TransactionScreenProps {
  transactionId?: string;
  coin?: CryptosEnum;
}

export function TransactionScreen({transactionId}: TransactionScreenProps) {
  const navigation = useNavigation();
  const [coin, setCoin] = useState<CryptosEnum>();
  const [quantity, setQuantity] = useState('');
  const [pricePerCoin, setPricePerCoin] = useState('');
  const [type, setType] = useState<TransactionTypeEnum>(TransactionTypeEnum.BUY);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());

  const [quantityIsValid, setQuantityIsValid] = useState(false);
  const [pricePerCoinIsValid, setPricePerCoinIsValid] = useState(false);

  const canSubmit = coin && quantityIsValid && pricePerCoinIsValid && date && time;

  const onAddTransaction = async () => {
    if (!canSubmit) return;

    const tDate = dayjs(date)
      .set('hour', time.getHours())
      .set('minute', time.getMinutes())
      .set('second', time.getSeconds())
      .toDate();

    await addTransaction({
      coin,
      quantity: (type === TransactionTypeEnum.BUY ? 1 : -1) * parseFloat(quantity),
      pricePerCoin: parseFloat(quantity),
      type,
      date: tDate,
    });
    navigation.goBack();
    Toast.success('Transaction saved!');
  };

  const onUpdateType = (index: number) => {
    setType(index === 0 ? TransactionTypeEnum.BUY : TransactionTypeEnum.SELL);
  };

  useEffect(() => {
    if (!coin) return;

    setPricePerCoin(`${CryptoUsdPrices[coin]}`);
  }, [coin]);

  return (
    <Screen>
      <KeyboardAwareScrollView contentContainerStyle={styles.content}>
        <View flex padding-20>
          <SegmentedControl
            initialIndex={type === TransactionTypeEnum.BUY ? 0 : 1}
            activeBackgroundColor={type === TransactionTypeEnum.BUY ? Colors.green10 : Colors.red10}
            activeColor={Colors.$textDefault}
            onChangeIndex={onUpdateType}
            segments={[{label: 'BUY'}, {label: 'SELL'}]}
          />
          <View marginT-30 marginB-20>
            <CoinSelector value={coin} onChange={setCoin} />
          </View>
          <FormLabel label="Quantity" />
          <TextField
            value={quantity}
            placeholder={'Number of coins/tokens'}
            onChangeText={setQuantity}
            keyboardType={'numeric'}
            enableErrors
            validateOnChange
            onChangeValidity={setQuantityIsValid}
            validate={[
              validateIsNumber.validator,
              validateMaxNumber.validator,
              validateMaxPrecision.validator,
            ]}
            validationMessage={[
              validateIsNumber.message,
              validateMaxNumber.message,
              validateMaxPrecision.message,
            ]}
          />
          <FormLabel label="Price Per Coin" />
          <TextField
            value={pricePerCoin}
            placeholder={'Amount in USD paid per coin/token'}
            onChangeText={setPricePerCoin}
            keyboardType={'numeric'}
            enableErrors
            validateOnChange
            onChangeValidity={setPricePerCoinIsValid}
            validate={[
              validateIsNumber.validator,
              validateMaxNumber.validator,
              validateMaxPrecision.validator,
            ]}
            validationMessage={[
              validateIsNumber.message,
              validateMaxNumber.message,
              validateMaxPrecision.message,
            ]}
          />
          <View row gap-10 marginB-20>
            <View flex>
              <DateTimePicker value={date} placeholder={'Date'} mode="date" onChange={setDate} />
              <View style={styles.rightIcon}>
                <FeatherIcon name="calendar" size={20} color={Colors.$textDisabled} />
              </View>
            </View>
            <View flex>
              <DateTimePicker value={time} placeholder={'Time'} mode="time" onChange={setTime} />
              <View style={styles.rightIcon}>
                <FeatherIcon name="clock" size={20} color={Colors.$textDisabled} />
              </View>
            </View>
          </View>
          <Button
            marginT-20
            label={`Add ${type} transaction`.toUpperCase()}
            animateLayout
            disabled={!canSubmit}
            backgroundColor={type === TransactionTypeEnum.BUY ? Colors.green10 : Colors.red10}
            color={Colors.$textDefault}
            onPress={onAddTransaction}
          />
        </View>
      </KeyboardAwareScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    marginVertical: 20,
  },
  rightIcon: {
    position: 'absolute',
    right: 10,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
