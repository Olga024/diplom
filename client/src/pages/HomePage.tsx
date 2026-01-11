import { CatalogCategories } from "../components/CatalogCategories"
import { CatalogItems } from "../components/CatalogItems"
import { TopSales } from "../components/TopSales"

export const HomePage = () => {

    return <div className="row">
        <TopSales />
        <section className="catalog">
            <h2 className="text-center">Каталог</h2>
            <CatalogCategories />
            <div className="row">
                <CatalogItems />
            </div>
        </section>
    </div>
}