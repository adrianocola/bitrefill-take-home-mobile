import {useLocalSearchParams} from 'expo-router';

import {CryptosEnum} from '@/constants/Cryptos';
import {CoinDetailsScreen} from '@/screens/CoinDetails';

export default function CryptoRoute() {
  const {coinId} = useLocalSearchParams<{coinId: CryptosEnum}>();
  return <CoinDetailsScreen coinId={coinId} />;
}
