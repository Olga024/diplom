import { useCallback, useState } from "react"
import { useAppStateContext } from "../contexts/AppStateContext";

export const OrderForm = () => {
    const [phone, setPhone] = useState('');
    const [adress, setAdress] = useState('');
    const [agreementIsChecked, setAgreementIsChecked] = useState(false);

    const { itemsInCart, clearCart } = useAppStateContext();

    const handleSubmitOrder = useCallback(() => {
        if (!agreementIsChecked) {
            alert("Вы должны согласиться с правилами доставки.");
            return;
        }

        const orderData = {
            owner: {
                phone: phone.trim(),
                address: adress.trim(),
            },
            items: itemsInCart.map((item) => {
                [
                    {
                        id: item.id,
                        price: item.price,
                        count: item.quantity,
                    }
                ]
            })
        }

        fetch(`http://localhost:7070/api/order`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        })


            .then(response =>
                response.json())
            .then(data => {
                console.log('Заказ отправлен:', data);
                clearCart();
                alert('Ваш заказ принят!');
            })
            .catch(error => {
                console.error('Ошибка:', error);
                alert('Что-то пошло не так, попробуйте позже.');
            });
    }, [phone, adress, agreementIsChecked]);


    return <section className="order">
        <h2 className="text-center">Оформить заказ</h2>
        <div className="card"
            style={{
                maxWidth: "30rem",
                margin: "0 auto",
            }}>
            <form
                className="card-body"
                onSubmit={handleSubmitOrder}>
                <div className="form-group">
                    <label htmlFor="phone">Телефон</label>
                    <input
                        className="form-control"
                        id="phone"
                        placeholder="Ваш телефон"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Адрес доставки</label>
                    <input
                        className="form-control"
                        id="address"
                        placeholder="Адрес доставки"
                        value={adress}
                        onChange={(e) => setAdress(e.target.value)}
                    />
                </div>
                <div className="form-group form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="agreement"
                        checked={agreementIsChecked}
                        onChange={(e) => setAgreementIsChecked(e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="agreement">Согласен с правилами доставки</label>
                </div>
                <button
                    type="submit"
                    className="btn btn-outline-secondary"
                >Оформить
                </button>
            </form>
        </div>
    </section>
}