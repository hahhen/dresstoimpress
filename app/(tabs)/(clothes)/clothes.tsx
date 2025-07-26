import { Plus } from "~/lib/icons/Plus";
import { View } from "react-native";
import { FreeSizeIconButton } from "~/components/iconButton";
import { Text } from "~/components/ui/text";
import BottomSheet from "~/components/bottomSheet";
import Camera from "~/assets/icons/Camera";
import { useColorScheme } from "~/lib/useColorScheme";
import { NAV_THEME } from "~/lib/constants";
import ImageIcon from "~/assets/icons/Image";
import OpenCamGallSelection from "~/components/openCamGallSelection.tsx";
import { account, database, functions, storage } from "~/lib/client";
import { ID } from "react-native-appwrite";
import { Link, Redirect, useRouter } from "expo-router";
import { clothesForUploadAtom } from "~/lib/atoms";
import { Atom, atom, PrimitiveAtom, useAtom } from "jotai";
import { ItemType } from "~/components/draggableItem";
import { ImagePickerAsset } from "expo-image-picker";
import React from "react";
import { Image } from "expo-image";


export default function ClothesPage() {
    const { isDarkColorScheme } = useColorScheme();
    const theme = isDarkColorScheme ? NAV_THEME.dark : NAV_THEME.light;
    const [clothesForUpload, setClothesForUpload] = useAtom(clothesForUploadAtom);
    const [shouldNavigate, setShouldNavigate] = React.useState(false);
    const [imagee, setImagee] = React.useState([])

    const router = useRouter();

    React.useEffect(() => {
        if (shouldNavigate) {
            setShouldNavigate(false); // reset flag
            router.push("/(clothes)/organizeUploads");
        }
    }, [shouldNavigate]);

    return (
        <View className="flex-1 items-center justify-center gap-6">
            <View className="flex items-center justify-center gap-0">
                <Text className="leading-none text-primary text-2xl">You have no clothes ;&#40;</Text>
                <Text className="leading-none text-primary text-2xl">Let&apos;s change that!</Text>
            </View>
            <Link href="/(clothes)/organizeUploads" asChild>
                <FreeSizeIconButton className="flex flex-row px-16">
                    <Text className="native:text-sm">Organize uploads</Text>
                </FreeSizeIconButton>
            </Link>
            <BottomSheet
                trigger={
                    <FreeSizeIconButton className="flex flex-row px-16">
                        <Plus className="stroke-secondary-foreground my-1" />
                        <Text className="native:text-sm">Add new clothes</Text>
                    </FreeSizeIconButton>
                }>
                <View className="flex justify-center gap-4">
                    <Text className="text-primary text-sm text-center">To add new clothes, select or more pictures!</Text>
                    <OpenCamGallSelection afterSelect={async (images) => {
                        const clothesForUploadIn: PrimitiveAtom<ItemType>[] = images.map((image: ImagePickerAsset) =>
                            atom<ItemType>({
                                id: ID.unique(),
                                type: "icon",
                                image: image.uri,
                                itemFile: image,
                            })
                        );
                        setClothesForUpload(clothesForUploadIn);
                        setShouldNavigate(true);
                        // router.push("/(clothes)/organizeUploads");
                    }} />
                </View>
            </BottomSheet>
        </View>
    );
}