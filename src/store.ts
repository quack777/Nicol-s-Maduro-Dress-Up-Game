import { create } from "zustand";

export type Item = { id: string; name: string; src: string };
export type Slot = "top" | "bottom" | "shoes";

export const TOPS: Item[] = [
  { id: "top-1", name: "Red Tee", src: "/assets/top-1.png" },
  { id: "top-2", name: "Nike Tech Jacket", src: "/assets/top-2.png" },
  { id: "top-3", name: "Green Hoodie", src: "/assets/top-3.png" },
];

export const BOTTOMS: Item[] = [
  { id: "bottom-1", name: "Charcoal Pants", src: "/assets/bottom-1.png" },
  { id: "bottom-2", name: "Nike Tech Pants", src: "/assets/bottom-2.png" },
  { id: "bottom-3", name: "Brown Cargo", src: "/assets/bottom-3.png" },
];

export const SHOES: Item[] = [
  { id: "shoes-1", name: "White Kicks", src: "/assets/shoes-1.png" },
  { id: "shoes-2", name: "Black Airs", src: "/assets/shoes-2.png" },
  { id: "shoes-3", name: "Gold Runners", src: "/assets/shoes-3.png" },
];

const pickRandom = (items: Item[]) => items[Math.floor(Math.random() * items.length)].id;

type DressState = {
  topId: string;
  bottomId: string;
  shoesId: string;
  setSlot: (slot: Slot, id: string) => void;
  setPreset: () => void;
  randomize: () => void;
};

export const useDressStore = create<DressState>((set) => ({
  topId: TOPS[0].id,
  bottomId: BOTTOMS[0].id,
  shoesId: SHOES[0].id,
  setSlot: (slot, id) =>
    set((state) => {
      if (slot === "top") return { ...state, topId: id };
      if (slot === "bottom") return { ...state, bottomId: id };
      return { ...state, shoesId: id };
    }),
  setPreset: () =>
    set({
      topId: TOPS[1].id,
      bottomId: BOTTOMS[1].id,
      shoesId: SHOES[1].id,
    }),
  randomize: () =>
    set({
      topId: pickRandom(TOPS),
      bottomId: pickRandom(BOTTOMS),
      shoesId: pickRandom(SHOES),
    }),
}));
