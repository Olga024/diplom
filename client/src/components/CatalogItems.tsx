import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

type TCatalogItem = {
    id: number,
    category: number,
    title: string,
    price: number,
    images: string[],
}

export const CatalogItems = () => {
    const [catalogItems, setCatalogItems] = useState<TCatalogItem[]>([])
    const navigate = useNavigate()

    const fetchCatalogItems = useCallback(() => {
        fetch("http://localhost:7070/api/items")
            .then(response => {
                if (!response.ok) {
                    throw new Error('error on catalog fetch');
                }
                return response.json();
            })
            .then(data => {
                setCatalogItems(data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [setCatalogItems])

    useEffect(() => {
        fetchCatalogItems()
    }, [fetchCatalogItems])

    return <>
        <div className="container">
            <div className="row">
                {catalogItems.map(item => (
                    <div key={item.id} className="col-4">
                        <div className="card catalog-item-card">
                            <img src={item.images[0]} className="card-img-top img-fluid" alt={item.title} />
                            <div className="card-body">
                                <p className="card-text">{item.title}</p>
                                <p className="card-text">{item.price} руб.</p>
                                <a href={`/products/${item.id}.html`} className="btn btn-outline-primary"
                                    /*onClick={useCallback(() => {
                                        navigate("/catalog/:id.html")
                                    }, [navigate])}*/
                                >Заказать</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </>
}