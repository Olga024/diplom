import { useCallback, useEffect, useState } from "react";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";

type TCategory = {
    id: number,
    title: string,
}

const ALL_CATEGORIES_ID = 0;

export const CatalogCategories = () => {

    const [categories, setCategories] = useState<TCategory[]>([]);

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const handleNavigateLink = useCallback((categoryId: number) => {
        navigate({
            pathname: `/catalog.html`,
            search: `?${(categoryId > 0) ? createSearchParams({ cid: String(categoryId) }) : ''}`
        })
    }, [navigate]);

    const fetchCategories = useCallback(() => {
        fetch('http://localhost:7070/api/categories')
            .then(response => {
                if (!response.ok) {
                    throw new Error('error on catalog fetch');
                }
                return response.json()
            })
            .then(data => {
                setCategories(([{ id: ALL_CATEGORIES_ID, title: 'Все' }, ...data]))
            })
            .catch(error => {
                console.error(error);
            });
    }, [])


    useEffect(() => {
        fetchCategories();
    }, [fetchCategories])

    return (
        <ul className="catalog-categories nav justify-content-center">
            {categories.map((category) => (
                <li key={category.id} className="nav-item active">
                    <a
                        className={[
                            "nav-link",
                            (searchParams.get('cid') == String(category.id))
                                ? 'active'
                                : ''
                        ].join(' ')}
                        onClick={() => { handleNavigateLink(category.id) }}
                    >{category.title}</a>
                </li>
            ))}
        </ul>
    )
}