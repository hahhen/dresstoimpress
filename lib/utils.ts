import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ItemType } from '~/components/draggableItem';
import { functions } from './client';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function createRows(list: any[], columns: number) {
    const rows = Math.floor(list.length / columns); // [A]
    let lastRowElements = list.length - rows * columns; // [B]
    while (lastRowElements !== columns) { // [C]
        list.push(0);
        lastRowElements += 1; // [E]
    }
    return list; // [F]
}

export async function generateImages(item: ItemType, view: number) {
    console.log("Generating front images for item:", item.id);
    const { responseBody } = await functions.createExecution(
        process.env.EXPO_PUBLIC_APPWRITE_FUNCTION_IMAGE_GEN!,
        JSON.stringify({
            view: view,
            images: [
                ...(item.type == "icon" ?
                    [{
                        mimeType: item.itemFile?.mimeType,
                        data: item.itemFile?.base64,
                    }]
                    :
                    item.items?.map((folderItem) => ({
                        mimeType: folderItem?.itemFile?.mimeType,
                        data: folderItem?.itemFile?.base64,
                    })) || []),
                ...(view != 0
                    ? [{
                        mimeType: 'image/jpeg',
                        data: item.generatedImages?.front?.[0]
                    }]
                    : [])
            ]
        }),
        false
    )

    const res: { success: boolean, images: string[] } = JSON.parse(responseBody);

    console.log("Response gotten:", res.success);

    return res;
}

export async function generateMeshy(item: ItemType) {
    console.log("Generating 3D Model for item:", item.id);

    const { responseBody } = await functions.createExecution(
        process.env.EXPO_PUBLIC_APPWRITE_FUNCTION_3D_MODEL_GEN!,
        JSON.stringify({
            images: [
                "data:image/jpeg;base64," + item.generatedImages?.front?.[0],
                "data:image/jpeg;base64," + item.generatedImages?.left?.[0],
                "data:image/jpeg;base64," + item.generatedImages?.right?.[0],
                "data:image/jpeg;base64," + item.generatedImages?.back?.[0]
            ]
        }),
        false
    )

    const res: { success: boolean, model: any } = JSON.parse(responseBody);

    console.log("Response gotten:", res.success);

    return res;
}