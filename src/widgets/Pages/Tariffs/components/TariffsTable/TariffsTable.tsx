import cl from './_TariffsTable.module.scss';
import { MOBILE_TT_BODY_DATA } from '../../data/tariffs.data';
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
            <TTBody bodyData={bodyData} isDemo isBusiness isPremium className={cl.desktop} />
            
            {MOBILE_TT_BODY_DATA.map(it => (
                <TTBody
                    {...it}
                    className={cl.mobile}
                    bodyData={bodyData}
                />
            ))}
        </table>
    )
}
