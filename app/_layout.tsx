import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded, error] = useFonts({
        'Graphik-Regular': require('../assets/fonts/Graphik-Regular-Trial.otf'),
        'Graphik-Medium': require('../assets/fonts/Graphik-Medium-Trial.otf'),
    });

    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    if (!loaded && !error) {
        return null; // Or a custom loading view
    }

    return (
        <SafeAreaProvider>
            <Stack screenOptions={{ headerShown: false }} />
        </SafeAreaProvider>
    );
}
