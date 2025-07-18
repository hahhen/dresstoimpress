import { View } from "react-native";
import { FreeSizeIconButton } from "~/components/iconButton";
import { Plus } from "~/lib/icons/Plus";
import { Text } from "~/components/ui/text";
import BottomSheet from "~/components/bottomSheet";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React from "react";
import { database } from "~/lib/client";

export default function CollectionsPage() {
    React.useEffect(() => {
        database.listDocuments("68734d800039f997962d", "68734dab00328e5eaa50")
            .then((res) => console.log(res))
            .catch((err) => console.error(err));
    }, []);
    return (
        <View className="flex-1 items-center justify-center gap-6">
            <Text className="leading-none text-primary text-2xl">No collections yet!</Text>
            <BottomSheet
                trigger={
                    <FreeSizeIconButton className="flex flex-row px-16">
                        <Plus className="stroke-secondary-foreground my-1" />
                        <Text className="native:text-sm">Make collection</Text>
                    </FreeSizeIconButton>
                }>
                <View className="flex-1 items-center justify-center gap-6">
                    <Text className="text-secondary-foreground">This is a bottom sheet!</Text>
                    <Text className="text-secondary-foreground">You can add your collections here.</Text>
                </View>
            </BottomSheet>
        </View>
    );
}