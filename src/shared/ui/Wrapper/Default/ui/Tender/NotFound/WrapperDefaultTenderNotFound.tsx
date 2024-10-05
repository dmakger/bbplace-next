import { FC } from "react"

import cl from './_WrapperDefaultTenderNotFound.module.scss'
import { IWrapperDefaultProps } from "../../../model/default.wrapper.model";
import { WrapperDefault } from "../../Default/WrapperDefault";
import { TENDER_ZERO__ICON } from "@/shared/ui/Icon/data/tender.data.icon";
import { ImageAPI } from "@/shared/ui/Image/API/ImageAPI";

interface WrapperDefaultTenderNotFoundProps extends IWrapperDefaultProps {}

export const WrapperDefaultTenderNotFound:FC<WrapperDefaultTenderNotFoundProps> = ({...rest}) => {
    return (
        <WrapperDefault {...rest} childrenDefault={(
            <ImageAPI 
                src={TENDER_ZERO__ICON.default} alt={"Tender zero"} 
                width={200} height={200}
                className={cl.image} />
        )} />
    )
}
