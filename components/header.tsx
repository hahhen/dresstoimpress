import { useKindeAuth } from "@kinde/expo";
import { Pressable, View } from "react-native";
import { Text } from "~/components/ui/text";
import { Image } from "expo-image";
import { getUserProfile, getFlag, getRoles, UserProfile } from "@kinde/expo/utils";
import * as React from "react";

export default function Header() {
    const kinde = useKindeAuth();
    const { isAuthenticated } = kinde;
    const [user, setUser] = React.useState<UserProfile | null>(null);

    const handleSignIn = async () => {
        const token = await kinde.login();
        if (token) {
            // User was authenticated
        }
    };

    const checkUserProfile = async () => {
        const profile = await getUserProfile();
        return profile;
    };

    const handleSignOut = async () => {
        await kinde.logout();
    };

    React.useEffect(() => {
        if (isAuthenticated) {
            checkUserProfile().then(profile => {
                setUser(profile);
                console.log(profile)
            });
        }else{
            setUser(null);
        }
    }, [isAuthenticated]);
    return (
        <View className='h-16 flex flex-row items-center justify-between'>
            <Text className='text-muted'>tiny closet</Text>
            {!isAuthenticated ?
                <Pressable onPress={handleSignIn}>
                    <View className='bg-secondary rounded-full w-12 h-12'></View>
                </Pressable>
                :
                <Pressable onPress={handleSignOut}>
                    <View className='flex flex-row items-center gap-2'>
                        <Text className="text-xs">{user?.givenName}</Text>
                        <View className='bg-secondary rounded-full w-12 h-12 overflow-hidden'>
                            <Image style={{ flex: 1 }} source={{ uri: user?.picture }} />
                        </View>
                    </View>
                </Pressable>
            }
        </View>
    )
}