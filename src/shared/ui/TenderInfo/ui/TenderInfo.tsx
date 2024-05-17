import { cls } from '@/shared/lib/classes.lib';
import cl from './_TenderInfo.module.scss'
import { IHeadingToTextTender } from "@/shared/model/text.model";

interface ITenderInfo {
    data: IHeadingToTextTender[],
    hasDash?: boolean,
    className?: string,
    classNameContainer?:string,
    classNameHeading?: string
    classNameText?: string
}

export const TenderInfo = ({
    data,
    hasDash = false,
    className,
    classNameContainer,
    classNameHeading,
    classNameText
}: ITenderInfo) => {
    return (
        <div className={cls(cl.TenderInfo, className)}>
            {data.map(it => (<div className={cls(cl.container, classNameContainer)} key={it.heading}>
                <span className={cls(cl.heading, hasDash ? cl.sRegFontSize : '', classNameHeading)}>
                    {it.heading}
                    {!hasDash && ':'}
                </span>
                &nbsp;
                {hasDash && <>
                    -&nbsp;
                </>}
                <span className={cls(cl.text, hasDash ? cl.boldText : '', classNameText)}>{it.text}&nbsp;{it.unit}</span>
            </div>))}
        </div>
    )
}
