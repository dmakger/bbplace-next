import { Dispatch, FC, SetStateAction } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_VariationInfoProductForm.module.scss'
import { IPropsVariationInfoProductForm } from "../../model/variationInfo.product.form.model";

interface VariationInfoProductFormProps{
    setData?: Dispatch<SetStateAction<IPropsVariationInfoProductForm | undefined>>
    triggerSubmit?: (submitFn: () => void) => void,
    className?: string,
}

export const VariationInfoProductForm:FC<VariationInfoProductFormProps> = ({setData, triggerSubmit, className}) => {
    return (
        <div className={cls(className)}>

        </div>
    )
}
