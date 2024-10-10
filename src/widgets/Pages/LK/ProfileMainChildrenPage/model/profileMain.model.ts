import { IProduct } from "@/entities/Product/model/product.model";
import { ISupplier } from "@/entities/Supplier/model/supplier.model";
import { ECurrentLK } from "@/entities/User/model/user.model";
import { IBlockCabinetModule } from "@/features/Block/Cabinet/Module/ui/BlockCabinetModule";

export interface IProfileMain{
    className?: string,
    currentLK: ECurrentLK,
    fullName: string,
    email: string,
    phoneNumber?: string,
    profileMessageArray?: string[],
    cabinetModuleArray: IBlockCabinetModule[],
    productList: IProduct[]
    userAsSupplier: ISupplier
}