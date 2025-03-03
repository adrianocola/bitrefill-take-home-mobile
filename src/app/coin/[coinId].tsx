import FeatherIcons from '@expo/vector-icons/Feather';
import {Link, useLocalSearchParams, useNavigation} from 'expo-router';
import {useEffect} from 'react';
import {TouchableOpacity} from 'react-native';
import {Colors} from 'react-native-ui-lib';

import {Coins, CoinsEnum} from '@/constants/Coins';
import {NEW_TRANSACTION_ID} from '@/constants/Consts';
import {CoinDetailsScreen} from '@/screens/CoinDetails';

export default function CoinRoute() {
  const navigation = useNavigation();

  const {coinId} = useLocalSearchParams<{coinId: CoinsEnum}>();

  useEffect(() => {
    navigation.setOptions({
      title: Coins[coinId].name,
      headerRight: () => (
        <Link
          asChild
          href={{
            pathname: '/transaction/[transactionId]',
            params: {transactionId: NEW_TRANSACTION_ID, coin: coinId},
          }}>
          <TouchableOpacity>
            <FeatherIcons name="plus" size={28} color={Colors.$textDefault} />
          </TouchableOpacity>
        </Link>
      ),
    });
  }, [coinId, navigation]);

  return <CoinDetailsScreen coin={coinId} />;
}
