import { useCallback, useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom";

export type TCatalogItem = {
    id: number,
    category: number,
    title: string,
    price: number,
    images: string[],
}

const ALL_CATEGORIES_ID = 0;

export const CatalogItems = () => {
    const [catalogItems, setCatalogItems] = useState<TCatalogItem[]>([]);

    const [currentCategoryId, setCurrentCategoryId] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [isNextPage, setIsNextPage] = useState(true);

    const [searchParams] = useSearchParams();

    const getNextPageHandler = useCallback(() => {
        setCurrentPage((state) => {
            const newPage = state + 1;
            console.log({ newPage })
            return newPage;
        });
    }, [setCurrentPage]);

    useEffect(() => {
        setCatalogItems([]);
        setCurrentPage(0);
        setCurrentCategoryId(Number(searchParams.get('cid')));
    }, [searchParams]);

    useEffect(() => {
        const url = new URL(`http://localhost:7070/api/items`);
        console.log({ currentCategoryId, currentPage });

        if (currentPage > 0) {
            url.searchParams.append('offset', String(currentPage * 6));
        }

        if (currentCategoryId !== undefined && currentCategoryId !== ALL_CATEGORIES_ID) {
            url.searchParams.append('categoryId', String(currentCategoryId));
        }

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Ошибка при загрузке товаров (${response.status})`);
                }
                return response.json();
            })
            .then((data: TCatalogItem[]) => {
                setCatalogItems((state) => ([...state, ...data]));
                setIsNextPage(data && data.length > 5);
            })
            .catch(error => {
                console.error(error);
            });
    }, [
        currentPage,
        currentCategoryId,
        setCatalogItems,
        setIsNextPage,
    ]);

    return <>
        <div className="container">
            <div className="row">
                {catalogItems.map((item, i) => (
                    <div key={`${i}-${item.id}`} className="col-4">
                        <div className="card catalog-item-card">
                            <img src={item.images[0]} className="card-img-top img-fluid" alt={item.title} />
                            <div className="card-body">
                                <p className="card-text">{item.title}</p>
                                <p className="card-text">{item.price} руб.</p>
                                <a href={`/products/${item.id}.html`} className="btn btn-outline-primary"
                                >Заказать</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="text-center">
                <button
                    className="btn btn-outline-primary"
                    disabled={!isNextPage}
                    onClick={getNextPageHandler}
                >
                    Загрузить ещё
                </button>
            </div>
        </div>
    </>
}