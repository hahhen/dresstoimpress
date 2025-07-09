import { FlatList, View } from "react-native";
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

export type PieceType = "head" | "top" | "bottom" | "shoes" | "accessories" | "outfits";

export default function ClothingSelectionDialog({ asChild = false, children, label, icon, pieceType }: { asChild?: boolean, children: React.ReactNode, label: string, icon?: React.ReactNode, pieceType: PieceType }) {
    const [selectedPieces, setSelectedPieces] = useAtom(selectedPiecesAtom)

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
        <Dialog>
            <DialogTrigger asChild={asChild}>
                {children}
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px] h-[85%] rounded-xl relative'>
                <DialogHeader className="flex-row">
                    <View className="flex flex-col items-center h-14">
                        {icon}
                        <Text className="text-secondary-foreground native:text-[0.6rem] native:leading-none">{label}</Text>
                    </View>
                </DialogHeader>
                <FlatList
                    data={
                        createRows(
                            [1, 2, 3, 4, 5, 6, 7], 3)
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
                <View className="h-24 shadow-[0px_-5px_7.7px_0px_var(--secondary,#F9F7FD)]"></View>
            </DialogContent>
        </Dialog>
    )
}