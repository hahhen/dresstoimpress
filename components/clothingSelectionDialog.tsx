import { View } from "react-native";
import * as React from "react";
import { Text } from "~/components/ui/text";
import { cn } from "~/lib/utils";
import { Button } from '~/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
} from '~/components/ui/dialog';
import { createRows } from "~/lib/utils";
import { useAtom } from "jotai";
import { selectedPiecesAtom } from "~/lib/atoms";
import { Pressable } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { NAV_THEME } from "~/lib/constants";
import { useColorScheme } from "~/lib/useColorScheme";
import { LinearGradient } from "expo-linear-gradient";

export type PieceType = "head" | "top" | "bottom" | "shoes" | "accessories" | "outfits";

export default function ClothingSelectionDialog({ asChild = false, children, label, icon, pieceType }: { asChild?: boolean, children: React.ReactNode, label: string, icon?: React.ReactNode, pieceType: PieceType }) {
    const [selectedPieces, setSelectedPieces] = useAtom(selectedPiecesAtom);
    const { isDarkColorScheme } = useColorScheme();
    const theme = isDarkColorScheme ? NAV_THEME.dark : NAV_THEME.light;
    const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);

    const handlePresentModalPress = React.useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

    const handlePieceSelection = (pieceId: string) => {
        if (pieceId != "outfits")
            setSelectedPieces((prev) => {
                const newPieces = { ...prev };
                if (newPieces[pieceType].includes(pieceId)) {
                    newPieces[pieceType] = newPieces[pieceType].filter((id: string) => id !== pieceId);
                } else {
                    newPieces[pieceType].push(pieceId);
                }
                return newPieces;
            });
    };
    return (
        <>
            {asChild && React.isValidElement(children)
                ? React.cloneElement(children as React.ReactElement<any>, {
                    onPress: handlePresentModalPress,
                })
                : (
                    <Pressable onPress={handlePresentModalPress}>
                        {children}
                    </Pressable>
                )
            }
            <BottomSheetModal
                index={1}
                enableDismissOnClose={true}
                stackBehavior="replace"
                handleIndicatorStyle={{ backgroundColor: theme.secondaryText }}
                backgroundStyle={{ backgroundColor: theme.secondary }}
                ref={bottomSheetModalRef}
                snapPoints={["90%"]}
            >
                <BottomSheetView
                    className="flex-1 p-6">
                    <View className="flex flex-1 items-start gap-4 relative">
                        <View className="flex flex-col items-center h-14">
                            {icon}
                            <Text className="text-secondary-foreground native:text-[0.6rem] native:leading-none">{label}</Text>
                        </View>
                        <View className="h-[70vh] w-full">
                            <FlatList
                                className="rounded-2xl"
                                data={
                                    createRows(
                                        [1, 2, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 33, 3, 3,], 3)
                                }
                                numColumns={3}
                                renderItem={({ item }: { item: number }) => {
                                    if (item == 0)
                                        return <View className="flex-1 m-1" />
                                    return (
                                        <Button
                                            className={cn("flex-1 m-1 bg-muted aspect-square rounded-xl")}
                                            size={"custom"}
                                            onPress={() => { }}
                                        >
                                        </Button>
                                    )
                                }} />
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
                    </View>
                </BottomSheetView>
            </BottomSheetModal>
        </>
    )
}