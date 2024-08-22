import { cls } from '@/shared/lib/classes.lib'
import { ITCellButtonItem, ITCellItem } from '../../model/tariffs.model'
import { TCellButtonItem } from '../TCellButtonItem/TCellButtonItem'
import { TCellItem } from '../TCellItem/TCellItem'
import cl from './_TCellColumn.module.scss'

interface ITCellColumn {
    className?: string,
    classNameItem?: string,
    columnData: ITCellItem[] | ITCellButtonItem[]
}

export const TCellColumn = ({
    className,
    classNameItem,
    columnData
}: ITCellColumn) => {

    return (
        <colgroup className={cl.TCellColumn}>
            {columnData.map(it => {
                const isTCellButtonItem = 'buttonTitle' in it || it.title === 'Демо' as string;

                return (isTCellButtonItem ?

                    <TCellButtonItem
                        className={it.className}
                        key={it.title as string}
                        variant={it.variant}
                        title={it.title as string}
                        subtitle={it.subtitle}
                        buttonTitle={'buttonTitle' in it ? it.buttonTitle : ''}
                    />
                    :
                    <TCellItem
                        className={cls(it.className, classNameItem)}
                        classNameData={it.classNameData}
                        key={it.title as string}
                        variant={it.variant}
                        title={it.title}
                        subtitle={it.subtitle}
                    />)
            })}
        </colgroup>
    )
}
