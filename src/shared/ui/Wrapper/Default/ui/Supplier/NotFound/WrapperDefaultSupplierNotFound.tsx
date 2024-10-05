import { FC } from "react"

import cl from './_WrapperDefaultSupplierNotFound.module.scss'
import { IWrapperDefaultProps } from "../../../model/default.wrapper.model";
import { WrapperDefault } from "../../Default/WrapperDefault";
import { ImageAPI } from "@/shared/ui/Image/API/ImageAPI";
import { SUPPLIER_ZERO__ICON } from "@/shared/ui/Icon/data/supplier.data.icon";

interface WrapperDefaultSupplierNotFoundProps extends IWrapperDefaultProps {}

export const WrapperDefaultSupplierNotFound:FC<WrapperDefaultSupplierNotFoundProps> = ({...rest}) => {
    return (
        <WrapperDefault {...rest} childrenDefault={(
            <ImageAPI 
                src={SUPPLIER_ZERO__ICON.default} alt={"Supplier zero"} 
                width={200} height={200}
                className={cl.image} />
        )} />
    )
}
