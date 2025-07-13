import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import * as React from "react";
import { Pressable } from "react-native";
import { NAV_THEME } from "~/lib/constants";
import { useColorScheme } from "~/lib/useColorScheme";
import { Text } from "./ui/text";

export default function BottomSheet({ children, trigger }: { children: React.ReactNode, trigger: React.ReactNode }) {
    const { isDarkColorScheme } = useColorScheme();
    const theme = isDarkColorScheme ? NAV_THEME.dark : NAV_THEME.light;
    const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);

    const handlePresentModalPress = React.useCallback(() => {
        console.log("Presenting ass");
        bottomSheetModalRef.current?.present();
    }, []);

    return (
        <>
            {React.isValidElement(trigger)
                ? React.cloneElement(trigger as any, { onPress: handlePresentModalPress })
                : trigger
            }
            <BottomSheetModal
                ref={bottomSheetModalRef}
                enableDismissOnClose={true}
                stackBehavior="replace"
                handleIndicatorStyle={{ backgroundColor: theme.secondaryText }}
                backgroundStyle={{ backgroundColor: theme.secondary }}
            >
                <BottomSheetView className="flex-1 p-6">
                    {children}
                </BottomSheetView>
            </BottomSheetModal>
        </>
    )
}