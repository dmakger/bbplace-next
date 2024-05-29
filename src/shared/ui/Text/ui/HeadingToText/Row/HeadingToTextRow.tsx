import cl from './_HeadingToTextRow.module.scss'
import { cls } from '@/shared/lib/classes.lib';
import { IHeadingToText } from "@/shared/model/text.model";

interface IHeadingToTextRow{
    heading: IHeadingToText['heading']
    text: IHeadingToText['body'],
    unit?: IHeadingToText['unit'],
    isShort?: boolean,
    hasSpace?: boolean,
    hasColon?: boolean,
    hasDash?: boolean,
    classNameRow?: string
    classNameHeading?: string
    classNameText?: string
}

export const HeadingToTextRow = ({
    heading,
    text,
    unit,
    isShort = false,
    hasSpace = true,
    hasColon = true,
    hasDash = false,
    classNameRow,
    classNameHeading,
    classNameText
}: IHeadingToTextRow) => {
    return (
        <div className={cls(cl.block, isShort ? cl.short : '', classNameRow)}>
            {heading && <span className={cls(cl.heading, classNameHeading)}>{heading}{hasColon && ':'}</span>}
            {hasSpace &&
                <>&nbsp;</>
            }
            {hasDash &&
                <>-&nbsp;</>
            }
            <span className={cls(cl.text, classNameText, isShort ? cl.short : '')}>{text}{unit && <>&nbsp;{unit}</>}</span>
        </div>
    )
}
