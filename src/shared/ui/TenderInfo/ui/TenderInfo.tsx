import { cls } from '@/shared/lib/classes.lib';
import cl from './_TenderInfo.module.scss'
import { IHeadingToText } from '@/shared/model/text.model';

interface ITenderInfo {
    data: IHeadingToText[],
    hasDash?: boolean,
    className?: string
    classNameHeading?: string
    classNameText?: string
}

export const TenderInfo = ({
    data,
    hasDash = false,
    className,
    classNameHeading,
    classNameText
}: ITenderInfo) => {
    return (
        <div className={cls(cl.TenderInfo, className)}>
            {data.map(it => (<div className={cl.container} key={it.heading}>
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
