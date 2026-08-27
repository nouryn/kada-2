import { create } from "zustand";

export type FavouriteProduct = {
  id: number;
  [key: string]: unknown;
};

type FavouriteStore = {
  favourites: FavouriteProduct[];
  addFavourite: (product: FavouriteProduct) => void;
  removeFavourite: (productId: number) => void;
  toggleFavourite: (product: FavouriteProduct) => void;
};

export const useFavouriteStore = create<FavouriteStore>((set) => ({
  favourites: [],
  addFavourite: (product) =>
    set((state) =>
      state.favourites.some((item) => item.id === product.id)
        ? state
        : { favourites: [...state.favourites, product] },
    ),
  removeFavourite: (productId) =>
    set((state) => ({
      favourites: state.favourites.filter((item) => item.id !== productId),
    })),
  toggleFavourite: (product) =>
    set((state) => {
      const alreadyFavourite = state.favourites.some(
        (item) => item.id === product.id,
      );

      return {
        favourites: alreadyFavourite
          ? state.favourites.filter((item) => item.id !== product.id)
          : [...state.favourites, product],
      };
    }),
}));
