import { FavouriteType } from "@/entities/Favourite/data/favourite.data";
import { ButtonFavourite, ButtonFavouriteProps } from "@/shared/ui/Button/data/Favourite/ButtonFavourite";
import { ISupplier } from "@/entities/Supplier/model/supplier.model";

interface IFavouriteToSupplierButton extends ButtonFavouriteProps {
    supplierId: ISupplier['id']
}

export const FavouriteToSupplierButton = ({
    supplierId,
     ...props
}:IFavouriteToSupplierButton) => {
    return (
        <ButtonFavourite {...props} body={{objectId: +supplierId, objectType: FavouriteType.Supplier}} />
    )
}
