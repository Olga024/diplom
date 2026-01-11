import { CatalogItems } from "../components/CatalogItems";
import { CatalogCategories } from "../components/CatalogCategories";

export const CatalogPage = () => {
    return <main className="container">
        <div className="col">
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
                </section>
            </div>
        </div>
    </main>
}