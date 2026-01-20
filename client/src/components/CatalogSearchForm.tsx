import { useCallback } from "react"

export const CatalogSearchForm = () => {
    

    const handleSearchInputSubmit = useCallback(()=>{},[])

    return <form className="catalog-search-form form-inline"
    /*onSubmit={handleSearchInputSubmit}*/
    >
                            <input className="form-control" placeholder="Поиск" />
                        </form>
}