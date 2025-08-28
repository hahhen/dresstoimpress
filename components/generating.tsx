import React from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import { useColorScheme } from '~/lib/useColorScheme';
import { NAV_THEME } from '~/lib/constants';
import { Text } from '~/components/ui/text';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';

const AnimatedGradient = Animated.createAnimatedComponent(LinearGradient);

export default function Generating() {
    const animatedValue = React.useRef(new Animated.Value(0)).current;

    const { isDarkColorScheme } = useColorScheme();
    const theme = isDarkColorScheme ? NAV_THEME.dark : NAV_THEME.light;

    const [visible, setVisible] = React.useState(true);

    React.useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(animatedValue, {
                    toValue: 1,
                    duration: 4000,
                    useNativeDriver: false,
                }),
                Animated.timing(animatedValue, {
                    toValue: 0,
                    duration: 4000,
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
            className='absolute top-0 left-0 right-0 bottom-0 flex-1 justify-center items-center'>
            <AnimatedGradient
                className={"justify-center items-center"}
                colors={[color1, color2]}
                style={[StyleSheet.absoluteFillObject]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}>

                {/* Your content goes here */}
                <Image style={{ width: 100, height: 100 }} source={require("assets/sparkles2.gif")} />
                <Text className='text-background'>Loading...</Text>
            </AnimatedGradient>
        </View>
    )
}