import {DarkTheme, ThemeProvider} from '@react-navigation/native';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import {useFonts} from 'expo-font';
import {Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {StatusBar} from 'expo-status-bar';
import {Platform} from 'react-native';
import {KeyboardProvider} from 'react-native-keyboard-controller';
import {Colors} from 'react-native-ui-lib';
import ToastManager from 'toastify-react-native';
import 'react-native-reanimated';

import {DatabaseProvider} from '@/db/DatabaseProvider';

import '@/theme';

dayjs.extend(localizedFormat);

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const onDbInit = async () => {
    return SplashScreen.hideAsync();
  };

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={DarkTheme}>
      <KeyboardProvider>
        <DatabaseProvider onInit={onDbInit}>
          <Stack
            screenOptions={{
              headerBackButtonDisplayMode: 'minimal',
              headerTintColor: Colors.$textDefault,
              headerStyle: {
                backgroundColor: Colors.$backgroundDefault,
              },
            }}>
            <Stack.Screen name="index" options={{headerShown: false}} />
            <Stack.Screen
              name="transaction/[transactionId]"
              options={{
                headerTitle: 'Add Transaction',
              }}
            />
            <Stack.Screen
              name="coin/[coinId]"
              options={{
                headerBlurEffect: 'regular',
                headerTransparent: Platform.OS === 'ios',
              }}
            />
            <Stack.Screen
              name="debug"
              options={{
                headerTitle: 'Debug',
              }}
            />
          </Stack>
          <StatusBar style="auto" />
        </DatabaseProvider>
      </KeyboardProvider>
      <ToastManager theme="dark" />
    </ThemeProvider>
  );
}
