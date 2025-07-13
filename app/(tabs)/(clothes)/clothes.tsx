import { Plus } from "~/lib/icons/Plus";
import { View } from "react-native";
import IconButton, { FreeSizeIconButton } from "~/components/iconButton";
import { Text } from "~/components/ui/text";
import BottomSheet from "~/components/bottomSheet";
import Camera from "~/assets/icons/Camera";
import { useColorScheme } from "~/lib/useColorScheme";
import { NAV_THEME } from "~/lib/constants";
import Image from "~/assets/icons/Image";
import { pickImage, openCamera } from "~/lib/getImageFromDevice";


export default function ClothesPage() {
    const { isDarkColorScheme } = useColorScheme();
    const theme = isDarkColorScheme ? NAV_THEME.dark : NAV_THEME.light;

    return (
        
        <View className="flex-1 items-center justify-center gap-6">
            <View className="flex items-center justify-center gap-0">
                <Text className="leading-none text-primary text-2xl">You have no clothes ;&#40;</Text>
                <Text className="leading-none text-primary text-2xl">Let&apos;s change that!</Text>
            </View>
            <BottomSheet
                trigger={
                    <FreeSizeIconButton className="flex flex-row px-16">
                        <Plus className="stroke-secondary-foreground my-1" />
                        <Text className="native:text-sm">Add new clothes</Text>
                    </FreeSizeIconButton>
                }>
                <View className="flex justify-center gap-4">
                    <Text className="text-primary text-sm text-center">To add new clothes, select or more pictures!</Text>
                    <View className="flex-1 mb-20 flex-row items-center gap-12 justify-center">
                        <IconButton buttonClassName="gap-1" onPress={openCamera}>
                            <View className="flex flex-1 flex-col items-center justify-end">
                                <Camera width={45} fill={theme.primary} />
                            </View>
                            <Text className="text-primary native:text-[0.6rem] native:leading-none">Camera</Text>
                        </IconButton>
                        <IconButton buttonClassName="gap-1" onPress={pickImage}>
                            <View className="flex flex-1 flex-col items-center justify-end">
                                <Image fill2={theme.secondary} width={40} fill={theme.primary} />
                            </View>
                            <Text className="text-primary native:text-[0.6rem] native:leading-none">From phone</Text>
                        </IconButton>
                    </View>
                </View>
            </BottomSheet>
        </View>
    );
}