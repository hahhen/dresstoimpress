import FontAwesome from '@expo/vector-icons/FontAwesome';
import Avatar from 'assets/icons/Avatar';
import Shirt from 'assets/icons/Shirt';
import { Tabs } from 'expo-router';
import { Text, View } from 'react-native';
import Collections from 'assets/icons/Collections';
import {NAV_THEME} from "~/lib/constants"
import { useColorScheme } from '~/lib/useColorScheme';

export default function TabLayout() {
    const { isDarkColorScheme } = useColorScheme();
    const theme = isDarkColorScheme ? NAV_THEME.dark : NAV_THEME.light;
    return (
        <Tabs
            initialRouteName='(avatar)/index'
            screenOptions={{
                tabBarIconStyle: {
                    marginBottom: 10,
                },
                tabBarInactiveTintColor: theme.secondaryText,
                tabBarActiveTintColor: theme.primary, headerShown: false,
                tabBarLabelStyle:{
                    fontFamily: 'Inter_400Regular',
                },
                tabBarStyle: {
                    position: "absolute",
                    bottom: 30,
                    width: "90%",
                    marginLeft: "5%",
                    paddingTop: 10,
                    paddingBottom: 0,
                    height: 72,
                    backgroundColor: theme.secondary,
                    borderTopWidth: 0,
                    elevation: 5, // for Android
                    shadowOffset: {
                        width: 0, height: 0 // for iOS
                    },
                    borderRadius: 20,
                }
            }}>
            <Tabs.Screen
                name="(clothes)"
                options={{
                    title: 'Clothes',
                    tabBarIcon: ({ color }) => <Shirt width={40} fill={color} />,
                }}
            />
            <Tabs.Screen
                name="(avatar)/index"
                options={{
                    title: 'Avatar',
                    tabBarIcon: ({ color }) => <Avatar width={25} fill={color} />,
                }}
            />
            <Tabs.Screen
                name="(collections)/collections"
                options={{
                    title: 'Collections',
                    tabBarIcon: ({ color }) => <Collections width={30} fill={color} />,
                }}
            />
        </Tabs>
    );
}
