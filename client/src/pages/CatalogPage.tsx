import { CatalogItems } from "../components/CatalogItems";
import { CatalogCategories } from "../components/CatalogCategories";
import { CatalogSearchForm } from "../components/CatalogSearchForm";

export const CatalogPage = () => {
    return <main className="container">
        <div className="col">
            <div className="row">
                <section className="catalog">
                    <h2 className="text-center">Каталог</h2>
                    <CatalogSearchForm />
                    <CatalogCategories />
                    <div className="row">
                        <CatalogItems />
                    </div>
                </section>
            </div>
        </div>
    </main>
}