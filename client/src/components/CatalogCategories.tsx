import { useCallback, useEffect, useState } from "react";

type TCategory = {
    id: number,
    title: string,
}

export const CatalogCategories = () => {

    const [categories, setCategories] = useState<TCategory[]>([]);

    const fetchCategories = useCallback(() => {
        fetch('http://localhost:7070/api/categories')
            .then(response => {
                if (!response.ok) {
                    throw new Error('error on catalog fetch');
                }
                return response.json()
            })
            .then(data => {
                setCategories(data)
            })
            .catch(error => {
                console.error(error);
            });
    }, [setCategories])

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories])

    return <ul className="catalog-categories nav justify-content-center">
        {categories.map((category) => (
            <li key={category.id} className="nav-item">
                <a className="nav-link" href={`#${category.title}`}>{category.title}</a>
            </li>
        ))}
    </ul>
}