import { FC } from "react"

import cl from './_WrapperDefaultProductNotFound.module.scss'
import { IWrapperDefaultProps } from "../../../model/default.wrapper.model";
import { WrapperDefault } from "../../Default/WrapperDefault";
import { ImageAPI } from "@/shared/ui/Image/API/ImageAPI";
import { PRODUCT_ZERO__ICON } from "@/shared/ui/Icon/data/product.data.icon";

interface WrapperDefaultProductNotFoundProps extends IWrapperDefaultProps {}

export const WrapperDefaultProductNotFound:FC<WrapperDefaultProductNotFoundProps> = ({...rest}) => {
    return (
        <WrapperDefault {...rest} childrenDefault={(
            <ImageAPI src={PRODUCT_ZERO__ICON.default} alt={"Product zero"} className={cl.image} />
        )} />
    )
}
