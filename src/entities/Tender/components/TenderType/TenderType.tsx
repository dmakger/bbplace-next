import { ETenderType } from '../../model/tender.model'
import cl from './_TenderType.module.scss'

interface ITenderType{
    tenderType: ETenderType
}


export const TenderType = ({
    tenderType
}: ITenderType) => {
    return (
        <span className={cl.TenderType}>
            {tenderType}
        </span>
    )
}
