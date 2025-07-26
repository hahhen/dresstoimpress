import { View } from "react-native";
import IconButton from "~/components/iconButton";
import { Text } from "~/components/ui/text";
import Camera from "~/assets/icons/Camera";
import { useColorScheme } from "~/lib/useColorScheme";
import { NAV_THEME } from "~/lib/constants";
import Image from "~/assets/icons/Image";
import { pickImage, openCamera } from "~/lib/getImageFromDevice";

export default function OpenCamGallSelection({ afterSelect }: { afterSelect?: (image: any) => void }) {
    const { isDarkColorScheme } = useColorScheme();
    const theme = isDarkColorScheme ? NAV_THEME.dark : NAV_THEME.light;
    return (
        <View className="flex-1 mb-20 flex-row items-center gap-12 justify-center">
            <IconButton buttonClassName="gap-1" onPress={async () => {
                const image = await openCamera();
                afterSelect?.(image);
            }}>
                <View className="flex flex-1 flex-col items-center justify-end">
                    <Camera width={45} fill={theme.primary} />
                </View>
                <Text className="text-primary native:text-[0.6rem] native:leading-none">Camera</Text>
            </IconButton>
            <IconButton buttonClassName="gap-1" onPress={async () => {
                const image = await pickImage();
                afterSelect?.(image);
            }}>
                <View className="flex flex-1 flex-col items-center justify-end">
                    <Image fill2={theme.secondary} width={40} fill={theme.primary} />
                </View>
                <Text className="text-primary native:text-[0.6rem] native:leading-none">From phone</Text>
            </IconButton>
        </View>
    )
}