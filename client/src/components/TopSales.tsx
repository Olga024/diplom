import { useCallback, useEffect, useState } from "react"
import type { TCatalogItem } from "./CatalogItems";

export const TopSales = () => {

    const [topSalesItems, setTopSalesItems] = useState<TCatalogItem[]>([]);

    const fetchTopSales = useCallback(() => {
        fetch('http://localhost:7070/api/top-sales')
            .then(response => {
                if (!response.ok) {
                    throw new Error('error on topSales fetch');
                }
                return response.json();
            })
            .then(data => {
                setTopSalesItems(data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [setTopSalesItems])

    useEffect(() => {
        fetchTopSales()
    }, [fetchTopSales])

    if (!topSalesItems.length) return null;

    return (topSalesItems.length ?
        <section className="top-sales">
            <h2 className="text-center">Хиты продаж!</h2>
            <div className="container">
                <div className="row">
                    {topSalesItems.map((item) => (
                        <div key={item.id} className="col-md-4 mb-4">
                            <div className="card catalog-item-card h-100">
                                <img src={item.images[0]} className="card-img-top img-fluid" alt={item.title} />
                                <div className="card-body d-flex flex-column justify-content-between">
                                    <div>
                                        <p className="card-title text-truncate">{item.title}</p>
                                        <p className="card-text fw-bold">{item.price.toLocaleString()} ₽</p>
                                    </div>
                                    <a href={`/products/${item.id}`} className="btn btn-outline-primary mt-auto">
                                        Заказать
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
        : null)

}