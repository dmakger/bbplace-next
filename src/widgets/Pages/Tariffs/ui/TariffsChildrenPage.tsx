import cl from './_TariffsChildrenPage.module.scss'
import Wrapper1280 from '@/shared/ui/Wrapper/1280/Wrapper1280'
import { TCellColumn } from '../components/TCellColumn/TCellColumn'
import { TCellItem } from '../components/TCellItem/TCellItem'
import { BUSINESS_COLUMN_DATA_ARRAY, DEFAULT_COLUMN_DATA_ARRAY, DEMO_COLUMN_DATA_ARRAY, PREMIUM_COLUMN_DATA_ARRAY, SECOND_BUSINESS_COLUMN_DATA_ARRAY, SECOND_DEFAULT_COLUMN_DATA_ARRAY, SECOND_DEMO_COLUMN_DATA_ARRAY, SECOND_PREMIUM_COLUMN_DATA_ARRAY } from '../data/tariffs.data'
import { THeadRow } from '../components/THeadRow/THeadRow'
import { TariffsAdaptiveTable } from '../components/TCellRow/TariffsAdaptiveTable'
import { TCellButtonItem } from '../components/TCellButtonItem/TCellButtonItem'
import { ETCellVariants } from '../model/tariffs.model'

export const TariffsChildrenPage = () => {

    return (
        <Wrapper1280 classNameContent={cl.TariffsChildrenPage}>
            {/* <THeadRow/>
            <div className={cl.firstPart}>
                <TCellColumn columnData={DEFAULT_COLUMN_DATA_ARRAY} />
                <div className={cl.tariffsColumns}>

                    <TCellColumn columnData={DEMO_COLUMN_DATA_ARRAY} />
                    <TCellColumn columnData={BUSINESS_COLUMN_DATA_ARRAY} />
                    <TCellColumn columnData={PREMIUM_COLUMN_DATA_ARRAY} />
                </div>
            </div>

            <TCellItem
                title='Чем дольше партнёрство, тем выгоднее условия!'
                subtitle='* — зависит от продолжительности тарифа'
                className={cl.rowCell}
            />
            <div className={cl.secondPart}>
                <TCellColumn columnData={SECOND_DEFAULT_COLUMN_DATA_ARRAY} classNameItem={cl.bottomDefaultItem} />
                <div className={cl.tariffsColumns}>
                    <TCellColumn columnData={SECOND_DEMO_COLUMN_DATA_ARRAY} />
                    <TCellColumn columnData={SECOND_BUSINESS_COLUMN_DATA_ARRAY} />
                    <TCellColumn columnData={SECOND_PREMIUM_COLUMN_DATA_ARRAY} />
                </div>
            </div> */}
            <TariffsAdaptiveTable childrenButton={<TCellButtonItem title='Премиум' buttonTitle='от 2 890₽/месяц' variant={ETCellVariants.PREMIUM}/>}
            firstColumnData={PREMIUM_COLUMN_DATA_ARRAY} secondColumnData={SECOND_PREMIUM_COLUMN_DATA_ARRAY} hasFootnote/>
            <TariffsAdaptiveTable childrenButton={<TCellButtonItem title='Бизнес' buttonTitle='от 2 090₽/месяц' variant={ETCellVariants.BUSINESS}/>}
            firstColumnData={BUSINESS_COLUMN_DATA_ARRAY} secondColumnData={SECOND_BUSINESS_COLUMN_DATA_ARRAY} />
            <TariffsAdaptiveTable childrenButton={<TCellButtonItem title='Демо' buttonTitle='Бесплатно' variant={ETCellVariants.DEMO}/>}
            firstColumnData={DEMO_COLUMN_DATA_ARRAY}/>
        </Wrapper1280>
    )
}
