import { Image } from "expo-image";
import { Dimensions, Pressable } from 'react-native';
import { atom, PrimitiveAtom, useAtom, useAtomValue } from "jotai";
import { StyleSheet, View } from "react-native";
import { clothesForUploadAtom, clothesForUploadValuesAtom } from "~/lib/atoms";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text } from "~/components/ui/text";
import { FreeSizeIconButton } from "~/components/iconButton";
import { Check, RotateCcw, X } from "lucide-react-native";
import useTheme from "~/lib/theme";
import React, { useEffect } from "react";
import Carousel, {
    ICarouselInstance,
} from "react-native-reanimated-carousel";
import { ItemType } from "~/components/draggableItem";
import Generating from "~/components/generating";
import { generateImages } from "~/lib/utils";
import { toast } from "sonner-native";

export default function ClothesCards() {
    const insets = useSafeAreaInsets();
    const [itemsForUploadAtom, setItemsForUploadAtom] = useAtom(clothesForUploadAtom);
    const itemsForUpload = useAtomValue(clothesForUploadValuesAtom);
    const theme = useTheme();
    const ref = React.useRef<ICarouselInstance>(null);
    const width = Dimensions.get("window").width - 50;
    const height = Dimensions.get("window").height - insets.top - insets.bottom - 200;

    const [steps, setSteps] = React.useState(
        Object.fromEntries(itemsForUpload.map((item) => [item.id, 0]))
    );

    function nextStep({ item }: { item: ItemType }) {
        console.log("Next step for item:", item.id);
        console.log("Current step:", steps[item.id]);
        setSteps((prev) => ({ ...prev, [item.id]: prev[item.id] + 1 }));
    }

    function Step1({ item }: { item: ItemType }) {
        const [accepted, setAccepted] = React.useState(false);
        useEffect(() => {
            if (accepted) {
                setTimeout(() => {
                    nextStep({ item });
                }, 2000);
            }
        }, [accepted]);
        return (
            <View className="relative">
                <View className="w-full relative">
                    <View style={accepted && { filter: "brightness(50%)" }}>
                        <Image source={{ uri: "data:image/jpeg;base64," + item.generatedImages?.front?.[0] }} style={{ width: "100%", aspectRatio: 1, borderRadius: 8 }} />
                    </View>
                    {
                        accepted &&
                        <Check size={100} style={{ position: "absolute", top: "35%", right: "35%" }} stroke={"#fff"} />
                    }
                </View>
                <View className="flex items-center justify-center flex-1">
                    <View className="flex flex-col items-center">
                        <Text className="text-primary">Approve?</Text>
                        <Text className="text-secondary-foreground text-xs">This will be used for the 3D model generation.</Text>
                    </View>
                    <View className="flex flex-row" >
                        <FreeSizeIconButton className='p-2 flex flex-1 flex-row' onPress={() => {
                            setAccepted(true)
                        }}>
                            <Check stroke={theme.primary} />
                            <Text className='text-primary native:text-xs'>Approve</Text>
                        </FreeSizeIconButton>
                        <FreeSizeIconButton className='p-2 flex flex-1 flex-row'>
                            <X stroke={theme.primary} />
                            <Text className='text-primary native:text-xs'>Retry</Text>
                        </FreeSizeIconButton>
                    </View>
                </View>
            </View>
        )
    }

    function Step2({ item }: { item: ItemType }) {
        const [generating, setGenerating] = React.useState([false, true, true, true]);
        const [accepted, setAccepted] = React.useState([true, false, false, false]);
        const hasRun = React.useRef(false);

        async function generateLeftImage() {
            setGenerating(prev => [prev[0], true, prev[2], prev[3]]);
            const res = await generateImages(item, 1);
            setItemsForUploadAtom((prev) => {
                const index = itemsForUpload.findIndex(i => i.id === item.id);
                var newItems = [...prev];
                newItems[index] = atom({ ...itemsForUpload[index], generatedImages: { ...itemsForUpload[index].generatedImages, left: [res.images[0]] } }) as PrimitiveAtom<ItemType>;
                return newItems;
            });
            setGenerating(prev => [prev[0], false, prev[2], prev[3]]);
        }
        async function generateRightImage() {
            setGenerating(prev => [prev[0], prev[1], true, prev[3]]);
            const res = await generateImages(item, 1);
            setItemsForUploadAtom((prev) => {
                const index = itemsForUpload.findIndex(i => i.id === item.id);
                var newItems = [...prev];
                newItems[index] = atom({ ...itemsForUpload[index], generatedImages: { ...itemsForUpload[index].generatedImages, left: [res.images[0]] } }) as PrimitiveAtom<ItemType>;
                return newItems;
            });
            setGenerating(prev => [prev[0], prev[1], false, prev[3]]);
        }
        async function generateBackImage() {
            setGenerating(prev => [prev[0], prev[1], prev[2], true]);
            const res = await generateImages(item, 1);
            setItemsForUploadAtom((prev) => {
                const index = itemsForUpload.findIndex(i => i.id === item.id);
                var newItems = [...prev];
                newItems[index] = atom({ ...itemsForUpload[index], generatedImages: { ...itemsForUpload[index].generatedImages, left: [res.images[0]] } }) as PrimitiveAtom<ItemType>;
                return newItems;
            });
            setGenerating(prev => [prev[0], prev[1], prev[2], false]);
        }

        useEffect(() => {
            if (hasRun.current) return;
            hasRun.current = true;
            generateLeftImage();
            generateRightImage();
            generateBackImage();
        }, []);

        async function update() {
            if (accepted.some(a => !a)) {
                if (!accepted[1])
                    try {
                        generateLeftImage();
                    } catch (err) {
                        toast.error("Failed to generate images. Please try again.");
                    }
                if (!accepted[2])
                    try {
                        generateRightImage();
                    } catch (err) {
                        toast.error("Failed to generate images. Please try again.");
                    }
                if (!accepted[3])
                    try {
                        generateBackImage();
                    } catch (err) {
                        toast.error("Failed to generate images. Please try again.");
                    }
            }
        }
        // useEffect(() => {
        //     if (accepted) {
        //         setTimeout(() => {
        //             nextStep({ item });
        //         }, 2000);
        //     }
        // }, [accepted]);
        return (
            <View className="relative">
                <View className="w-full gap-2 relative aspect-square flex flex-wrap overflow-hidden rounded-2xl">

                    <View className="w-full flex flex-row gap-2">
                        <View className="flex-1 relative">
                            <View style={accepted[0] && { filter: "brightness(50%)" }}>
                                <Image source={{ uri: "data:image/jpeg;base64," + item.generatedImages?.front?.[0] }} style={{ width: "100%", aspectRatio: 1, borderRadius: 8 }} />
                            </View>
                            {accepted[0] && <Check size={50} style={{ position: "absolute", top: "35%", right: "35%" }} stroke={"#fff"} />}
                        </View>

                        <Pressable className="flex-1 relative" onPress={() => {
                            setAccepted((prev) => ([prev[0], !prev[1], prev[2], prev[3]]))
                        }}>
                            <View style={accepted[1] && { filter: "brightness(50%)" }}>
                                <Image source={{ uri: "data:image/jpeg;base64," + item.generatedImages?.front?.[0] }} style={{ width: "100%", aspectRatio: 1, borderRadius: 8 }} />
                            </View>
                            {accepted[1] && <Check size={50} style={{ position: "absolute", top: "35%", right: "35%" }} stroke={"#fff"} />}
                            {generating[3] && <Generating />}
                        </Pressable>
                    </View>

                    <View className="w-full flex flex-row gap-2">
                        <Pressable className="flex-1 relative" onPress={() => {
                            setAccepted((prev) => ([prev[0], prev[1], !prev[2], prev[3]]))
                        }}>
                            <View style={accepted[2] && { filter: "brightness(50%)" }}>
                                <Image source={{ uri: "data:image/jpeg;base64," + item.generatedImages?.front?.[0] }} style={{ width: "100%", aspectRatio: 1, borderRadius: 8 }} />
                            </View>
                            {accepted[2] && <Check size={50} style={{ position: "absolute", top: "35%", right: "35%" }} stroke={"#fff"} />}
                            {generating[3] && <Generating />}
                        </Pressable>

                        <Pressable className="flex-1 relative" onPress={() => {
                            setAccepted((prev) => ([prev[0], prev[1], prev[2], !prev[3]]))
                        }}>
                            <View style={accepted[3] && { filter: "brightness(50%)" }}>
                                <Image source={{ uri: "data:image/jpeg;base64," + item.generatedImages?.front?.[0] }} style={{ width: "100%", aspectRatio: 1, borderRadius: 8 }} />
                            </View>
                            {accepted[3] && <Check size={50} style={{ position: "absolute", top: "35%", right: "35%" }} stroke={"#fff"} />}
                            {generating[3] && <Generating />}
                        </Pressable>
                    </View>

                </View>
                <View className="flex items-center gap-8 justify-center flex-1">
                    <View className="flex flex-col items-center">
                        <Text className="text-primary">Tap to approve</Text>
                        <Text className="text-secondary-foreground text-xs">
                            Approve the side view renders that are to your liking. Then, press the button to regenerate the disapproved ones, or go to the next step if all are approved.
                        </Text>
                    </View>
                    <View className="flex flex-row" >
                        <FreeSizeIconButton className='p-2 flex gap-2 flex-1 flex-row' onPress={() => {

                        }}>
                            <RotateCcw stroke={theme.primary} />
                            <Text className='text-primary native:text-xs'>Update</Text>
                        </FreeSizeIconButton>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <View className="flex-1">
            <Carousel
                ref={ref}
                width={width}
                height={height}
                data={itemsForUpload}
                mode={"horizontal-stack"}
                renderItem={({ item }) => (
                    <View className="flex-1 items-center gap-2 rounded-xl bg-secondary border-secondary-foreground border p-4">
                        {(() => {
                            switch (steps[item.id]) {
                                case 0:
                                    return <Step1 item={item} />;
                                case 1:
                                    return <Step2 item={item} />;
                            }
                        })()}
                    </View>
                )}
            />
            {/* {itemsForUpload.length > 0 && (
                <Swiper
                    containerStyle={{
                        zIndex: 999,
                    }}
                    cards={itemsForUpload}
                    renderCard={(card) => {
                        return (
                            <View className="-ml-4 flex-1 items-center gap-2 rounded-xl bg-secondary border-secondary-foreground border p-4" style={[{
                                marginBottom: insets.bottom + 150,
                                marginTop: insets.top - 70,
                                width: Dimensions.get('window').width - 60,
                                height: Dimensions.get('window').height - 500
                            }]}>
                                <Image source={{ uri: "data:image/jpeg;base64," + card.generatedImages?.front?.[0] }} style={{ width: "100%", aspectRatio: 1, borderRadius: 8 }} />
                                <View className="flex items-center justify-center flex-1">
                                    <View className="flex flex-col items-center">
                                        <Text className="text-primary">Approve?</Text>
                                        <Text className="text-secondary-foreground text-xs">This will be used for the 3D model generation.</Text>
                                    </View>
                                    <View className="flex flex-row" >
                                        <FreeSizeIconButton className='p-2 flex flex-1 flex-row'>
                                            <Check stroke={theme.primary} />
                                            <Text className='text-primary native:text-xs'>Approve</Text>
                                        </FreeSizeIconButton>
                                        <FreeSizeIconButton className='p-2 flex flex-1 flex-row'>
                                            <X stroke={theme.primary} />
                                            <Text className='text-primary native:text-xs'>Retry</Text>
                                        </FreeSizeIconButton>
                                    </View>
                                </View>
                            </View>
                        )
                    }}
                    onSwiped={(cardIndex) => {
                        console.log(cardIndex)
                        setCardIndex(cardIndex);
                    }}
                    onSwipedAll={() => { console.log('onSwipedAll') }}
                    cardIndex={cardIndex}
                    infinite
                    backgroundColor={'transparent'}
                    stackSize={itemsForUpload.length <= 3 ? itemsForUpload.length : 3}
                    showSecondCard
                />
            )} */}

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative",
        backgroundColor: "#F5FCFF"
    },
    text: {
        textAlign: "center",
        fontSize: 20,
        backgroundColor: "transparent"
    }
});