'use client'

import { cls } from "@/shared/lib/classes.lib"
import cl from './_MultipleCreationForm.module.scss'
import { WrapperGrayButton } from "@/shared/ui/Wrapper/GrayButton"
import { Button, ButtonVariant } from "@/shared/ui/Button"
import { ButtonSize } from "@/shared/ui/Button/model/button.model"
import { CategoryRecursiveSelect } from "@/features/CategoryRecursiveSelect"
import { ProductAPI } from "@/entities/Product/api/product.api"
import { useState } from "react"
import { ERecursiveSelectVariant } from "@/shared/ui/Input/ui/RecursiveSelect/model/recursiveSelect.model"

interface IMultipleCreationForm {
    className?: string,
}

export const MultipleCreationForm = ({
    className
}: IMultipleCreationForm) => {

    //STATE
    const [selectedCategoriesId, setSelectedCategoriesId] = useState<number[]>([])
    const [selectedFile, setSelectedFile] = useState<File | null>(null);


    //API
    const [downloadExcel] = ProductAPI.useGetImportExcelTemplateMutation()

    return (
        <div className={cls(cl.MultipleCreationForm, className)}>

            <CategoryRecursiveSelect
                variant={ERecursiveSelectVariant.MULTIPLE}
                buttonWrapperText="Скачать шаблон"
                labelText="1. Генерация шаблона"
                classNameLabel={cl.label}
                setSelectedCategoriesId={setSelectedCategoriesId}
                errorInputMessage='Выберите категории из списка'       
            />
            <WrapperGrayButton labelText="2.">
                <Button title="Загрузить таблицу"
                    variant={ButtonVariant.FILL}
                    size={ButtonSize.Big} />
            </WrapperGrayButton>
        </div>
    )
}
