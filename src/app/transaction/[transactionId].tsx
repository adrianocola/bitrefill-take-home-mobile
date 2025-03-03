import FontAwesomeIcons from '@expo/vector-icons/FontAwesome';
import {Link, useLocalSearchParams, useNavigation} from 'expo-router';
import {useEffect} from 'react';
import {TouchableOpacity} from 'react-native';
import {Colors} from 'react-native-ui-lib';

import {CoinsEnum} from '@/constants/Coins';
import {NEW_TRANSACTION_ID} from '@/constants/Consts';
import {TransactionScreen} from '@/screens/Transaction';
import {TransactionLoader} from '@/screens/Transaction/TransactionLoader';

export default function TransactionRoute() {
  const navigation = useNavigation();

  const {transactionId, coin} = useLocalSearchParams<{
    transactionId?: string;
    coin?: CoinsEnum;
  }>();

  const editTransaction = !!transactionId && transactionId !== NEW_TRANSACTION_ID;

  useEffect(() => {
    navigation.setOptions({
      headerBackButtonDisplayMode: editTransaction || coin ? 'default' : 'minimal',
      headerTitle: editTransaction ? 'Edit Transaction' : 'Add Transaction',
      headerRight: () => (
        <Link asChild href="/debug">
          <TouchableOpacity hitSlop={10}>
            <FontAwesomeIcons name="bug" size={20} color={Colors.$textDanger} />
          </TouchableOpacity>
        </Link>
      ),
    });
  }, [editTransaction, navigation]);

  if (editTransaction) {
    return <TransactionLoader transactionId={parseInt(transactionId, 10)} />;
  }

  return <TransactionScreen initialCoin={coin} />;
}
