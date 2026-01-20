import { useCallback, useEffect, useState } from "react";

type TProduct = {
    id: number;
    category: number;
    title: string;
    images: string[];
    sku: string;
    manufacturer: string;
    color: string;
    material: string;
    reason: string;
    season: string;
    heelSize: string;
    price: number;
    sizes: {
        size: string;
        available: boolean;
    }[];
};

type TProductPageProps = {
    id: number;
}

export const ProductPage: React.FC<TProductPageProps> = ({ id }) => {

    const [product, setProduct] = useState<TProduct | null>(null);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        fetch(`http://localhost:7070/api/items/${id}`)
            .then(response => response.json())
            .then(data => setProduct(data))
            .catch(error => console.error('Ошибка при загрузке товара:', error));
    }, [id])

    const handleSizeSelect = useCallback((size: string) => {
        setSelectedSize(size);
    }, [])

    const handleQuantityChange = useCallback((change: number) => {
        setQuantity(prevQuantity => Math.max(1, Math.min(10, prevQuantity + change)));
    }, [])


    const handleAddToCart = useCallback(() => {
        window.location.href = '/cart.html'
    },
        [])

    if (!product) {
        return <div>Лоадер сюда...</div>;
    }

    const allSizes = product.sizes

    const isSelectedSizeAvailable = selectedSize && allSizes.find(size => size.size === selectedSize && size.available);

    return (
        <section className="catalog-item">
            <h2 className="text-center">{product.title}</h2>
            <div className="row">
                <div className="col-5">
                    <img src={product.images[0]} className="img-fluid" alt={product.title} />
                </div>
                <div className="col-7">
                    <table className="table table-bordered">
                        <tbody>
                            <tr>
                                <td>Артикул</td>
                                <td>{product.sku}</td>
                            </tr>
                            <tr>
                                <td>Производитель</td>
                                <td>{product.manufacturer}</td>
                            </tr>
                            <tr>
                                <td>Цвет</td>
                                <td>{product.color}</td>
                            </tr>
                            <tr>
                                <td>Материалы</td>
                                <td>{product.material}</td>
                            </tr>
                            <tr>
                                <td>Сезон</td>
                                <td>{product.season}</td>
                            </tr>
                            <tr>
                                <td>Повод</td>
                                <td>{product.reason}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="text-center">
                        {allSizes.length > 0 && (
                            <>
                                <p>
                                    Размеры в наличии:{' '}
                                    {allSizes.map(size => (
                                        <span
                                            key={size.size}
                                            className={`catalog-item-size ${selectedSize === size.size ? 'selected' : ''}`}
                                            onClick={() => handleSizeSelect(size.size)}
                                        >
                                            {size.size}
                                        </span>
                                    ))}
                                </p>
                                {isSelectedSizeAvailable && selectedSize && (
                                    <p>
                                        Количество:{' '}
                                        <span className="btn-group btn-group-sm pl-2">
                                            <button
                                                className="btn btn-secondary"
                                                onClick={() => handleQuantityChange(-1)}>
                                                -
                                            </button>
                                            <span className="btn btn-outline-primary">
                                                {quantity}
                                            </span>
                                            <button
                                                className="btn btn-secondary"
                                                onClick={() => handleQuantityChange(1)}>
                                                +
                                            </button>
                                        </span>
                                    </p>
                                )}
                            </>
                        )}
                        {isSelectedSizeAvailable && (
                            <button
                                className="btn btn-danger btn-block btn-lg"
                                onClick={handleAddToCart}
                            >
                                В корзину
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}