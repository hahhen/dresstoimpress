import * as ImagePicker from 'expo-image-picker';

export async function pickImage() {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
        return result.assets[0].uri;
    }
};

export async function openCamera() {
    const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
        quality: 1,
    });
    if (!result.canceled) {
        // result.assets[0].uri is the photo URI
        return result.assets[0].uri;
    }
}