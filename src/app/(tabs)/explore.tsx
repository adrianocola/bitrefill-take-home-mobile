import {ScrollView, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {Screen} from '@/components/ui/Screen';
import {ThemedText} from '@/components/ui/ThemedText';

export default function TabTwoScreen() {
  return (
    <Screen>
      <ScrollView>
        <SafeAreaView>
          <View style={styles.titleContainer}>
            <ThemedText type="title">Explore</ThemedText>
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
