import { FC } from "react"

import cl from './_WrapperDefaultChatNotFound.module.scss'
import { IWrapperDefaultProps } from "../../../model/default.wrapper.model";
import { WrapperDefault } from "../../Default/WrapperDefault";
import { CHAT_ZERO__ICON } from "@/shared/ui/Icon/data/chat.data.icon";
import { ImageAPI } from "@/shared/ui/Image/API/ImageAPI";

interface WrapperDefaultChatNotFoundProps extends IWrapperDefaultProps {}

export const WrapperDefaultChatNotFound:FC<WrapperDefaultChatNotFoundProps> = ({...rest}) => {
    return (
        <WrapperDefault {...rest} childrenDefault={(
            <ImageAPI 
                src={CHAT_ZERO__ICON.default} alt={"Chat zero"} 
                width={200} height={200}
                className={cl.image} />
        )} />
    )
}
