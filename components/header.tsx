import { useKindeAuth } from "@kinde/expo";
import { Pressable, View } from "react-native";
import { Text } from "~/components/ui/text";
import { Image } from "expo-image";
import { getUserProfile, UserProfile, getRawToken } from "@kinde/expo/utils";
import * as React from "react";
import { account, functions } from "~/lib/client";
import { AppwriteException } from "react-native-appwrite";

export default function Header() {
    const kinde = useKindeAuth();
    const { isAuthenticated } = kinde;
    const [user, setUser] = React.useState<UserProfile | null>(null);

    const handleSignIn = async () => {
        await kinde.login();
    };

    const checkUserProfile = async () => {
        const profile = await getUserProfile();
        return profile;
    };

    const handleSignOut = async () => {
        await kinde.logout();
        await account.deleteSession('current');
    };

    const makeAppWriteSession = async () => {
        try {
            const appWriteSession = await account.getSession('current');
        } catch (error) {
            if (error instanceof AppwriteException && error.code === 401) {
                const rawToken = await getRawToken();
                const appwriteUserIdAndToken = await functions.createExecution(
                    process.env.EXPO_PUBLIC_APPWRITE_FUNCTION_KINDE_SESSION!,
                    JSON.stringify({ kindeToken: rawToken }),
                    false
                );
                const body = JSON.parse(appwriteUserIdAndToken.responseBody);
                try {
                    await account.createSession(body.userId, body.secret);
                } catch (error) {
                    console.error("Error creating session:", error);
                }
            } else {
                console.error('An unexpected error occurred:', error);
            }
        }
    }

    React.useEffect(() => {
        if (isAuthenticated) {
            makeAppWriteSession();
            checkUserProfile().then((profile) => {
                setUser(profile);
            });
        } else {
            setUser(null);
            account.deleteSession('current');
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