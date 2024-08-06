import { cls } from "@/shared/lib/classes.lib"
import cl from './_CreationProductForm.module.scss'
import { FC, useEffect, useRef, useState } from "react"
import { Button } from "@/shared/ui/Button"
import { ButtonSize, ButtonVariant } from "@/shared/ui/Button/model/button.model"
import { MainInfoProductForm } from "../../../../../features/Form/Product/ui/Main/MainInfoProductForm"
import { IPropsMainInfoProductForm } from "@/features/Form/Product/model/mainInfo.product.form.model"
import { AdditionalInfoProductForm } from "@/features/Form/Product/ui/Additional/AdditionalInfoProductForm"
import { IPropsAdditionalInfoProductForm } from "@/features/Form/Product/model/additionalInfo.product.form.model"
import { VariationInfoProductForm } from "@/features/Form/Product/ui/Variation/VariationInfoProductForm"
import { IPropsVariationInfoProductForm } from "@/features/Form/Product/model/variationInfo.product.form.model"
import { IPropsProductForm } from "../../model/product.form.model"
import { isEqual } from "lodash"

interface CreationProductFormProps {
    data?: IPropsProductForm
    isDraft?: boolean
    className?: string,
}

export const CreationProductForm:FC<CreationProductFormProps> = ({data, isDraft=false, className}) => {
    // REF
    const mainFormSubmitRef = useRef<() => void>();
    const additionalFormSubmitRef = useRef<() => void>();
    const variationFormSubmitRef = useRef<() => void>();

    // STATE
    const [mainInfoData, setMainInfoData] = useState<IPropsMainInfoProductForm | undefined>()
    const [additionalInfoData, setAdditionalInfoData] = useState<IPropsAdditionalInfoProductForm | undefined>()
    const [variationInfoData, setVariationInfoData] = useState<IPropsVariationInfoProductForm | undefined>()

    // EFFECT
    useEffect(() => {
        if (data === undefined) return
        setMainInfoData(prev => isEqual(prev, data.main) ? prev : data.main)
        setAdditionalInfoData(prev => isEqual(prev, data.additional) ? prev : data.additional)
        setVariationInfoData(prev => isEqual(prev, data.variation) ? prev : data.variation)
    }, [data])

    // HANDLE
    const handleOnClick = () => {
        if (mainFormSubmitRef.current) {
            mainFormSubmitRef.current();
        }
        if (additionalFormSubmitRef.current) {
            additionalFormSubmitRef.current();
        }
        if (variationFormSubmitRef.current) {
            variationFormSubmitRef.current();
        }
    }

    console.log('qwe mainInfoData', mainInfoData)
    console.log('qwe additionalInfoData', additionalInfoData)
    console.log('qwe variationInfoData', variationInfoData)

    return (
        <div className={cls(cl.block, className)}>
            <MainInfoProductForm setData={setMainInfoData} triggerSubmit={(submitFn) => { mainFormSubmitRef.current = submitFn }} isOpenForm={!isDraft} />
            <AdditionalInfoProductForm setData={setAdditionalInfoData} triggerSubmit={(submitFn) => { additionalFormSubmitRef.current = submitFn }} isOpenForm={!isDraft} />
            <VariationInfoProductForm setData={setVariationInfoData} triggerSubmit={(submitFn) => { variationFormSubmitRef.current = submitFn }} />

            <Button variant={ButtonVariant.FILL} size={ButtonSize.Big} 
                    title="Добавить товар"
                    onClick={handleOnClick} />
        </div>
    )
}
