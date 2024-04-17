import { SupplierList } from "@/entities/Supplier";
import { ECatalogVariants, SortFilterSidebar } from "@/widgets/SortFilterSidebar";

export default function MainPage() {
    return (
        <div>
            {/* <SortFilterSidebar variant={ECatalogVariants.PRODUCTS}/> */}
            <SupplierList/>
        </div>
    )
}
