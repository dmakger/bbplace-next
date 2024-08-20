import cl from './_SupplierListPage.module.scss'
import { SupplierList } from "@/entities/Supplier";
import Wrapper1280 from "@/shared/ui/Wrapper/1280/Wrapper1280";

export default function SupplierListPage() {
    return (
        <Wrapper1280 classNameContent={cl.content}>
            <SupplierList/>
        </Wrapper1280>
    )
}
