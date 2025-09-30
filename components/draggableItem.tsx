import BottomSheet from './bottomSheet';
import React, { useEffect } from 'react';
import { View, TouchableOpacity, Dimensions, Pressable, FlatList, TextInput } from 'react-native';
import {
    Gesture,
    GestureDetector,
    GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
    SharedValue,
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    runOnJS,
    useDerivedValue,
    FadeIn,
} from 'react-native-reanimated';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogFooter, DialogTitle, DialogTrigger } from './ui/dialog';
import { Image } from 'expo-image';
import { Text } from './ui/text';
import FolderTip from '~/assets/icons/FolderTip';
import { useColorScheme } from '~/lib/useColorScheme';
import { NAV_THEME } from '~/lib/constants';
import { FreeSizeIconButton } from './iconButton';
import { ImagePickerAsset } from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from './ui/button';
import { cn, createRows } from '~/lib/utils';
import { BottomSheetModalProvider, BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { BlurView } from 'expo-blur';
import { Pencil } from 'lucide-react-native';
import { Atom, PrimitiveAtom, useAtom } from 'jotai';

const { width } = Dimensions.get('window');
const NUM_COLUMNS = 3;
const HORIZONTAL_MARGIN = 10;
const VERTICAL_MARGIN = 10;
const LABEL_HEIGHT = 20;

const ITEM_SIZE = (width - 50 - (NUM_COLUMNS + 1) * HORIZONTAL_MARGIN) / NUM_COLUMNS;
const ITEM_CONTAINER_HEIGHT = ITEM_SIZE + LABEL_HEIGHT;

const getPosition = (order: number) => {
    'worklet';
    const col = order % NUM_COLUMNS;
    const row = Math.floor(order / NUM_COLUMNS);
    return {
        x: col * (ITEM_SIZE + HORIZONTAL_MARGIN) + HORIZONTAL_MARGIN,
        y: row * (ITEM_CONTAINER_HEIGHT + VERTICAL_MARGIN) + VERTICAL_MARGIN,
    };
};

type ItemType = {
    id: string;
    type: 'icon' | 'folder';
    label?: string;
    image?: string;
    items?: ItemType[];
    itemFile?: ImagePickerAsset;
    generatedImages?: { front?: string[], back?: string[], left?: string[], right?: string[] };
    hasRun?: { sideviews?: boolean, model?: boolean | false };
};

const createPositions = (items: ItemType[]) =>
    Object.fromEntries(items.map((item, index) => [item.id, index]));

type DraggableItemProps = {
    atomItem: PrimitiveAtom<ItemType>;
    fakeLabel?: string;
    positions: SharedValue<{ [id: string]: number }>;
    onMerge: (draggedId: string, targetId: string) => void;
};

const DraggableItem: React.FC<DraggableItemProps> = ({ atomItem, positions, onMerge, fakeLabel }) => {
    const [item, setItem] = useAtom(atomItem);
    const { isDarkColorScheme } = useColorScheme();
    const theme = isDarkColorScheme ? NAV_THEME.dark : NAV_THEME.light;
    const translation = useSharedValue({ x: 0, y: 0 });
    const startPos = useSharedValue({ x: 0, y: 0 });
    const scale = useSharedValue(1);

    const initialPosition = useDerivedValue(() => {
        const order = positions.value[item.id];
        if (order === undefined) return { x: -1000, y: -1000 };
        return getPosition(order);
    }, [positions]);

    const animatedStyle = useAnimatedStyle(() => {
        const x = initialPosition.value.x + translation.value.x;
        const y = initialPosition.value.y + translation.value.y;
        return {
            position: 'absolute',
            left: 0,
            top: 0,
            width: ITEM_SIZE,
            height: ITEM_CONTAINER_HEIGHT,
            transform: [{ translateX: x }, { translateY: y }, { scale: scale.value }],
            zIndex: scale.value > 1 ? 100 : 1,
        };
    });

    const gesture = Gesture.Pan()
        .activateAfterLongPress(250)
        .onStart(() => {
            startPos.value = { x: translation.value.x, y: translation.value.y };
            scale.value = withSpring(1.15);
        })
        .onUpdate((event) => {
            translation.value = {
                x: startPos.value.x + event.translationX,
                y: startPos.value.y + event.translationY,
            };
        })
        .onEnd(() => {
            const currentPos = {
                x: initialPosition.value.x + translation.value.x,
                y: initialPosition.value.y + translation.value.y,
            };
            let targetId: string | null = null;
            for (const id in positions.value) {
                if (id === item.id) continue;
                const targetOrder = positions.value[id];
                const targetPos = getPosition(targetOrder);
                const distance = Math.sqrt(
                    (currentPos.x - targetPos.x) ** 2 + (currentPos.y - targetPos.y) ** 2
                );
                if (distance < ITEM_SIZE) {
                    targetId = id;
                    break;
                }
            }
            if (targetId) {
                runOnJS(onMerge)(item.id, targetId);
            }
        })
        .onFinalize(() => {
            translation.value = withSpring({ x: 0, y: 0 }, { damping: 15, stiffness: 120 });
            scale.value = withSpring(1);
        });

    const renderIcon = (iconItem: ItemType) => {

        return (
            <BottomSheet trigger={
                <Pressable>
                    <View
                        className="w-full rounded-2xl overflow-hidden"
                        style={{ width: ITEM_SIZE, height: ITEM_SIZE }}
                    >
                        <Image
                            source={{ uri: iconItem.image }}
                            style={{ width: ITEM_SIZE, height: ITEM_SIZE }}
                            contentFit="cover"
                        />
                    </View>
                </Pressable>
            }>
                <View className='flex items-center'>
                    <View className='flex flex-row items-center gap-2'>
                        <BottomSheetTextInput autoCorrect={false} autoComplete='off' selectionHandleColor={theme.primary} cursorColor={theme.primary} style={{
                            fontFamily: 'Inter_600SemiBold',
                        }}
                            value={typeof item.label === 'string' ? item.label : fakeLabel} className='text-primary text-2xl' onChangeText={(value) => { setItem((prev) => ({ ...prev, label: value })) }}
                        />
                        <Pencil size={20} stroke={theme.primary} />
                    </View>
                    <Text className="text-xs text-center mt-1" style={{ height: LABEL_HEIGHT, width: '100%' }}>

                    </Text>
                </View>
            </BottomSheet>
        )
    };

    const renderFolder = (folderItem: ItemType) => (
        <Dialog>
            <DialogTrigger asChild>
                <FreeSizeIconButton
                    className="rounded-[15px] bg-gray-400"
                    style={{ width: ITEM_SIZE, height: ITEM_SIZE }}
                >
                    <View className="flex-row flex-wrap w-full h-full items-center justify-center relative">
                        {(folderItem.items ?? []).slice(0, 4).map((child) => (
                            <View
                                key={child.id}
                                className="items-center justify-center"
                                style={{ width: '50%', height: '50%', padding: 3 }}
                            >
                                <View
                                    className="rounded-[10px] justify-center items-center overflow-hidden w-full aspect-square bg-secondary"
                                >
                                    <Image
                                        style={{ width: '100%', height: '100%', opacity: 0.7 }}
                                        source={{ uri: child.image }}
                                        contentFit="cover"
                                    />
                                </View>
                            </View>
                        ))}
                    </View>
                    <FolderTip width={80} style={{ position: 'absolute', bottom: 0, margin: -1 }} fill={theme.secondaryText} />
                </FreeSizeIconButton>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px] h-[70vh] w-full items-center'>
                <Text className='text-2xl text-primary'>Piece 2</Text>
                <View className='flex-1 flex flex-wrap flex-row gap-2'>
                    {folderItem.items?.map((item, index) => (
                        <BottomSheet index={1} snapPoints={['50%']} key={item.id} trigger={
                            <Pressable
                                className="w-[32%] items-center justify-center rounded-[10px] overflow-hidden aspect-square"
                            >
                                <Image
                                    style={{ width: '100%', height: '100%' }}
                                    source={{ uri: item.image }}
                                    contentFit="cover"
                                />
                            </Pressable>
                        }>
                            <Text className="text-xs text-center mt-1" style={{ height: LABEL_HEIGHT, width: '100%' }}>
                                aaaaaaaaaaaaaaaaaaaaaaaaa
                            </Text>
                        </BottomSheet>
                    ))}
                    <LinearGradient
                        colors={['transparent', theme.secondary]}
                        style={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            bottom: 0,
                            height: 32,
                            pointerEvents: 'none',
                        }}
                    />
                </View>
            </DialogContent>
        </Dialog>
    );

    return (
        <GestureDetector gesture={gesture}>
            <Animated.View style={animatedStyle}>
                {item.type === 'icon' ? renderIcon(item) : renderFolder(item)}
                <Text
                    className="text-xs text-center mt-1"
                    style={{
                        height: LABEL_HEIGHT,
                    }}
                    numberOfLines={1}
                >
                    {typeof item.label === 'string' ? item.label : fakeLabel}
                </Text>
            </Animated.View>
        </GestureDetector>
    );
};

export default DraggableItem;
export { createPositions, getPosition, ITEM_SIZE, ITEM_CONTAINER_HEIGHT, HORIZONTAL_MARGIN, VERTICAL_MARGIN, LABEL_HEIGHT, NUM_COLUMNS };
export type { ItemType, DraggableItemProps };
