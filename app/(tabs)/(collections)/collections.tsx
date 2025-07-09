import { View } from "react-native";
import { FreeSizeIconButton } from "~/components/iconButton";
import { Plus } from "~/lib/icons/Plus";
import { Text } from "~/components/ui/text";

export default function CollectionsPage(){
    return (
        <View className="flex-1 items-center justify-center gap-6">
                <Text className="leading-none text-primary text-2xl">No collections yet!</Text>
            <FreeSizeIconButton className="flex flex-row px-16">
                <Plus className="stroke-secondary-foreground my-1"/>
                <Text className="native:text-sm">Make collection</Text>
            </FreeSizeIconButton>
        </View>
    );
}