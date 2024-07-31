import { ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useRef, useState } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_InputImage.module.scss'
import { IWrapperRectangleInputChildren } from "@/shared/ui/Wrapper/RectangleInput/model/wrapperRectangleInput.model";
import { EInputVariants, IInput } from "../../../model/input.model";
import { Button, ButtonVariant } from "@/shared/ui/Button";
import { getInputImagePrompt } from "../lib/image.input.lib";
import { IMAGE_ADD_ICON } from "@/shared/ui/Icon/data/imageAdd.data.icon";
import { FileAPI } from "@/entities/File/api/file.api";
import { ImageAPI } from "@/shared/ui/Image/API/ImageAPI";
import { getImage } from "@/shared/lib/image.lib";
import { ScrollSlider } from "@/features/ScrollSlider";
import { ImageSlide } from "@/widgets/Slider/Image/Default/Item/ImageSlide";
import { CatalogImage } from "@/widgets/CatalogImage/CatalogImage";
import { ImageMaximizeSlider } from "@/widgets/Slider/Image/Maximize/List/ImageMaximizeSlider";

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
    const [activeImage, setActiveImage] = useState<string>()
    
    // API
    const [uploadFile] = FileAPI.useUploadFileMutation()


    // EFFECT
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
        if (!e.target.files || !setImageList) return;

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
        setImageList((prevImageList) => [...prevImageList, ...newSuccessAttachments]);
        setActiveImage(newSuccessAttachments[newSuccessAttachments.length - 1]);
    };
    
    return (
        <div className={cl.wrapper}>
            <Button variant={ButtonVariant.DEFAULT}
                    beforeImage={IMAGE_ADD_ICON} beforeProps={{width: 20, height: 20}}
                    title={locTitle} 
                    onClick={handleOnClickButton}
                    disabled={disabled}
                    className={cls(cl.block, cl[variant], disabled ? cl.disabled : '', className)}
                    classNameText={cl.text}
                    classNameTextHovered={cl.textHovered}
                    classNameTextDisabled={cl.textDisabled}
            >
                <input type="file" 
                        multiple={multiple}
                        ref={inputRef}
                        onChange={e => handleOnChange(e)}
                        className={cl.input}
                        disabled={disabled} {...rest}/>
            </Button>
            {imageList.length > 0 && (
                <div className={cl.bottom}>
                    <div className={cl.imageList}>
                        {imageList.map(image => (
                            <div className={cl.wrapperImage}>
                                <ImageAPI src={getImage(image)} className={cl.image} />
                            </div>
                        ))}
                    </div>
                    <Button onClick={handleOnClickButton} variant={ButtonVariant.DEFAULT} 
                            beforeImage={IMAGE_ADD_ICON} beforeProps={{width: 20, height: 20}} className={cl.uploadImage} />
                </div>
            )}
        </div>
    )
}
