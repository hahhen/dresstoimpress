import { Animated, GestureResponderEvent, StyleProp, ViewStyle } from "react-native";
import * as React from "react";
import { useColorScheme } from "~/lib/useColorScheme";
import { LinearGradient } from 'expo-linear-gradient';
import { NAV_THEME } from "~/lib/constants";
import { cn } from "~/lib/utils";
import { Button } from '~/components/ui/button';
import BottomSheet from "@gorhom/bottom-sheet";

const IconButton = React.forwardRef(function IconButton(
    { children, className, buttonClassName, ...props }: { children?: React.ReactNode; className?: string, buttonClassName?: string } & React.ComponentProps<typeof Button>,
    ref: React.Ref<BottomSheet>
) {
    const { isDarkColorScheme } = useColorScheme();
    const theme = isDarkColorScheme ? NAV_THEME.dark : NAV_THEME.light;
    const scale = React.useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.spring(scale, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scale, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    return (
        <Animated.View style={{ transform: [{ scale }] }} className={cn("w-[5.5rem] aspect-square", className)}>
            <Button
                {...props}
                onPress={props.onPress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                className={cn("overflow-hidden aspect-square border border-secondary-foreground w-[5.5rem] rounded-[12px] flex justify-end py-2 relative", buttonClassName)}
                size={"custom"}
                variant={"secondary"}
            >
                <LinearGradient
                    colors={isDarkColorScheme ? ["#3B3748", theme.secondary] : [theme.secondary, "#EEE9F8"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    className="absolute inset-0 rounded-[12px]"
                />
                {children}
            </Button>
        </Animated.View>
    )
})

export function FreeHeightIconButton({ className, children, onPress }: { className?: string, children?: React.ReactNode, onPress?: () => void }) {
    const { isDarkColorScheme } = useColorScheme();
    const theme = isDarkColorScheme ? NAV_THEME.dark : NAV_THEME.light;
    const scale = React.useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.spring(scale, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scale, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };
    return (
        <Animated.View style={{ transform: [{ scale }] }} className={cn("w-[5.5rem]")}>
            <Button
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                onPress={onPress}
                className={cn(className, "overflow-hidden border border-secondary-foreground w-[5.5rem] rounded-[12px] flex py-2 relative")}
                size={"custom"}
                variant={"secondary"}
            >
                <LinearGradient
                    colors={isDarkColorScheme ? ["#3B3748", theme.secondary] : [theme.secondary, "#EEE9F8"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    className="absolute inset-0 rounded-[12px]"
                />
                {children}
            </Button>
        </Animated.View>
    )
}

export function FreeSizeIconButton({ className, children, onPress, style }: { className?: string, children?: React.ReactNode, onPress?: (e: GestureResponderEvent) => void, style?: StyleProp<ViewStyle>}) {
    const { isDarkColorScheme } = useColorScheme();
    const theme = isDarkColorScheme ? NAV_THEME.dark : NAV_THEME.light;
    const scale = React.useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.spring(scale, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scale, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };
    return (
        <Animated.View style={[{ transform: [{ scale }] }, style]} className={cn(className)}>
            <Button
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                onPress={onPress}
                className={cn(className, "overflow-hidden border border-secondary-foreground rounded-[12px] flex py-2 relative")}
                size={"custom"}
                variant={"secondary"}
                style={style}
            >
                <LinearGradient
                    colors={isDarkColorScheme ? ["#3B3748", theme.secondary] : [theme.secondary, "#EEE9F8"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    className="absolute inset-0 rounded-[12px]"
                />
                {children}
            </Button>
        </Animated.View>
    )
}

export default IconButton;