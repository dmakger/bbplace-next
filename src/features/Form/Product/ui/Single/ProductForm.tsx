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
import { IFormInfo, IPropsProductForm } from "../../model/product.form.model"
import { isEqual } from "lodash"

interface ProductFormProps {
    data?: IPropsProductForm;
    loadData?: (data: Promise<IPropsProductForm>) => void;
    isEdit?: boolean;
    className?: string;
}

export const ProductForm = forwardRef(({ data, loadData, isEdit = false, className }: ProductFormProps, ref) => {
    // REF
    const mainFormSubmitRef = useRef<() => Promise<IFormInfo<IPropsMainInfoProductForm>>>();
    const additionalFormSubmitRef = useRef<() => Promise<IFormInfo<IPropsAdditionalInfoProductForm>>>();
    const variationFormSubmitRef = useRef<() => Promise<IFormInfo<IPropsVariationInfoProductForm>>>();

    // STATE
    const [mainInfoData, setMainInfoData] = useState<IPropsMainInfoProductForm | undefined>(data?.main?.form);
    const [additionalInfoData, setAdditionalInfoData] = useState<IPropsAdditionalInfoProductForm | undefined>(data?.additional?.form);
    const [variationInfoData, setVariationInfoData] = useState<IPropsVariationInfoProductForm | undefined>(data?.variation?.form);

    // EFFECT
    useEffect(() => {
        setMainInfoData(prev => isEqual(prev, data?.main?.form) ? prev : data?.main?.form);
        setAdditionalInfoData(prev => isEqual(prev, data?.additional?.form) ? prev : data?.additional?.form);
        setVariationInfoData(prev => isEqual(prev, data?.variation?.form) ? prev : data?.variation?.form);
    }, [data]);

    // FOR REF
    useImperativeHandle(ref, () => ({
        getUpdatedData,
        writeFormDataToParent,
    }));

    // HANDLE
    const writeFormDataToParent = () => {
        if (loadData) {
            loadData(getUpdatedData());
        }
    }

    const getUpdatedData = async (): Promise<IPropsProductForm> => {
        const main = await mainFormSubmitRef.current?.();
        const additional = await additionalFormSubmitRef.current?.();
        const variation = await variationFormSubmitRef.current?.();

        return {
            main,
            additional,
            variation
        };
    }

    return (
        <div className={cls(cl.block, className)}>
            <MainInfoProductForm
                data={mainInfoData}
                setData={setMainInfoData}
                triggerSubmit={submitFn => { mainFormSubmitRef.current = submitFn; }} 
                isOpenForm={!isEdit} />
            <AdditionalInfoProductForm
                data={additionalInfoData}
                setData={setAdditionalInfoData}
                triggerSubmit={submitFn => { additionalFormSubmitRef.current = submitFn; }}
                isOpenForm={!isEdit} />
            <VariationInfoProductForm
                data={variationInfoData}
                setData={setVariationInfoData}
                triggerSubmit={submitFn => { variationFormSubmitRef.current = submitFn; }} />

            {/* {!isEdit && ( */}
                <Button variant={ButtonVariant.FILL} size={ButtonSize.Big}
                    title="Добавить товар"
                    onClick={writeFormDataToParent} />
            {/* )} */}
        </div>
    );
});