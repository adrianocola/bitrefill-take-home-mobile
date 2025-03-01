import {useLocalSearchParams, useNavigation} from 'expo-router';
import {useEffect} from 'react';

import {Cryptos, CryptosEnum} from '@/constants/Cryptos';
import {CoinDetailsScreen} from '@/screens/CoinDetails';

export default function CryptoRoute() {
  const {coinId} = useLocalSearchParams<{coinId: CryptosEnum}>();

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({title: Cryptos[coinId].name});
  }, [coinId, navigation]);

  return <CoinDetailsScreen coin={coinId} />;
}
