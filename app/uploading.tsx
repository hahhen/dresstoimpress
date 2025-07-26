import { useRef, useEffect } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useColorScheme } from '~/lib/useColorScheme';
import { NAV_THEME } from '~/lib/constants';
import { Text } from '~/components/ui/text';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Create an animatable component from LinearGradient
const AnimatedGradient = Animated.createAnimatedComponent(LinearGradient);

export default function Uploading() {
    // 1. Set up the animated value
    const animatedValue = useRef(new Animated.Value(0)).current;

    const { isDarkColorScheme } = useColorScheme();
    const theme = isDarkColorScheme ? NAV_THEME.dark : NAV_THEME.light;

    const insets = useSafeAreaInsets();


    // 2. Start the animation loop in useEffect
    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(animatedValue, {
                    toValue: 1,
                    duration: 4000, // Duration of the first part of the animation
                    useNativeDriver: false, // Colors cannot be animated with native driver
                }),
                Animated.timing(animatedValue, {
                    toValue: 0,
                    duration: 4000, // Duration of the second part of the animation
                    useNativeDriver: false,
                }),
            ]),
        ).start();
    }, [animatedValue]);

    // 3. Interpolate the colors
    // This maps the animatedValue (0 to 1) to a range of colors.
    const color1 = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [theme.background, theme.primary], // Dark Blue to Dark Green
    });

    const color2 = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [theme.primary, theme.background], // Dark Green to Dark Blue
    });

    return (
        <View
            className='flex-1 justify-center items-center'>
            <AnimatedGradient
                className={"justify-center items-center"}
                colors={[color1, color2]}
                style={[StyleSheet.absoluteFillObject,
                {
                    marginTop: -insets.top,
                    marginBottom: -insets.bottom,
                    marginLeft: -insets.left,
                    marginRight: -insets.right,
                },
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}>

                {/* Your content goes here */}
                <Text className='text-secondary'>Uploading...</Text>
            </AnimatedGradient>
        </View>
    );
};