import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAppStateContext } from "../contexts/AppStateContext";

export const CartWidget = () => {

    const { itemsInCart } = useAppStateContext();

    const navigate = useNavigate();

    const totalItemsInCart = itemsInCart.reduce(
        (total, currentItem) => total + currentItem.quantity,
        0
    );

    return <div className="header-controls-pic header-controls-cart"
        onClick={useCallback(() => {
            navigate("/cart.html", {
                replace: false,
            });
        }, [navigate])}
    >
        {totalItemsInCart > 0 &&
            (<div className="header-controls-cart-full">
                {totalItemsInCart | 0}</div>
            )}
        <div className="header-controls-cart-menu"></div>
    </div>
}