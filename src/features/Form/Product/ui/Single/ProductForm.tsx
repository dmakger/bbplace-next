import { cls } from "@/shared/lib/classes.lib"
import cl from './_ProductForm.module.scss'
import { forwardRef, useEffect, useImperativeHandle, useRef, useState, useCallback, useMemo } from "react"
import { Button } from "@/shared/ui/Button"
import { ButtonSize, ButtonVariant } from "@/shared/ui/Button/model/button.model"
import { MainInfoProductForm } from "../Main/MainInfoProductForm"
import { IPropsMainInfoProductForm } from "@/features/Form/Product/model/mainInfo.product.form.model"
import { AdditionalInfoProductForm } from "@/features/Form/Product/ui/Additional/AdditionalInfoProductForm"
import { IPropsAdditionalInfoProductForm } from "@/features/Form/Product/model/additionalInfo.product.form.model"
import { VariationInfoProductForm } from "@/features/Form/Product/ui/Variation/VariationInfoProductForm"
import { IPropsVariationInfoProductForm } from "@/features/Form/Product/model/variationInfo.product.form.model"
import { IPropsProductForm } from "../../model/product.form.model"
import { isEqual } from "lodash"

interface ProductFormProps {
    data?: IPropsProductForm
    loadFormData?: (formData: IPropsProductForm) => void
    isEdit?: boolean
    className?: string,
}

export const ProductForm = forwardRef(({ data, loadFormData, isEdit = false, className }: ProductFormProps, ref) => {
    // REF
    const mainFormSubmitRef = useRef<() => void>();
    const additionalFormSubmitRef = useRef<() => void>();
    const variationFormSubmitRef = useRef<() => void>();

    // STATE
    const [mainInfoData, setMainInfoData] = useState<IPropsMainInfoProductForm | undefined>(data?.main)
    const [additionalInfoData, setAdditionalInfoData] = useState<IPropsAdditionalInfoProductForm | undefined>(data?.additional)
    const [variationInfoData, setVariationInfoData] = useState<IPropsVariationInfoProductForm | undefined>(data?.variation)

    // EFFECT
    useEffect(() => {
        setMainInfoData(prev => isEqual(prev, data?.main) ? prev : data?.main)
        setAdditionalInfoData(prev => isEqual(prev, data?.additional) ? prev : data?.additional)
        setVariationInfoData(prev => isEqual(prev, data?.variation) ? prev : data?.variation)
    }, [data])

    useEffect(() => {
        if (!loadFormData) return

        const hasChanges = !isEqual(data?.main, mainInfoData) ||
            !isEqual(data?.additional, additionalInfoData) ||
            !isEqual(data?.variation, variationInfoData)

        if (hasChanges) {
            loadFormData({
                main: mainInfoData,
                additional: additionalInfoData,
                variation: variationInfoData
            } as IPropsProductForm)
        }
    }, [mainInfoData, additionalInfoData, variationInfoData, loadFormData, data])

    useImperativeHandle(ref, () => ({
        handleOnClick,
    }))

    // HANDLE
    const handleOnClick = useCallback(() => {
        mainFormSubmitRef.current?.()
        additionalFormSubmitRef.current?.()
        variationFormSubmitRef.current?.()
    }, [])

    return (
        <div className={cls(cl.block, className)}>
            <MainInfoProductForm
                data={mainInfoData}
                setData={setMainInfoData}
                triggerSubmit={submitFn => { mainFormSubmitRef.current = submitFn }} 
                isOpenForm={!isEdit} />
            <AdditionalInfoProductForm
                data={additionalInfoData}
                setData={setAdditionalInfoData}
                triggerSubmit={submitFn => { additionalFormSubmitRef.current = submitFn }}
                isOpenForm={!isEdit} />
            <VariationInfoProductForm
                data={variationInfoData}
                setData={setVariationInfoData}
                triggerSubmit={submitFn => { variationFormSubmitRef.current = submitFn }} />

            {!isEdit && (
                <Button variant={ButtonVariant.FILL} size={ButtonSize.Big}
                    title="Добавить товар"
                    onClick={handleOnClick} />
            )}
        </div>
    )
})
