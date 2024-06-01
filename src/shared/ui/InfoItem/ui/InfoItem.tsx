import { cls } from "@/shared/lib/classes.lib"
import cl from './_InfoItem.module.scss'
import { ReactNode } from "react"
import { ESize } from "@/shared/model/size.model"
import { EInfoItemColor } from "../model/infoItem.model"

interface IInfoItem {
    className?: string,
    heading?: string,
    classNameHeading?: string,
    body: ReactNode | string,
    color?: EInfoItemColor
    size?: ESize
}

export const InfoItem = ({
    className,
    heading,
    body,
    color = EInfoItemColor.DEFAULT,
    size = ESize.MEDIUM

}: IInfoItem) => {
    return (
        <div className={cls(cl.InfoItem, className, cl[color], cl[size])}>
            {heading && <>
                <span className={cl.heading}>
                    {heading}
                </span>
                &nbsp;
            </>
            }
            <span className={cl.body}>
                {body}
            </span>
        </div>
    )
}
