import { createContext, useContext, useState, type ProviderProps } from "react";

type TItemInCart = {
  id: number;
  title: string;
  size: string;
  quantity: number;
  totalPrice: number;
}

type TAppStateContext = {
  itemInCart: TItemInCart | null;
  setItemInCart: (itemInCart: TItemInCart | null) => void;
}

// @ts-expect-error
const Context = createContext<TAppStateContext>(null);

export const AppStateProvider = ({ children }: ProviderProps<any>) => {

  const [itemInCart, setItemInCart] = useState<TAppStateContext['itemInCart']>(null);

  return <Context.Provider value={{
    itemInCart,
    setItemInCart,
  }}>
    {children}
  </Context.Provider>
}

export const useAppStateContext = () => {
  const context = useContext(Context)
  if (!context) {
    throw new Error(
      "useAppState must be used within a AppStateProvider"
    )
  }
  return context;
};