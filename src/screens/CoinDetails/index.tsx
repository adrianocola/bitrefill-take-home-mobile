import {ScrollView, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Text} from 'react-native-ui-lib';

import {Screen} from '@/components/ui/Screen';

interface CoinDetailsScreenProps {
  coinId?: string;
}

export function CoinDetailsScreen({coinId}: CoinDetailsScreenProps) {
  return (
    <Screen>
      <ScrollView>
        <SafeAreaView>
          <View style={styles.titleContainer}>
            <Text>Coin: {coinId ?? 'N/A'}</Text>
          </View>
        </SafeAreaView>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
