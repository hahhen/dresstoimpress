import { Animated } from "react-native";
import * as React from "react";
import { useColorScheme } from "~/lib/useColorScheme";
import { LinearGradient } from 'expo-linear-gradient';
import { NAV_THEME } from "~/lib/constants";
import { cn } from "~/lib/utils";
import { Button } from '~/components/ui/button';

const IconButton = React.forwardRef(function IconButton(
  { children, className, ...props }: { children?: React.ReactNode; className?: string } & React.ComponentProps<typeof Button>,
  ref: React.Ref<any>
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
                ref={ref}
                {...props}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                className="overflow-hidden aspect-square border border-secondary-foreground w-[5.5rem] rounded-[12px] flex justify-end py-2 relative"
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

export function FreeHeightIconButton({ className, children }: { className?: string, children?: React.ReactNode }) {
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

export function FreeSizeIconButton({ className, children }: { className?: string, children?: React.ReactNode }) {
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
        <Animated.View style={{ transform: [{ scale }] }} className={cn(className)}>
            <Button
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                className={cn(className, "overflow-hidden border border-secondary-foreground rounded-[12px] flex py-2 relative")}
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

export default IconButton;