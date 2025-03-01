import {useLocalSearchParams} from 'expo-router';

import {NEW_TRANSACTION_ID} from '@/constants/Consts';
import {TransactionScreen} from '@/screens/Transaction';

export default function TransactionRoute() {
  const {transactionId} = useLocalSearchParams<{transactionId?: string}>();

  return (
    <TransactionScreen
      transactionId={transactionId === NEW_TRANSACTION_ID ? undefined : transactionId}
    />
  );
}
