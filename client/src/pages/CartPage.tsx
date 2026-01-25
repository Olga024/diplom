import { Cart } from "../components/Cart"
import { OrderForm } from "../components/OrderForm"
import { useAppStateContext } from "../contexts/AppStateContext"

export const CartPage = () => {

    const { itemsInCart } = useAppStateContext();

    return <>
        <Cart />
        {itemsInCart.length > 0 &&
            <OrderForm />}
    </>
}