import {useLocalSearchParams} from 'expo-router';

import {TransactionScreen} from '@/screens/Transaction';

const EMPTY_TRANSACTION_ID = '[transactionId]';

export default function TransactionRoute() {
  const {transactionId} = useLocalSearchParams<{transactionId?: string}>();

  return (
    <TransactionScreen
      transactionId={transactionId === EMPTY_TRANSACTION_ID ? undefined : transactionId}
    />
  );
}
