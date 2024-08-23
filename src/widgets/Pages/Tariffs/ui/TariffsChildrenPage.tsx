import cl from './_TariffsChildrenPage.module.scss'
import Wrapper1280 from '@/shared/ui/Wrapper/1280/Wrapper1280'
import { TT_BODY_ROW_DATA_ARRAY } from '../data/tariffs.data'
import { TariffsTable } from '../components/TariffsTable/TariffsTable'

export const TariffsChildrenPage = () => {

    return (
        <Wrapper1280 classNameContent={cl.TariffsChildrenPage}>
            <TariffsTable bodyData={TT_BODY_ROW_DATA_ARRAY}/>
        </Wrapper1280>
    )
}
