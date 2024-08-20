import { Dispatch, FC, ReactNode, SetStateAction, useRef } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_InputAddition.module.scss'
import { Button, ButtonVariant } from "@/shared/ui/Button";
import { ButtonSize } from "@/shared/ui/Button/model/button.model";
import { IOption } from "@/shared/model/option.model";
import { OptionsAttachmentList } from "@/shared/ui/Form/OptionsAttachment/ui/List/OptionsAttachmentList";

export interface IInputAdditionProps {
    options?: IOption[]
    setOptions?: Dispatch<SetStateAction<IOption[]>>
    process?: (tempDataStorage: Record<string, any>) => IOption | undefined
    onClickAdd?: Function
    children?: ReactNode
    className?: string,
}

export const InputAddition:FC<IInputAdditionProps> = ({
    options=[], setOptions, 
    process, onClickAdd, 
    children, className
}) => {
    // REF
    const wrapperRef = useRef<HTMLDivElement | null>(null)

    const handleAddValue = () => {
        if (!wrapperRef.current) return;

        if (onClickAdd) 
            onClickAdd()

        const inputs = wrapperRef.current.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>('input, select, textarea');
        const formData = new FormData();

        inputs.forEach(input => {
            formData.append(input.name, input.value);
        });

        const tempDataStorage: Record<string, any> = {};
        formData.forEach((value, key) => {
            tempDataStorage[key] = value;
        });

        if (!process) return 
        const newOption = process(tempDataStorage)
        if (newOption && setOptions)
            setOptions(prevOptions => [...prevOptions, newOption])
    };

    return (
        <div ref={wrapperRef} className={cls(cl.block, className)}>
            {children}
            <Button variant={ButtonVariant.FILL} size={ButtonSize.Medium} 
                    title="Добавить" onClick={handleAddValue}
                    className={cl.button} />
            {setOptions && options && (
                <OptionsAttachmentList options={options} setOptions={setOptions} />
            )}
        </div>
    )
}
