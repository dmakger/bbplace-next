import { cls } from '@/shared/lib/classes.lib'
import cl from './_TTBodyRow.module.scss'
import { ETTVariants, ITTBodyRow } from '../../model/tariffs.model'
import { TTCellItem } from '../TTCellItem/TTCellItem'


export const TTBodyRow = ({
    items,
    isDemo = false,
    isBusiness = false,
    isPremium = false,
    rowId,
    variant = ETTVariants.DEMO
}: ITTBodyRow) => {

    const noFootnote = items.default.classNameData === 'rowCell' && !isPremium;
    const noForDemo = (items.default.classNameData === 'lastLeftEl' ||
     items.default.classNameData === 'noForDemo') && isDemo && !isPremium ||
       items.demo?.classNameData === 'noForDemo' && isDemo && !isPremium;

    return (
        <tr className={cls(cl.TTBodyRow, cl[variant])} id={String(rowId)}>
            {noFootnote || noForDemo ? null : <TTCellItem
                title={items.default.title}
                subtitle={items.default.subtitle}
                classNameData={items.default.classNameData}
            />}
            {noForDemo ? null : items.demo && isDemo && <TTCellItem
                title={items.demo.title}
                variant={items.demo.variant}
                iconSrc={items.demo.iconSrc}
                subtitle={items.demo.subtitle}
                classNameData={items.demo.classNameData}
            />}
            {items.business && isBusiness && <TTCellItem
                title={items.business.title}
                variant={items.business.variant}
                iconSrc={items.business.iconSrc}
                subtitle={items.business.subtitle}
                classNameData={items.business.classNameData}
            />}
            {items.premium && isPremium && <TTCellItem
                title={items.premium.title}
                variant={items.premium.variant}
                iconSrc={items.premium.iconSrc}
                subtitle={items.premium.subtitle}
                classNameData={items.premium.classNameData}
            />}
        </tr>
    )
}
