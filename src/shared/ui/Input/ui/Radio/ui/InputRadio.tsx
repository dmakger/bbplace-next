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
import { EVariantRadio } from '../model/radio.model';

interface InputRadioProps extends IInput, IWrapperRectangleInputChildren {
    option: IOption;
    isActive?: boolean;
    onClick?: Function;
    checkMarkSizes?: IImageSizes;
    variantRadio?: EVariantRadio;
    error?: boolean,
    setError?: Function
}

export function InputRadio({
    variant = EInputVariants.ROUNDED,
    variantRadio = EVariantRadio.LIST,
    option,
    isActive = false,
    name,
    required = false,
    onClick,
    checkMarkSizes = {
        width: 18,
        height: 13,
    },
    className,
    checked,
    setChecked,
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
        if (selectedOption?.id !== option.id) {
            setIsOwnChecked(false); 
        } 
        if(selectedOption){
            setWarning && setWarning(false)
            setSuccess && setSuccess(true)
        } 
        
    }, [selectedOption]);

    useEffect(() => {
        if (error) {
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
                isActive ? cl.active : '',
                className,
                variantRadio === EVariantRadio.SINGLE ? cl.singleRadio : '',
                variantRadio === EVariantRadio.LIST && variant === EInputVariants.RECTANGULAR ? cl.listRadio : '',
            )}
        >
            <input
                type="radio"
                name={name}
                value={option.value ? option.value : option.id}
                defaultChecked={isActive}
                required={required}
                className={cl.input}
                checked={isOwnChecked}
            />
            {variantRadio === EVariantRadio.SINGLE && (
                <Button
                    variant={ButtonVariant.DEFAULT}
                    beforeImage={CHECKBOX_TERTIARY_ICON}
                    beforeProps={{ width: checkMarkSizes.width, height: checkMarkSizes.height, classNameImage: isOwnChecked ? cl.image : '' }}
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
            {variant === EInputVariants.ROUNDED && <Image src={'check-mark.svg'} alt={'check'} width={8} height={8} className={!isOwnChecked ? cl.arrowImage : ''} />}
        </label>
    );
}
