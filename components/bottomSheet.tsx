import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProps, BottomSheetView } from "@gorhom/bottom-sheet";
import * as React from "react";
import { NAV_THEME } from "~/lib/constants";
import { useColorScheme } from "~/lib/useColorScheme";
import { Text } from "./ui/text";

type BottomSheetProps = BottomSheetModalProps & {
    children: React.ReactNode;
    trigger: React.ReactNode;
};

const BottomSheet = React.forwardRef<BottomSheetModal, BottomSheetProps>(
    ({ children, trigger, ...props }, ref) => {
        const { isDarkColorScheme } = useColorScheme();
        const theme = isDarkColorScheme ? NAV_THEME.dark : NAV_THEME.light;
        const localRef = React.useRef<BottomSheetModal>(null);
        const bottomSheetModalRef = (ref && typeof ref !== "function" ? ref : localRef) as React.RefObject<BottomSheetModal>;

        const handlePresentModalPress = React.useCallback(() => {
            bottomSheetModalRef.current?.present();
        }, [bottomSheetModalRef]);

        return (
            <>
                {React.isValidElement(trigger)
                    ? React.cloneElement(trigger as any, !ref ? { onPress: handlePresentModalPress } : {})
                    : trigger
                }
                <BottomSheetModal
                    {...props}
                    ref={bottomSheetModalRef}
                    enableDismissOnClose={true}
                    stackBehavior="replace"
                    handleIndicatorStyle={{ backgroundColor: theme.secondaryText }}
                    backgroundStyle={{ backgroundColor: theme.secondary }}
                    backdropComponent={(backdropProps) => (
                        <BottomSheetBackdrop
                            {...backdropProps}
                            pressBehavior="close"
                            disappearsOnIndex={-1}
                            appearsOnIndex={0}
                            opacity={0.5}
                        />
                    )}
                >
                    <BottomSheetView className="flex-1 p-6">
                        {children}
                    </BottomSheetView>
                </BottomSheetModal>
            </>
        )
    }
);

export default BottomSheet;