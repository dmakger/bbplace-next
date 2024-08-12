import { ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useRef, useState } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_InputImage.module.scss'
import { IWrapperRectangleInputChildren } from "@/shared/ui/Wrapper/RectangleInput/model/wrapperRectangleInput.model";
import { EInputVariants, IInput } from "../../../model/input.model";
import { Button, ButtonVariant } from "@/shared/ui/Button";
import { getInputImagePrompt } from "../lib/image.input.lib";
import { IMAGE_ADD_ICON } from "@/shared/ui/Icon/data/imageAdd.data.icon";
import { FileAPI } from "@/entities/File/api/file.api";
import { getImage } from "@/shared/lib/image.lib";
import { ImageInputPrompt } from "../data/image.input.data";
import { TRASH_NEGATIVE_TO_WHITE_ICON } from "@/shared/ui/Icon/data/trash.data.icon";
import { ButtonColor, ButtonSize } from "@/shared/ui/Button/model/button.model";
import { ImageProduction } from "@/shared/ui/Image/Production/ui/ImageProduction";
import { ImageProductionColor, ImageProductionVariant } from "@/shared/ui/Image/Production/data/production.image.data";
import { getIndexBeforeDelete, getNextIndex, getPrevIndex } from "@/shared/lib/list.lib";
import { InputImageSliderT } from "../components/SliderT/InputImageSliderT";
import { TListItemOnClick } from "@/shared/model/list.model";
import { ControlPanel } from "@/shared/ui/Control/ui/Panel/ControlPanel";


interface InputImageProps extends IWrapperRectangleInputChildren, IInput {
    title?: string
    multiple?: boolean
    imageList?: string[]
    setImageList?: Dispatch<SetStateAction<string[]>>
    disabled?: boolean
}

export const InputImage:FC<InputImageProps> = ({
    title,
    multiple=true, 

    imageList=[],
    setImageList,

    variant=EInputVariants.ROUNDED,
    onChange,

    success,
    setSuccess,
    warning,
    setWarning,
    setInputValueLength,
    size,
    disabled,

    className,
    ...rest
}) => {
    // REF
    const inputRef = useRef<HTMLInputElement>(null)

    // STATE
    const [locTitle, setLocTitle] = useState<string>(getInputImagePrompt(multiple))
    const [activeIndexImage, setActiveIndexImage] = useState<number>()
    const [isUploadingImage, setIsUploadingImage] = useState(false)
    
    // API
    const [uploadFile] = FileAPI.useUploadFileMutation()


    // EFFECT
    useEffect(() => {
        if (imageList.length === 0) {
            setActiveIndexImage(undefined);
        } else if (imageList.length > 0 && activeIndexImage === undefined) {
            setActiveIndexImage(0)
        }
    }, [imageList])

    useEffect(() => {
        setLocTitle(() => title ?? getInputImagePrompt(multiple))
    }, [title, multiple])

    const handleOnClickButton = () => {
        inputRef.current?.click()
    }

    // HANDLE
    const handleOnChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(e);
        }
        if (!e.target.files || e.target.files.length === 0 || !setImageList) return;
        try {
            setIsUploadingImage(true)
            const files = Array.from(e.target.files).slice(0, 20);
            const newAttachments = await Promise.all(
                files.map(async (file) => {
                    const formData = new FormData();
                    formData.set('file', file);
                    try {
                        const response = await uploadFile(formData).unwrap();
                        return response.key as string;
                    } catch (error) {
                        console.error('Ошибка загрузки:', error);
                        return undefined;
                    }
                })
            );
            const newSuccessAttachments = newAttachments.filter((it): it is string => it !== undefined);
            const prevImageListLength = imageList.length 
            setImageList((prevImageList) => [...prevImageList, ...newSuccessAttachments]);
            setActiveIndexImage(prevImageListLength + newSuccessAttachments.length - 1);
        } finally {
            setIsUploadingImage(false);
        }
    };

    // on delete
    const handleOnDeleteByIndex = () => {
        if (activeIndexImage === undefined || activeIndexImage > imageList.length || !setImageList) return
        const newIndex = getIndexBeforeDelete(imageList.length, activeIndexImage)
        try {
            setImageList(prevImageList => prevImageList.filter((_, index) => index !== activeIndexImage))
        }
        finally {
            setActiveIndexImage(newIndex)
        }
    }

    // on image
    const handleOnImage: TListItemOnClick<string> = (_, index) => {
        if (index !== undefined && index < imageList.length)
            setActiveIndexImage(index)
    }

    const handleOnPrevControlPanel = () => {
        setActiveIndexImage(prevIndex => getPrevIndex(imageList.length, prevIndex))
    }

    const handleOnNextControlPanel = () => {
        setActiveIndexImage(prevIndex => getNextIndex(imageList.length, prevIndex))
    }
    
    return (
        <div className={cl.wrapper}>
            <input type="file" 
                    multiple={multiple}
                    ref={inputRef}
                    onChange={e => handleOnChange(e)}
                    className={cl.input}
                    disabled={disabled} {...rest}/>
            
            {activeIndexImage !== undefined && activeIndexImage <= imageList.length && imageList.length > 0 ? (
                <div className={cl.wrapperActiveImage}>
                    <div className={cl.leftPanel}>
                        <Button variant={ButtonVariant.CONTENT} color={ButtonColor.Negative} size={ButtonSize.Medium}
                                beforeImage={TRASH_NEGATIVE_TO_WHITE_ICON} 
                                onClick={handleOnDeleteByIndex}/>
                        <ControlPanel current={activeIndexImage+1} 
                                      onClickPrev={handleOnPrevControlPanel} 
                                      onClickNext={handleOnNextControlPanel} />
                    </div>
                    <ImageProduction src={getImage(imageList[activeIndexImage])} 
                                     variant={ImageProductionVariant.Color} 
                                     color={ImageProductionColor.White} 
                                     classNameImage={cl.activeImage}  />
                </div>
            ) : (
                <Button variant={ButtonVariant.DEFAULT}
                    beforeImage={IMAGE_ADD_ICON} beforeProps={{width: 20, height: 20}}
                    title={locTitle} titleLoading={ImageInputPrompt.Loading}
                    onClick={handleOnClickButton}
                    disabled={disabled}
                    loading={isUploadingImage}
                    className={cls(cl.block, cl[variant], disabled ? cl.disabled : '', className)}
                    classNameText={cl.text}
                    classNameTextHovered={cl.textHovered}
                    classNameTextDisabled={cl.textDisabled}
                    classNameTextLoading={cl.textLoading} />
            )}

            {/* image list */}
            {imageList.length > 0 && (
                <div className={cl.bottom}>
                    <InputImageSliderT items={imageList} gap={10} 
                        pagingAmount={3}
                        activeIndex={activeIndexImage}
                        componentProps={{
                            variant: ImageProductionVariant.ToGray,
                        }} 
                        onClickItem={handleOnImage}
                        classNameWrapper={cl.imageList} />
                    <Button onClick={handleOnClickButton} variant={ButtonVariant.DEFAULT} 
                            beforeImage={IMAGE_ADD_ICON} beforeProps={{width: 20, height: 20}} 
                            loading={isUploadingImage}
                            className={cl.uploadImage} />
                </div>
            )}
        </div>
    )
}
