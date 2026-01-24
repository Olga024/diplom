import { useAppStateContext } from "../contexts/AppStateContext"

export const Cart = () => {

    const { itemsInCart, removeItemFromCart } = useAppStateContext();

    return <>
        <section className="cart">
            <h2 className="text-center">Корзина</h2>
            {itemsInCart.length === 0 ? (
                <p>Нет товаров в корзине</p>
            ) : (
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Название</th>
                            <th scope="col">Размер</th>
                            <th scope="col">Количество</th>
                            <th scope="col">Стоимость</th>
                            <th scope="col">Итого</th>
                            <th scope="col">Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {itemsInCart.map((item, idx) => (
                            <tr key={idx}>
                                <td scope="row">{idx + 1}</td>
                                <td><a href={`/products/${item.id}.html`}>{item.title}</a></td>
                                <td>{item.size}</td>
                                <td>{item.quantity}</td>
                                <td>{item.totalPrice.toLocaleString()} руб.</td>
                                <td>{item.totalPrice.toLocaleString()} руб.</td>
                                <td>
                                    <button
                                        className="btn btn-outline-danger btn-sm"
                                        onClick={() => removeItemFromCart(item.id)}
                                    >
                                        Удалить
                                    </button>
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan={5} className="text-right">Общая стоимость:</td>
                            <td>
                                {itemsInCart.reduce((acc, curr) => acc + curr.totalPrice, 0).toLocaleString()}
                                руб.
                            </td>
                        </tr>
                    </tbody>
                </table>
            )}
        </section>
        <section className="order">
            {/* форма оформления заказа */}
        </section>
    </>
}