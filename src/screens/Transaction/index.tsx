import FeatherIcon from '@expo/vector-icons/Feather';
import dayjs from 'dayjs';
import {useNavigation} from 'expo-router';
import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {KeyboardAvoidingView, KeyboardAwareScrollView} from 'react-native-keyboard-controller';
import {Colors, DateTimePicker, FloatingButton, Text, TextField, View} from 'react-native-ui-lib';
import {Toast} from 'toastify-react-native';

import {CoinSelector} from '@/components/CoinSelector';
import {Screen} from '@/components/Screen';
import {Coins, CoinsEnum, CoinUsdPrices} from '@/constants/Coins';
import {
  addTransaction,
  deleteTransaction,
  Transaction,
  TransactionTypeEnum,
  updateTransaction,
} from '@/db/Transaction';
import {BuySellSwitch} from '@/screens/Transaction/BuySellSwitch';
import {validateIsNumber, validateMaxNumber, validateMaxPrecision} from '@/utils/validator';

import {FormLabel} from './FormLabel';

interface TransactionScreenProps {
  transactionId?: number;
  transaction?: Transaction;
  initialCoin?: CoinsEnum;
}

export function TransactionScreen({
  transactionId,
  transaction,
  initialCoin,
}: TransactionScreenProps) {
  const navigation = useNavigation();
  const [coin, setCoin] = useState<CoinsEnum | undefined>(transaction?.coin ?? initialCoin);
  const [quantity, setQuantity] = useState(
    transaction?.quantity ? Math.abs(transaction?.quantity).toString() : '',
  );
  const [pricePerCoin, setPricePerCoin] = useState(() => {
    if (transaction?.pricePerCoin) return transaction?.pricePerCoin.toString();
    if (initialCoin) return `${CoinUsdPrices[initialCoin]}`;

    return '';
  });
  const [type, setType] = useState<TransactionTypeEnum>(
    transaction?.type ?? TransactionTypeEnum.BUY,
  );
  const [date, setDate] = useState(transaction?.date ?? new Date());
  const [time, setTime] = useState(transaction?.date ?? new Date());

  const [quantityIsValid, setQuantityIsValid] = useState(!!quantity);
  const [pricePerCoinIsValid, setPricePerCoinIsValid] = useState(!!pricePerCoin);

  const canSubmit = coin && quantityIsValid && pricePerCoinIsValid && date && time;

  let buttonColor = type === TransactionTypeEnum.BUY ? Colors.green10 : Colors.red10;
  let buttonTextColor = Colors.$textDefault;
  if (transactionId) {
    buttonColor = Colors.white;
    buttonTextColor = Colors.$backgroundNeutral;
  }

  const onCoinUpdated = (newCoin?: CoinsEnum) => {
    setCoin(newCoin);
    setPricePerCoin(newCoin ? `${CoinUsdPrices[newCoin]}` : '');
  };

  const onSaveTransaction = async () => {
    if (!canSubmit) return;

    const tDate = dayjs(date)
      .set('hour', time.getHours())
      .set('minute', time.getMinutes())
      .set('second', time.getSeconds())
      .toDate();

    const transactionData = {
      coin,
      quantity: (type === TransactionTypeEnum.BUY ? 1 : -1) * parseFloat(quantity),
      pricePerCoin: parseFloat(pricePerCoin),
      type,
      date: tDate,
    };

    if (transactionId) {
      await updateTransaction(transactionId, transactionData);
    } else {
      await addTransaction(transactionData);
    }
    Toast.success(transactionId ? 'Transaction updated!' : 'Transaction added!');
  };

  const onDeleteTransaction = async () => {
    if (!transactionId) return;

    // TODO confirm before deleting
    await deleteTransaction(transactionId);
    Toast.success('Transaction deleted!');
    navigation.goBack();
  };

  return (
    <Screen>
      <KeyboardAvoidingView style={{flex: 1}} behavior="padding" keyboardVerticalOffset={70}>
        <KeyboardAwareScrollView contentContainerStyle={styles.content}>
          <View flex padding-20>
            <BuySellSwitch value={type} onChange={setType} />
            <View marginT-30 marginB-20>
              <CoinSelector value={coin} onChange={onCoinUpdated} />
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
              trailingAccessory={coin ? <Text color={Coins[coin].color}>{coin}</Text> : undefined}
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
            {!!transactionId && (
              <TouchableOpacity onPress={onDeleteTransaction}>
                <View row center gap-5 marginT-20>
                  <FeatherIcon name="trash" size={20} color={Colors.$textDangerLight} />
                  <Text $textDangerLight>Delete transaction</Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
        </KeyboardAwareScrollView>
        <FloatingButton
          visible
          bottomMargin={50}
          fullWidth
          button={{
            label: transactionId ? 'Update transaction' : `Add ${type} transaction`.toUpperCase(),
            animateLayout: true,
            backgroundColor: buttonColor,
            color: buttonTextColor,
            disabled: !canSubmit,
            onPress: onSaveTransaction,
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
