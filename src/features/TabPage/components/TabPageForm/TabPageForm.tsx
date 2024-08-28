'use client';

import { cls } from "@/shared/lib/classes.lib";
import cl from './_TabPageForm.module.scss';
import { WrapperRectangleInput } from "@/shared/ui/Wrapper/RectangleInput";
import Input from "@/shared/ui/Input/Input";
import { EInputVariants } from "@/shared/ui/Input/model/input.model";
import { ETabPageVariant } from "../../model/tabPage.model";
import { useState } from "react";
import { IFile } from "@/entities/File/model/file.model";
import { WrapperGrayButton } from "@/shared/ui/Wrapper/GrayButton";
import { Button, ButtonVariant } from "@/shared/ui/Button";
import { ButtonSize } from "@/shared/ui/Button/model/button.model";
import { ProductAPI } from "@/entities/Product/api/product.api";
import { useAppSelector } from "@/storage/hooks";
import { getFileName, getImageFile } from "@/entities/File/lib/file.lib";
import { CategoryRecursiveSelect } from "@/features/CategoryRecursiveSelect";
import { ERecursiveSelectVariant } from "@/shared/ui/Input/ui/RecursiveSelect/model/recursiveSelect.model";
import { isEqual } from "lodash";
import { IResponseFile } from "@/entities/File/model/props.file.model";
import { OptionsAttachmentItem } from "@/shared/ui/Form/OptionsAttachment/ui/Item/OptionsAttachmentItem";
import { EOptionsAttachmentVariants } from "@/shared/ui/Form/OptionsAttachment/data/optionsAttachment.data";
import { EInputsContainerDirection } from "@/shared/ui/Wrapper/RectangleInput/model/wrapperRectangleInput.model";

interface ITabPageForm {
    className?: string,
    variant?: ETabPageVariant
}

export const TabPageForm = ({
    className,
    variant
}: ITabPageForm) => {

    //STATE
    const [selectedFiles, setSelectedFiles] = useState<IFile[]>([]);
    const [selectedResponseFiles, setSelectedResponseFiles] = useState<IResponseFile[]>([]);

    const [selectedCategoriesId, setSelectedCategoriesId] = useState<number[]>([]);
    const [deletingFileName, setDeletingFileName] = useState<string>('')

    //API
    const [downloadExcel] = ProductAPI.useGetImportExcelTemplateMutation();
    const [loadTheSheet] = ProductAPI.useImportProductsFromExcelMutation();
    const [uploadThePrices] = ProductAPI.useUpdatePricesFromExcelMutation();
    const { data, isLoading } = ProductAPI.useGetPricesExcelQuery();

    //RTK
    const { fullName } = useAppSelector(state => state.user); 

    //VARIABLE
    const fileName = getFileName({ fullName, text: 'product sheet' });

    //FUNCTION
    const createAndDownloadFile = (blob: Blob, filename: string) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const downloadExcelTemplate = async () => {
        if (!selectedCategoriesId.length) return;

        try {
            const blob = await downloadExcel(selectedCategoriesId).unwrap();
            createAndDownloadFile(blob, fileName);
        } catch (downloadError) {
            console.error('Error downloading the file', downloadError);
        }
    };

    const handleDownloadExcelFile = () => {
        if (!data) {
            console.error('Error: Data is undefined');
            return;
        }
        createAndDownloadFile(data, fileName);
    };

    const handleDownloadSheet = async () => {
        if (!selectedFiles[0]?.file) return;

        const formData = new FormData();
        formData.append('file', selectedFiles[0].file);

        try {
            variant === ETabPageVariant.MULTIPLE_CREATION
                ? await loadTheSheet(formData).unwrap()
                : await uploadThePrices(formData).unwrap();
            setSelectedFiles([]);
            setSelectedResponseFiles([])
        } catch (uploadError) {
            setSelectedFiles([]);
            setSelectedResponseFiles([])
            console.error('Ошибка загрузки файла:', uploadError);
        }
    };

    const handleDeleteItem = (file: IFile | IResponseFile) => {
        setDeletingFileName(file.name ?? '')
        setTimeout(() => { // Для плавной анимации добавления и удаления OptionsAttachmentItem
            const updatedSelectedFIles = selectedFiles.filter(item => !isEqual(item, file));
            const updatedSelectedResponseFiles = selectedResponseFiles.filter(item => 'key' in file && item.key !== file.key);

            setSelectedFiles(updatedSelectedFIles)
            setSelectedResponseFiles(updatedSelectedResponseFiles)

            setDeletingFileName('')
        }, 300)
    }

    return (
        <div className={cls(cl.TabPageForm, className)}>
            {variant === ETabPageVariant.PRICES_N_DISCOUNTS ? (
                <WrapperGrayButton labelText="1.">
                    <Button
                        title="Выгрузить таблицу"
                        variant={ButtonVariant.FILL}
                        size={ButtonSize.Big}
                        onClick={handleDownloadExcelFile}
                        disabled={isLoading}
                    />
                </WrapperGrayButton>
            ) : (
                <CategoryRecursiveSelect
                        variant={ERecursiveSelectVariant.MULTIPLE}
                        buttonWrapperText="Скачать шаблон"
                        labelText="1. Генерация шаблона"
                        classNameLabel={cl.label}
                        setSelectedCategoriesId={setSelectedCategoriesId}
                        onClickBellowButton={downloadExcelTemplate} 
                        defaultCategoriesId={[]}/>
            )}

            <WrapperRectangleInput
                labelText="2. Загрузка таблицы"
                bellowButtonText="Загрузить таблицу"
                classNameLabel={cl.label}
                isCanDisabledBellowButton={!selectedFiles.length}
                onClickBellowButton={handleDownloadSheet}
                direction={EInputsContainerDirection.COLUMN}
            >
                    <Input.File
                        variant={EInputVariants.RECTANGULAR}
                        setFileList={setSelectedFiles}
                        setResponseFileList={setSelectedResponseFiles}
                        multiple={false}
                        disabled={selectedFiles.length > 0}
                        classNameField={cl.inputFile}
                    />
               
                {selectedFiles.length > 0 && selectedFiles.map(file => (
                    <OptionsAttachmentItem
                        fileIcon={getImageFile(file.format)}
                        key={file.name}
                        className={cls(cl.optionsAttachmentShow, deletingFileName === file.name ? cl.optionsAttachmentHide : '')}
                        title={file.name ?? ''}
                        variant={EOptionsAttachmentVariants.FILE}
                        handleDelete={() => handleDeleteItem(file)} />
                ))}

            </WrapperRectangleInput>
        </div>
    );
};
