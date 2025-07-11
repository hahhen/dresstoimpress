import { Stack } from 'expo-router';
import { Theme, ThemeProvider, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Platform, View } from 'react-native';
import * as React from 'react';
import { useColorScheme } from '~/lib/useColorScheme';
import { NAV_THEME } from '~/lib/constants';
import "../global.css"
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Inter_400Regular, Inter_600SemiBold, useFonts } from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';
import { Text } from '~/components/ui/text';
import { PortalHost } from '@rn-primitives/portal';

SplashScreen.preventAutoHideAsync();

const LIGHT_THEME: Theme = {
    ...DefaultTheme,
    colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
    ...DarkTheme,
    colors: NAV_THEME.dark,
};

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from 'expo-router';

export default function RootLayout() {
    const [loaded, error] = useFonts({
        Inter_400Regular,
        Inter_600SemiBold,
    });
    const hasMounted = React.useRef(false);
    const insets = useSafeAreaInsets();
    const { colorScheme, isDarkColorScheme } = useColorScheme();
    const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);

    useIsomorphicLayoutEffect(() => {
        if (hasMounted.current) {
            return;
        }

        if (Platform.OS === 'web') {
            // Adds the background color to the html element to prevent white background on overscroll.
            document.documentElement.classList.add('bg-background');
        }
        setIsColorSchemeLoaded(true);
        hasMounted.current = true;
    }, []);

    React.useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    if (!loaded && !error) {
        return null;
    }

    if (!isColorSchemeLoaded) {
        return null;
    }

    return (
        <>
            <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
                <StatusBar style={isDarkColorScheme ? 'light' : 'dark'}
                />
                <SafeAreaView className='flex-1 bg-background px-7'>
                    <Stack
                    // screenOptions={{
                    //     headerShown: false,
                    // }}
                    >
                        <Stack.Screen name="auth" />
                        <Stack.Screen options={{
                            header(props) {
                                return (
                                    <View className='h-16 flex flex-row items-center justify-between'>
                                        <Text className='text-muted'>tiny closet</Text>
                                        <View className='bg-secondary rounded-full w-12 h-12'></View>
                                    </View>
                                )
                            },
                        }} name="(tabs)" />

                    </Stack>
                </SafeAreaView>
            </ThemeProvider>
            <PortalHost />
        </>
    )
}

const useIsomorphicLayoutEffect =
    Platform.OS === 'web' && typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect;