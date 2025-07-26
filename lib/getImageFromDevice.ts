import * as ImagePicker from 'expo-image-picker';

export async function pickImage() {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        quality: 0.5,
        allowsMultipleSelection: true,
        base64: true,
    });

    if (!result.canceled) {
        return result.assets;
    }
};

export async function openCamera() {
    const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
        quality: 0.5,
        allowsMultipleSelection: true,
        base64: true,
    });
    if (!result.canceled) {
        return result.assets;
    }
}