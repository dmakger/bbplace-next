import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_FormTenderSaleNew.module.scss'
import Input from "@/shared/ui/Input/Input";
import { WrapperRectangleInput } from "@/shared/ui/Wrapper/RectangleInput";
import { EInputVariants } from "@/shared/ui/Input/model/input.model";

interface FormTenderSaleNewProps{
    className?: string,
}

export const FormTenderSaleNew:FC<FormTenderSaleNewProps> = ({className}) => {
    return (
        <form className={cls(cl.form, className)}>
            <WrapperRectangleInput labelText={"Наименование"} isRequired={true}>
                <Input.Text name={'name'} placeholder="До 50 символов" variant={EInputVariants.RECTANGULAR} required={true} />
            </WrapperRectangleInput>
            {/* <WrapperRectangleInput labelText={"Категория"} isRequired={true}>
                <Input.Select name={'category'} placeholder="До 50 символов" variant={EInputVariants.RECTANGULAR} required={true} />
            </WrapperRectangleInput> */}
        </form>
    )
}
