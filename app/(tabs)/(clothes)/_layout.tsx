import { Stack } from "expo-router";

export default function SearchStack(){
    return(
        <Stack>
            <Stack.Screen name="clothes" 
            options={{
                headerShown: false
            }}/>
            <Stack.Screen name="organizeUploads" options={{
                headerShown: false
            }} />
        </Stack>
    )
}