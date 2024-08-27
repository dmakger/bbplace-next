'use client'

import Image from 'next/image';

import { cls } from "@/shared/lib/classes.lib";
import cl from './_InputRadio.module.scss';
import { IOption } from "@/shared/model/option.model";
import { EInputVariants, IInput } from '../../../model/input.model';
import { Button, ButtonVariant } from '@/shared/ui/Button';
import { CHECKBOX_TERTIARY_ICON } from '@/shared/ui/Icon/data/checkbox.data.icon';
import { useEffect, useState } from 'react';
import { IWrapperRectangleInputChildren } from '@/shared/ui/Wrapper/RectangleInput/model/wrapperRectangleInput.model';
import { IImageSizes } from '@/shared/model/image.model';
import { ERadioVariant } from '../model/radio.model';
import { ImageSmart } from '@/shared/ui/Image/Smart/ImageSmart';
import { CHECK_MARK__DARK__ICON } from '@/shared/ui/Icon/data/checkMark.data.icon';

interface InputRadioProps extends IInput, IWrapperRectangleInputChildren {
    option: IOption;
    isActive?: boolean;
    onClick?: Function;
    checkMarkSizes?: IImageSizes;
    variantRadio?: ERadioVariant
}

export function InputRadio({
    variant = EInputVariants.ROUNDED,
    variantRadio = ERadioVariant.LIST,
    option,
    isActive = false,
    name,
    required = false,
    onClick,
    checkMarkSizes = {
        width: 20,
        height: 15,
    },
    className,
    warning,
    success,
    selectedOption,
    setSelectedOption,
    setWarning,
    setSuccess,
    error
}: InputRadioProps) {

    // STATE
    const [isOwnChecked, setIsOwnChecked] = useState<boolean>(false);

    // EFFECT
    useEffect(() => {
        // console.log('qwe selectedOption', selectedOption?.id !== option.id)
        if (selectedOption?.id !== option.id) {
            setIsOwnChecked(false); 
        } 
        // setIsOwnChecked(selectedOption?.id !== option.id)
        if(selectedOption){
            setWarning && setWarning(false)
            setSuccess && setSuccess(true)
        } 
        
    }, [selectedOption]);

    useEffect(() => {
        setIsOwnChecked(isActive)
        setWarning && setWarning(false)
        setSuccess && setSuccess(true)
    }, [isActive])

    useEffect(() => {
        if (error && !selectedOption) {
            setWarning && setWarning(true)
            setSuccess && setSuccess(false)
        }
    },[error])
    

    // FUNCTION
    const handleRadioClick = (opt: IOption) => {
        setWarning && setWarning(false)
            setSuccess && setSuccess(true) 
        if (selectedOption?.id !== opt.id) {
            setIsOwnChecked(true);
            setSelectedOption && setSelectedOption(opt);
            
        }
    };

    const handleOnClick = () => {
        handleRadioClick(option);
        if (onClick) onClick();
    };
    

    return (
        <label
            onClick={handleOnClick}
            className={cls(
                cl.block,
                cl[variant],
                (variantRadio === ERadioVariant.LIST ? isActive : isOwnChecked) ? cl.active : '',
                className,
                variantRadio === ERadioVariant.SINGLE ? cl.singleRadio : '',
                variantRadio === ERadioVariant.LIST && variant === EInputVariants.RECTANGULAR ? cl.listRadio : '',
            )}
        >
            <input
                type="radio"
                name={name}
                value={option.value ? option.value : option.id}
                required={required}
                className={cl.input}
                checked={isOwnChecked}
                onChange={handleOnClick}
            />
            {variantRadio === ERadioVariant.SINGLE && (
                <Button
                    variant={ButtonVariant.DEFAULT}
                    beforeImage={CHECKBOX_TERTIARY_ICON}
                    beforeProps={{ width: checkMarkSizes.width, height: checkMarkSizes.height, classNameImage: isOwnChecked ? cl.checkMark : '' }}
                    className={cls(
                        cl.radio,
                        isOwnChecked ? cl.checked : '',
                        warning ? cl.warning : '',
                        success ? cl.success : ''
                    )}
                    active={isOwnChecked}
                    onClick={handleOnClick}
                />
            )}
            <span className={cl.text}>{option.name}</span>
            {variant === EInputVariants.ROUNDED && 
                <ImageSmart icon={CHECK_MARK__DARK__ICON} alt={'check'} 
                            width={8} height={8} 
                            className={cl.checkMark} />
            }
        </label>
    );
}
