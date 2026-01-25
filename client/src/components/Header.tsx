import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { CartWidget } from "./CartWidget";
import { SearchWidget } from "./SearchWidget";

export const Header = () => {
    const navigate = useNavigate();

    return (
        <header className="container">
            <div className="row">
                <div className="col">
                    <nav className="navbar navbar-expand-sm navbar-light bg-light">
                        <a className="navbar-brand"
                            onClick={useCallback(() => {
                                navigate("/", {
                                    replace: true,
                                })
                            }, [navigate])}>
                            <img src="/html/img/header-logo.png" alt="Bosa Noga" />
                        </a>
                        <div className="collapase navbar-collapse" id="navbarMain">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <a className="nav-link"
                                        onClick={useCallback(() => {
                                            navigate("/", {
                                                replace: true,
                                            })
                                        }, [navigate])}>
                                        Главная</a>
                                </li>
                                <li className="nav-item active">
                                    <a className="nav-link"
                                        onClick={useCallback(() => {
                                            navigate("/catalog.html", {
                                                replace: false,
                                            })
                                        }, [navigate])}>
                                        Каталог</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link"
                                        onClick={useCallback(() => {
                                            navigate("/about.html", {
                                                replace: false,
                                            });
                                        }, [navigate])}>
                                        О магазине</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link"
                                        onClick={useCallback(() => {
                                            navigate("/contacts.html", {
                                                replace: false,
                                            });
                                        }, [navigate])}>
                                        Контакты</a>
                                </li>
                            </ul>
                            <div>
                                <div className="header-controls-pics">
                                    <div data-id="search-expander" className="header-controls-pic header-controls-search"></div>
                                    <CartWidget />
                                </div>
                                <SearchWidget />
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )
}