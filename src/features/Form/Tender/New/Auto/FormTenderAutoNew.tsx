import { FC } from "react"

import { ETenderType } from "@/entities/Tender/model/tender.model";
import { FormTenderPurchaseNew } from "../Purchase/FormTenderPurchaseNew";
import { FormTenderSaleNew } from "../Sale/FormTenderSaleNew";

interface FormTenderAutoNewProps{
    type: ETenderType
    className?: string,
}

export const FormTenderAutoNew:FC<FormTenderAutoNewProps> = ({type, ...rest}) => {
    if (type === ETenderType.SALE)
        return <FormTenderSaleNew {...rest} />
    return <FormTenderPurchaseNew {...rest} />
}
