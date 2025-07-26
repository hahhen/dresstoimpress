import { Atom, atom, PrimitiveAtom } from "jotai"
import { ItemType } from "~/components/draggableItem"

// State of selected pieces
export const selectedPiecesAtom = atom({
    head: [] as string[],
    top: [] as string[],
    bottom: [] as string[],
    shoes: [] as string[],
    accessories: [] as string[],
    outfits: [] as string[],
})

export const clothesForUploadAtom = atom<PrimitiveAtom<ItemType>[]>([])

export const clothesForUploadValuesAtom = atom((get) =>
  get(clothesForUploadAtom).map((itemAtom) => get(itemAtom))
);