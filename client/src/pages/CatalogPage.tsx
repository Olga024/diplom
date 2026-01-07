import { useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { CatalogItems } from "../components/CatalogItems"

export const CatalogPage = () => {
    const navigate = useNavigate()
    return <>
        <main className="container">
            <div className="row">
                <div className="col">
                    <div className="banner">
                        <img src="./img/banner.jpg" className="img-fluid" alt="К весне готовы!" />
                        <h2 className="banner-header">К весне готовы!</h2>
                    </div>
                    <section className="catalog">
                        <h2 className="text-center">Каталог</h2>
                        <form className="catalog-search-form form-inline">
                            <input className="form-control" placeholder="Поиск" />
                        </form>
                        <ul className="catalog-categories nav justify-content-center">
                            <li className="nav-item">
                                {/*Категории каталога — GET http://localhost:7070/api/categories*/}
                                <a className="nav-link active" href="#">Все</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Женская обувь</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Мужская обувь</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Обувь унисекс</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Детская обувь</a>
                            </li>
                        </ul>
                        <div className="row">
                            <CatalogItems />
                        </div>
                        <div className="text-center">
                            <button className="btn btn-outline-primary">Загрузить ещё
                                {/* GET http://localhost:7070/api/items?offset=6*/}
                            </button>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    </>
}