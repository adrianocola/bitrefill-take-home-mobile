import FeatherIcon from '@expo/vector-icons/Feather';
import dayjs from 'dayjs';
import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {KeyboardAvoidingView, KeyboardAwareScrollView} from 'react-native-keyboard-controller';
import {Colors, DateTimePicker, FloatingButton, Text, TextField, View} from 'react-native-ui-lib';
import {Toast} from 'toastify-react-native';

import {CoinSelector} from '@/components/CoinSelector';
import {Screen} from '@/components/ui/Screen';
import {Cryptos, CryptosEnum, CryptoUsdPrices} from '@/constants/Cryptos';
import {addTransaction, TransactionTypeEnum} from '@/db/Transaction';
import {BuySellSwitch} from '@/screens/Transaction/BuySellSwitch';
import {validateIsNumber, validateMaxNumber, validateMaxPrecision} from '@/utils/validator';

import {FormLabel} from './FormLabel';

interface TransactionScreenProps {
  transactionId?: string;
  initialCoin?: CryptosEnum;
}

export function TransactionScreen({transactionId, initialCoin}: TransactionScreenProps) {
  const [coin, setCoin] = useState<CryptosEnum | undefined>(initialCoin);
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
    Toast.success('Transaction added!');
  };

  useEffect(() => {
    if (!coin) return;

    setPricePerCoin(`${CryptoUsdPrices[coin]}`);
  }, [coin]);

  return (
    <Screen>
      <KeyboardAvoidingView style={{flex: 1}} behavior="padding" keyboardVerticalOffset={70}>
        <KeyboardAwareScrollView contentContainerStyle={styles.content}>
          <View flex padding-20>
            <BuySellSwitch value={type} onChange={setType} />
            <View marginT-30 marginB-20>
              <CoinSelector value={coin} onChange={setCoin} />
            </View>
            <FormLabel label="Quantity" />
            <TextField
              value={quantity}
              placeholder={'Number of coins'}
              onChangeText={setQuantity}
              keyboardType={'numeric'}
              enableErrors
              validateOnChange
              onChangeValidity={setQuantityIsValid}
              trailingAccessory={coin ? <Text color={Cryptos[coin].color}>{coin}</Text> : undefined}
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
              placeholder={'Price at the time of transaction (in USD)'}
              onChangeText={setPricePerCoin}
              keyboardType={'numeric'}
              enableErrors
              validateOnChange
              leadingAccessory={
                <FeatherIcon
                  name="dollar-sign"
                  size={16}
                  color={Colors.$textNeutral}
                  style={styles.priceIcon}
                />
              }
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
                <DateTimePicker
                  value={date}
                  placeholder={'Date'}
                  mode="date"
                  onChange={setDate}
                  maximumDate={new Date()}
                />
                <View style={styles.rightIcon}>
                  <FeatherIcon name="calendar" size={20} color={Colors.$textDisabled} />
                </View>
              </View>
              <View flex>
                <DateTimePicker
                  value={time}
                  placeholder={'Time'}
                  mode="time"
                  onChange={setTime}
                  maximumDate={new Date()}
                  dateTimeFormatter={date => dayjs(date).format('HH:mm')}
                />
                <View style={styles.rightIcon}>
                  <FeatherIcon name="clock" size={20} color={Colors.$textDisabled} />
                </View>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
        <FloatingButton
          visible
          bottomMargin={50}
          fullWidth
          button={{
            label: `Add ${type} transaction`.toUpperCase(),
            animateLayout: true,
            backgroundColor: type === TransactionTypeEnum.BUY ? Colors.green10 : Colors.red10,
            color: Colors.$textDefault,
            onPress: onAddTransaction,
          }}
        />
      </KeyboardAvoidingView>
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
  priceIcon: {
    marginRight: 5,
  },
});
