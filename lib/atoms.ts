import { atom } from "jotai"

// State of selected pieces
export const selectedPiecesAtom = atom({
    head: [] as string[],
    top: [] as string[],
    bottom: [] as string[],
    shoes: [] as string[],
    accessories: [] as string[],
    outfits: [] as string[],
})