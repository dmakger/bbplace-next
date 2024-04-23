import cl from './_HeadingToTextTable.module.scss'
import { cls } from "@/shared/lib/classes.lib";
import { HeadingToTextRow } from '../Row/HeadingToTextRow';
import { HeadingToTextColumn } from '../Column/HeadingToTextColumn';
import { EHeadingToTextVariants, IHeadingToText } from '@/shared/model/text.model';

interface IHeadingToTextTable {
    data: IHeadingToText[],
    variant: EHeadingToTextVariants,
    isShort?: boolean,
    hasColon?: boolean,
    hasDash?: boolean,
    hasSpace?: boolean,
    classNameMainBlock?: string,
    classNameMain?: string,
    classNameRow?: string,
    classNameHeadingItem?: string,
    classNameTextItem?: string
}

export const HeadingToTextTable = ({
    data,
    variant,
    isShort = false,
    hasColon = true,
    hasDash = false,
    hasSpace = false,
    classNameMainBlock,
    classNameMain,
    classNameRow,
    classNameHeadingItem,
    classNameTextItem
}: IHeadingToTextTable) => {

    return (
        <div className={cls(cl.block, classNameMainBlock)}>
            {
                (variant === EHeadingToTextVariants.ROW ? (
                    data.map((it, index )=> (
                        <HeadingToTextRow
                            key={it.heading}
                            heading={it.heading}
                            unit={it.unit}
                            text={it.text}
                            isShort={isShort}
                            hasColon={hasColon}
                            hasDash={hasDash}
                            hasSpace={hasSpace}
                            classNameRow={cls(classNameRow, index === data.length - 1 ? cl.noBorder : '')}
                            classNameHeading={classNameHeadingItem}
                            classNameText={classNameTextItem}
                        />
                    )))
                    : <HeadingToTextColumn
                        data={data}
                        isShort={isShort}
                        classNameMain={classNameMain}
                        classNameHeadingItem={classNameHeadingItem}
                        classNameTextItem={classNameTextItem}
                    />)}
        </div>
    )
}
