import React, { useRef, useEffect } from 'react';
import { StyleSheet, View, Animated, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useColorScheme } from '~/lib/useColorScheme';
import { NAV_THEME } from '~/lib/constants';
import { Text } from '~/components/ui/text';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { atom, PrimitiveAtom, useAtom, useAtomValue } from 'jotai';
import { clothesForUploadAtom, clothesForUploadValuesAtom } from '~/lib/atoms';
import { functions } from '~/lib/client';
import { ItemType } from '~/components/draggableItem';
import { router } from 'expo-router';
import { generateImages } from '~/lib/utils';

// Create an animatable component from LinearGradient
const AnimatedGradient = Animated.createAnimatedComponent(LinearGradient);

export default function Uploading() {
    // 1. Set up the animated value
    const animatedValue = useRef(new Animated.Value(0)).current;

    const { isDarkColorScheme } = useColorScheme();
    const theme = isDarkColorScheme ? NAV_THEME.dark : NAV_THEME.light;

    const [visible, setVisible] = React.useState(true);


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




    const [itemsForUploadAtom, setItemsForUploadAtom] = useAtom(clothesForUploadAtom);
    const itemsForUpload = useAtomValue(clothesForUploadValuesAtom);
    var itemsForUploadIn: PrimitiveAtom<ItemType>[] = []

    const [shouldNavigate, setShouldNavigate] = React.useState(false);

    async function generateFrontImages() {
        console.log("Generating front images for items");
        await Promise.all(itemsForUpload.map(async item => {
            try {
                const res = await generateImages(item, 0);
                if (res.success) {
                    const newItem = {
                        ...item,
                        generatedImages: { front: res.images }
                    };
                    
                    console.log("Pushing item:", newItem.id);
                    itemsForUploadIn.push(atom(newItem) as PrimitiveAtom<ItemType>);
                    console.log("Pushed item:", newItem.id);
                } else {
                    console.error("Image generation failed for item:", res);
                }
            } catch (err) {
                console.error("Error processing item", item.id, err);
            }
        }));
        setItemsForUploadAtom(itemsForUploadIn);
        console.log("Set the state with items");
        setShouldNavigate(true);
        console.log("Set shouldnavigate");
    }

    React.useEffect(() => {
        console.log("Starting image generation");
        generateFrontImages();
    }, [])

    React.useEffect(() => {
        if (shouldNavigate) {
            console.log("Should navigate is true, closing modal and navigating");
            setVisible(false);
            router.replace("/(tabs)/(clothes)/clothesCards")
        }
    }, [shouldNavigate])

    return (
        <Modal
            animationType="fade"
            transparent
            visible={visible}
            statusBarTranslucent
            navigationBarTranslucent
        >
            <View
                className='flex-1 justify-center items-center'>
                <AnimatedGradient
                    className={"justify-center items-center"}
                    colors={[color1, color2]}
                    style={[StyleSheet.absoluteFillObject]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}>

                    {/* Your content goes here */}
                    <Image style={{ width: 100, height: 100 }} source={require("assets/sparkles2.gif")} />
                    <Text className='text-background'>Uploading...</Text>
                </AnimatedGradient>
            </View>
        </Modal>
    );
};