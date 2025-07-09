import { Plus } from "~/lib/icons/Plus";
import { View } from "react-native";
import { FreeSizeIconButton } from "~/components/iconButton";
import { Text } from "~/components/ui/text";

export default function ClothesPage() {
    return (
        <View className="flex-1 items-center justify-center gap-6">
            <View className="flex items-center justify-center gap-0">
                <Text className="leading-none text-primary text-2xl">You have no clothes ;&#40;</Text>
                <Text className="leading-none text-primary text-2xl">Let&apos;s change that!</Text>
            </View>
            <FreeSizeIconButton className="flex flex-row px-16">
                <Plus className="stroke-secondary-foreground my-1"/>
                <Text className="native:text-sm">Add new clothes</Text>
            </FreeSizeIconButton>
        </View>
    );
}