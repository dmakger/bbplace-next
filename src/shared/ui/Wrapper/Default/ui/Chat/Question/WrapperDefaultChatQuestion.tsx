import { FC } from "react"

import cl from './_WrapperDefaultChatQuestion.module.scss'
import { IWrapperDefaultProps } from "../../../model/default.wrapper.model";
import { WrapperDefault } from "../../Default/WrapperDefault";
import { CHAT_QUESTION__ICON } from "@/shared/ui/Icon/data/chat.data.icon";
import { ImageAPI } from "@/shared/ui/Image/API/ImageAPI";

interface WrapperDefaultChatQuestionProps extends IWrapperDefaultProps {}

export const WrapperDefaultChatQuestion:FC<WrapperDefaultChatQuestionProps> = ({...rest}) => {
    return (
        <WrapperDefault {...rest} childrenDefault={(
            <div className={cl.content}>
                <ImageAPI 
                    src={CHAT_QUESTION__ICON.default} alt={"Chat question"} 
                    width={200} height={200}
                    className={cl.image} />
                <span className={cl.text}>{"Выберите собеседника"}</span>
            </div>
        )} />
    )
}
