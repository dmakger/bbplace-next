import { EViewProduct } from "@/entities/Product/model/view.product.model";
import { ProductList } from "@/entities/Product/ui/List/ProductList";
import Wrapper1280 from "@/shared/ui/Wrapper/1280/Wrapper1280";

export default function ProductPage() {    
    return (
        <Wrapper1280>
            <ProductList view={EViewProduct.VERTICAL}/>
        </Wrapper1280>
    )
}
