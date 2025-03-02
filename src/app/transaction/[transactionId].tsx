import {useLocalSearchParams} from 'expo-router';

import {NEW_TRANSACTION_ID} from '@/constants/Consts';
import {CryptosEnum} from '@/constants/Cryptos';
import {TransactionScreen} from '@/screens/Transaction';

export default function TransactionRoute() {
  const {transactionId, coin} = useLocalSearchParams<{
    transactionId?: string;
    coin?: CryptosEnum;
  }>();

  console.log('coin', coin);

  return (
    <TransactionScreen
      transactionId={transactionId === NEW_TRANSACTION_ID ? undefined : transactionId}
      initialCoin={coin}
    />
  );
}
