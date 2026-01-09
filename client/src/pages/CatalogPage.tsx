import { CatalogItems } from "../components/CatalogItems"
import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import { Banner } from "../components/Banner"
import { CatalogCategories } from "../components/CatalogCategories"

export const CatalogPage = () => {
    return <>
        <Header />
        <main className="container">
            <div className="col">
                <Banner />
                <div className="row">
                    <section className="catalog">
                        <h2 className="text-center">Каталог</h2>
                        <form className="catalog-search-form form-inline">
                            <input className="form-control" placeholder="Поиск" />
                        </form>
                        <CatalogCategories />
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
        <Footer />
    </>
}