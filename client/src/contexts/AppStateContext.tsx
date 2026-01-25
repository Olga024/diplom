import { createContext, useContext, useState, type ProviderProps } from "react";

export type TItemInCart = {
  id: number;
  title: string;
  size: string;
  quantity: number;
  price: number;
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

  const [itemsInCart, setItemsInCart] = useState<TItemInCart[]>(JSON.parse(localStorage.getItem("cart") || "[]"));

  const addItemToCart = (newItem: TItemInCart) => {
    setItemsInCart((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.id === newItem.id && item.size === newItem.size
      );
      if (existingItemIndex >= 0) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += newItem.quantity;
        updatedItems[existingItemIndex].totalPrice += newItem.price * newItem.quantity;
        return updatedItems;
      } else {
        const newState = [...prevItems, newItem];
        localStorage.setItem("cart", JSON.stringify(newState));
        return newState;
      }
    });
  };

  const removeItemFromCart = (itemID: number) => {
    setItemsInCart((prevItems) => {
      const newState = prevItems.filter((item) => item.id !== itemID)
      localStorage.setItem("cart", JSON.stringify(newState));
      return newState;
    });
  };

  const clearCart = () => {
    setItemsInCart([]);
    localStorage.removeItem("cart");
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