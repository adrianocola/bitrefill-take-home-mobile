import FontAwesomeIcons from '@expo/vector-icons/FontAwesome';
import {Link, useLocalSearchParams, useNavigation} from 'expo-router';
import {useEffect} from 'react';
import {TouchableOpacity} from 'react-native';
import {Colors} from 'react-native-ui-lib';

import {NEW_TRANSACTION_ID} from '@/constants/Consts';
import {CryptosEnum} from '@/constants/Cryptos';
import {TransactionScreen} from '@/screens/Transaction';

export default function TransactionRoute() {
  const navigation = useNavigation();

  const {transactionId, coin} = useLocalSearchParams<{
    transactionId?: string;
    coin?: CryptosEnum;
  }>();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Link asChild href="/debug">
          <TouchableOpacity hitSlop={10}>
            <FontAwesomeIcons name="bug" size={20} color={Colors.$textDanger} />
          </TouchableOpacity>
        </Link>
      ),
    });
  }, [navigation]);

  return (
    <TransactionScreen
      transactionId={transactionId === NEW_TRANSACTION_ID ? undefined : transactionId}
      initialCoin={coin}
    />
  );
}
