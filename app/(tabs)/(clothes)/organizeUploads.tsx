import { ImagePickerAsset } from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { atom, PrimitiveAtom, useAtom, useAtomValue } from 'jotai';
import { Check, Redo2, RotateCcw, Undo2 } from 'lucide-react-native';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { ID } from 'react-native-appwrite';
import { useSharedValue, } from 'react-native-reanimated';
import BottomSheet from '~/components/bottomSheet';
import DraggableItem, { createPositions, ITEM_CONTAINER_HEIGHT, ItemType, NUM_COLUMNS, VERTICAL_MARGIN } from '~/components/draggableItem';
import { FreeSizeIconButton } from '~/components/iconButton';
import OpenCamGallSelection from '~/components/openCamGallSelection.tsx';
import { Text } from '~/components/ui/text';
import { clothesForUploadAtom, clothesForUploadValuesAtom } from '~/lib/atoms';
import { NAV_THEME } from '~/lib/constants';
import { useColorScheme } from '~/lib/useColorScheme';
import { Plus } from "~/lib/icons/Plus";
import { router } from 'expo-router';
import useTheme from '~/lib/theme';

export default function OrganizeUploads() {
    const [atomItems, setAtomItems] = useAtom(clothesForUploadAtom);
    const items = useAtomValue(clothesForUploadValuesAtom);

    const positions = useSharedValue(createPositions(items));

    const initialItemsRef = React.useRef<PrimitiveAtom<ItemType>[]>(atomItems);
    const initialItems = initialItemsRef.current.map((item) => {
        const value = useAtomValue(item);
        return value;
    });

    const [uploadedAtoms, setUploadedAtoms] = React.useState<PrimitiveAtom<ItemType>[]>([]);

    const historyRef = React.useRef<ItemType[][]>([]);
    const futureRef = React.useRef<ItemType[][]>([]);

    const theme = useTheme();

    //---------------------Utility functions---------------------

    const handleMerge = (draggedId: string, targetId: string) => {
        // Save current state to history before changing
        historyRef.current.push(items);
        // Clear redo stack on new change
        futureRef.current = [];

        // Get current item values
        const currentItems = items;

        const draggedItem = currentItems.find((i) => i.id === draggedId)!;
        if (draggedItem.type === 'folder') return;

        const targetItem = currentItems.find((i) => i.id === targetId)!;
        let newItems: ItemType[] = [];

        if (targetItem.type === 'folder') {
            newItems = currentItems
                .map((i) =>
                    i.id === targetId
                        ? { ...i, items: [...(i.items || []), draggedItem] }
                        : i
                )
                .filter((i) => i.id !== draggedId);
        } else {
            const newFolder: ItemType = {
                id: `folder-${Date.now()}`,
                type: 'folder',
                items: [targetItem, draggedItem],
            };
            newItems = currentItems
                .filter((i) => i.id !== draggedId && i.id !== targetId)
                .concat(newFolder);
        }

        // Create new atoms for each item
        const newAtoms = newItems.map((item) => atom(item));

        // Update the atom array
        setAtomItems(newAtoms);
    };

    const undo = () => {
        if (historyRef.current.length > 0) {
            // Move current state to future stack
            futureRef.current.push(items);
            // Pop previous state from history
            historyRef.current.pop();
            const prevItems = historyRef.current[historyRef.current.length - 1];
            const prevAtoms = prevItems.map(item => atom(item));
            setAtomItems(prevAtoms);
        }
    };

    const redo = () => {
        if (futureRef.current.length > 0) {
            // Move current state to history stack
            historyRef.current.push(items);
            // Pop next state from future
            const nextItems = futureRef.current.pop();
            if (nextItems) {
                const nextAtoms = nextItems.map(item => atom(item));
                setAtomItems(nextAtoms);
            }
        }
    };

    const reset = () => {
        setAtomItems([...initialItemsRef.current, ...uploadedAtoms]);
    };

    React.useEffect(() => {
        // Get current item values from atoms
        positions.value = createPositions(items);
    }, [atomItems]);


    const numRows = Math.ceil(items.length / NUM_COLUMNS);
    const gridHeight = numRows * (ITEM_CONTAINER_HEIGHT + VERTICAL_MARGIN) + VERTICAL_MARGIN;

    return (
        <View>
            <View className='relative'>
                <ScrollView className='h-[60vh]'>
                    <View className='relative overflow-auto' style={{ height: gridHeight }}>
                        {atomItems.map((item, i) => (
                            <DraggableItem key={items[i].id} fakeLabel={`Piece ${i + 1}`} atomItem={item} positions={positions} onMerge={handleMerge} />
                        ))}
                    </View>
                </ScrollView>
                <LinearGradient
                    colors={['transparent', theme.background]}
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
            <View className='flex flex-row'>
                <FreeSizeIconButton className='p-2' onPress={undo} >
                    <Undo2 stroke={theme.primary} />
                </FreeSizeIconButton>
                <FreeSizeIconButton className='p-2' onPress={redo}>
                    <Redo2 stroke={theme.primary} />
                </FreeSizeIconButton>
                <FreeSizeIconButton className='p-2' onPress={reset} >
                    <RotateCcw stroke={theme.primary} />
                </FreeSizeIconButton>
                <FreeSizeIconButton className='p-2 flex-row flex-1 gap-2' onPress={() => router.push('/uploading')}>
                    <Check size={15} stroke={theme.primary} />
                    <Text className='text-primary native:text-xs'>Upload</Text>
                </FreeSizeIconButton>
                <BottomSheet
                    trigger={
                        <FreeSizeIconButton className='p-2' onPress={reset}>
                            <Plus stroke={theme.primary} />
                        </FreeSizeIconButton>
                    }>
                    <View className="flex justify-center gap-4">
                        <Text className="text-primary text-sm text-center">To add new clothes, select or more pictures!</Text>
                        <OpenCamGallSelection afterSelect={(images) => {
                            const clothesForUploadIn: PrimitiveAtom<ItemType>[] = images.map((image: ImagePickerAsset) =>
                                atom<ItemType>({
                                    id: ID.unique(),
                                    type: "icon",
                                    image: image.uri,
                                    itemFile: image,
                                })
                            );
                            setUploadedAtoms((prev) => [...prev, ...clothesForUploadIn]);
                            setAtomItems((prev) => [...prev, ...clothesForUploadIn]);
                        }} />
                    </View>
                </BottomSheet>
            </View>
        </View>

    );
}

