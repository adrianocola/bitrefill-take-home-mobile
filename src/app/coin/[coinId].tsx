import FeatherIcons from '@expo/vector-icons/Feather';
import {Link, useLocalSearchParams, useNavigation} from 'expo-router';
import {useEffect} from 'react';
import {TouchableOpacity} from 'react-native';
import {Colors} from 'react-native-ui-lib';

import {NEW_TRANSACTION_ID} from '@/constants/Consts';
import {Cryptos, CryptosEnum} from '@/constants/Cryptos';
import {CoinDetailsScreen} from '@/screens/CoinDetails';

export default function CryptoRoute() {
  const {coinId} = useLocalSearchParams<{coinId: CryptosEnum}>();

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: Cryptos[coinId].name,
      headerRight: () => (
        <Link
          asChild
          href={{
            pathname: '/transaction/[transactionId]',
            params: {transactionId: NEW_TRANSACTION_ID, coin: coinId},
          }}>
          <TouchableOpacity>
            <FeatherIcons name="plus" size={32} color={Colors.$textDefault} />
          </TouchableOpacity>
        </Link>
      ),
    });
  }, [coinId, navigation]);

  return <CoinDetailsScreen coin={coinId} />;
}
