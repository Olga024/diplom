import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

export const SearchWidget = () => {

    const [isSearchOpen, setIsSearchOpen] = useState(false);
    /*const navigate = useNavigate();

    const handleSearchValueChange = useCallback(() => {
if(searchValue.length > 0)
        setIsSearchOpen
    }, [])*/

    return (
        <form
            data-id="search-form"
            className="header-controls-search-form form-inline invisible"
           /* onSubmit={handleSearchValueChange}*/
            >
            <input
                className="form-control"
                placeholder="Поиск"
            />
        </form>
    );
};