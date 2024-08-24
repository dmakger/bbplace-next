import { ETTVariants, ITTBodyRowData, ITTCellButtonItem } from '../../model/tariffs.model'
import { TTBodyRow } from '../TTBodyRow/TTBodyRow'
import { TTCellButtonItem } from '../TTCellButtonItem/TTCellButtonItem'
import cl from './_TTBody.module.scss'
import { cls } from "@/shared/lib/classes.lib"


interface ITTBody {
    className?: string,
    bodyData: ITTBodyRowData[],
    isDemo?: boolean,
    isBusiness?: boolean,
    isPremium?: boolean,
    rowId?: number,
    buttonInfo?: ITTCellButtonItem
}

export const TTBody = ({
    className,
    bodyData,
    isDemo = false,
    isBusiness = false,
    isPremium = false,
    buttonInfo,
    rowId
}: ITTBody) => {

    const getVariant = (isDemo: boolean, isBusiness: boolean, isPremium: boolean) => {
        if (isDemo && !isBusiness && !isPremium) return ETTVariants.DEMO
        if (!isDemo && isBusiness && !isPremium) return ETTVariants.BUSINESS
        if (!isDemo && !isBusiness && isPremium) return ETTVariants.PREMIUM
    }

    return (
        <tbody className={cls(cl.TTBody, className)}>
            <tr>
                {buttonInfo && <TTCellButtonItem
                    title={buttonInfo.title}
                    buttonTitle={buttonInfo.buttonTitle}
                    className={buttonInfo.className}
                    variant={buttonInfo.variant}
                    subtitle={buttonInfo.subtitle}
                    rowId={rowId}
                />}
            </tr>

            {bodyData.map(it => (
                <TTBodyRow
                    key={it.rowId}
                    items={it}
                    isDemo={isDemo}
                    isBusiness={isBusiness}
                    isPremium={isPremium}
                    rowId={rowId}
                    variant={getVariant(isDemo, isBusiness, isPremium)}
                />
            ))}
        </tbody>
    )
}
