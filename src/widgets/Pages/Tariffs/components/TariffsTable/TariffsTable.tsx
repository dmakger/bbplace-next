import cl from './_TariffsTable.module.scss';
import { BUSINESS_BUTTON_INFO, BUSINESS_TARIFF_INFO, DEMO_BUTTON_INFO, DEMO_TARIFF_INFO, PREMIUM_BUTTON_INFO, PREMIUM_TARIFF_INFO } from '../../data/tariffs.data';
import { ITTBodyRowData } from '../../model/tariffs.model';
import { TTBody } from '../TTBody/TTBody';
import { TTHeadRow } from '../TTHeadRow/TTHeadRow';

interface ITariffsTable {
    bodyData: ITTBodyRowData[],
}

export const TariffsTable = ({
    bodyData
}: ITariffsTable) => {
    return (
        <table className={cl.TariffsTable}>
            <TTHeadRow />
            <div className={cl.desktop}>
                <TTBody bodyData={bodyData} isDemo isBusiness isPremium />
            </div>
            <div className={cl.mobile}>
                <TTBody bodyData={bodyData}
                    isPremium
                    rowId={PREMIUM_TARIFF_INFO.rowId}
                    buttonInfo={PREMIUM_BUTTON_INFO}
                />
                <TTBody bodyData={bodyData}
                    isBusiness
                    rowId={BUSINESS_TARIFF_INFO.rowId}
                    buttonInfo={BUSINESS_BUTTON_INFO}
                />
                <TTBody bodyData={bodyData}
                    isDemo
                    rowId={DEMO_TARIFF_INFO.rowId}
                    buttonInfo={DEMO_BUTTON_INFO} />
            </div>
        </table>
    )
}
