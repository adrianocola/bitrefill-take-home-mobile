import React from 'react';

import {useTransaction} from '@/db/Transaction';

import {TransactionScreen} from './index';

interface TransactionLoaderProps {
  transactionId: number;
}

export const TransactionLoader = ({transactionId}: TransactionLoaderProps) => {
  const transaction = useTransaction(transactionId);

  if (!transaction) return;

  return <TransactionScreen transactionId={transactionId} transaction={transaction} />;
};
