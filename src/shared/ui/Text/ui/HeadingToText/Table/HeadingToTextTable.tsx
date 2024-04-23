import cl from './_HeadingToTextTable.module.scss'
import { IHeadingToText } from "@/shared/model/text.model";
import { HeadingToTextLine } from "../Line/HeadingToTextLine";
import { cls } from "@/shared/lib/classes.lib";

interface IHeadingToTextTable {
    data: IHeadingToText[],
    isShort?: boolean,
    hasColon?: boolean,
    hasDash?: boolean,
    hasSpace?: boolean,
    classNameMainBlock?: string,
    classNameRow?: string,
    classNameHeadingItem?: string,
    classNameTextItem?: string
}

export const HeadingToTextTable = ({
    data,
    isShort = false,
    hasColon = true,
    hasDash = false,
    hasSpace = false,
    classNameMainBlock,
    classNameRow,
    classNameHeadingItem,
    classNameTextItem
}: IHeadingToTextTable) => {

    return (
        <div className={cls(cl.block, classNameMainBlock)}>
            {
                data.map(it => (
                    <HeadingToTextLine
                        key={it.heading}
                        heading={it.heading}
                        text={it.text}
                        isShort={isShort}
                        hasColon={hasColon}
                        hasDash={hasDash}
                        hasSpace={hasSpace}
                        classNameRow={classNameRow}
                        classNameHeading={classNameHeadingItem}
                        classNameText={classNameTextItem}
                    />
                ))
            }
        </div>
    )
}
