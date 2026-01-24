import { createContext, useContext, useState, type ProviderProps } from "react";

export type TItemInCart = {
  id: number;
  title: string;
  size: string;
  quantity: number;
  totalPrice: number;
}

type TAppStateContext = {
  itemsInCart: TItemInCart[];
  addItemToCart: (item: TItemInCart) => void;
  removeItemFromCart: (itemID: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<TAppStateContext | undefined>(undefined)

type TAppStateContextParams = {};

export const AppStateProvider = ({ children }: ProviderProps<TAppStateContextParams>) => {

  const [itemsInCart, setItemsInCart] = useState<TItemInCart[]>([]);

  const addItemToCart = (newItem: TItemInCart) => {
    setItemsInCart((prevItems) => [...prevItems, newItem]);
  };

  const removeItemFromCart = (itemID: number) => {
    setItemsInCart((prevItems) =>
      prevItems.filter((item) => item.id !== itemID)
    );
  };

  const clearCart = () => {
    setItemsInCart([]);
  };

  return <CartContext.Provider value={{
    itemsInCart,
    addItemToCart,
    removeItemFromCart,
    clearCart
  }}>
    {children}
  </CartContext.Provider>
}

export const useAppStateContext = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error(
      "useAppState must be used within a AppStateProvider"
    )
  }
  return context;
};