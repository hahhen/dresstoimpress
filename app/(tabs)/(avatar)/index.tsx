import { View } from "react-native";
import * as React from "react";
import { useColorScheme } from "~/lib/useColorScheme";
import { NAV_THEME } from "~/lib/constants";
import { Text } from "~/components/ui/text";
import Shirt from "~/assets/icons/Shirt";
import IconButton, { FreeHeightIconButton } from "~/components/iconButton";
import Cap from "~/assets/icons/Cap";
import Pants from "~/assets/icons/Pants";
import Shoes from "~/assets/icons/Shoes";
import Accessories from "~/assets/icons/Accessories";
import Daisy from "~/assets/icons/Daisy";
import Clear from "~/assets/icons/Clear";
import Dice from "~/assets/icons/Dice";
import Caret from "~/assets/icons/Caret";
import ClothingSelectionDialog, { PieceType } from "~/components/clothingSelectionDialog";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import AvatarRender from "~/components/avatarRender";
import { router } from "expo-router";

export default function AvatarPage() {
    const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme();
    const theme = isDarkColorScheme ? NAV_THEME.dark : NAV_THEME.light;

    const buttons = {
        left: [
            {
                pieceType: "head",
                label: "Head piece",
                icon:
                    <View className="flex flex-1 flex-col items-center justify-center">
                        <Cap width={50} fill={theme.secondaryText} />
                    </View>
            },
            {
                pieceType: "top",
                label: "Top piece",
                icon:
                    <View className="flex flex-1 flex-col items-center justify-center">
                        <Shirt width={50} fill={theme.secondaryText} />
                    </View>
            },
            {
                pieceType: "bottom",
                label: "Bottom piece",
                icon:
                    <View className="flex flex-1 flex-col items-center justify-center">
                        <Pants width={35} fill={theme.secondaryText} />
                    </View>
            },
            {
                pieceType: "shoes",
                label: "Shoes",
                icon:
                    <View className="flex flex-1 flex-col items-center justify-end py-1">
                        <Shoes width={45} fill={theme.secondaryText} />
                    </View>
            }
        ],
        right: [
            {
                pieceType: "accessories",
                label: "Accessories",
                icon:
                    <View className="flex flex-1 flex-col items-center justify-end py-1">
                        <Accessories width={45} fill={theme.secondaryText} />
                    </View>
            },
            {
                pieceType: "outfits",
                label: "Outfits",
                icon:
                    <View className="flex flex-1 flex-col items-center justify-end py-1">
                        <Daisy width={45} fill={theme.secondaryText} />
                    </View>
            }
        ]
    }
    
    return (
        <View className="flex flex-row justify-between mt-10">
            <View className="basis-[21.5%] gap-10">
                <View className="flex gap-2">
                    <FreeHeightIconButton className="h-16 justify-end">
                        <View className="flex flex-1 flex-col items-center justify-center">
                            <Clear width={25} fill={theme.secondaryText} />
                        </View>
                        <Text className="text-secondary-foreground native:text-[0.6rem] native:leading-none">Clear mode</Text>
                    </FreeHeightIconButton>
                    <FreeHeightIconButton className="h-12 flex-row gap-1 justify-center">
                        <Dice width={16} fill={theme.secondaryText} />
                        <Text className="text-secondary-foreground native:text-[0.6rem]">Random</Text>
                        <Caret width={7} fill={theme.secondaryText} />
                    </FreeHeightIconButton>
                </View>
                <View className="flex gap-4">
                    {buttons.left.map((button, index) => (
                        <ClothingSelectionDialog key={index} label={button.label} icon={button.icon} pieceType={button.pieceType as PieceType} asChild>
                            <IconButton>
                                {button.icon}
                                <Text className="text-secondary-foreground native:text-[0.6rem] native:leading-none">{button.label}</Text>
                            </IconButton>
                        </ClothingSelectionDialog>
                    ))}
                    <Text className="text-foreground" onPress={() => setColorScheme(colorScheme === "light" ? "dark" : "light")}>
                        {`${colorScheme}`}
                    </Text>
                </View>
            </View>
            <View className="basis-[57%]">
                <AvatarRender />
            </View>
            <View className="basis-[21.5%] mt-40">
                <View className="flex gap-56">
                    {buttons.right.map((button, index) => (
                        <ClothingSelectionDialog key={index} label={button.label} icon={button.icon} pieceType={button.pieceType as PieceType} asChild>
                            <IconButton>
                                {button.icon}
                                <Text className="text-secondary-foreground native:text-[0.6rem] native:leading-none">{button.label}</Text>
                            </IconButton>
                        </ClothingSelectionDialog>
                    ))}
                </View>
            </View>
        </View>
    )
}