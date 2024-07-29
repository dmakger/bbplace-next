import { Dispatch, FC, ReactNode, SetStateAction, useRef } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_InputAddition.module.scss'
import { Button, ButtonVariant } from "@/shared/ui/Button";
import { ButtonSize } from "@/shared/ui/Button/model/button.model";
import { IOption } from "@/shared/model/option.model";
import { OptionsAttachmentList } from "@/shared/ui/Form/OptionsAttachment/ui/List/OptionsAttachmentList";

interface InputAdditionProps {
    options: IOption[]
    setOptions: Dispatch<SetStateAction<IOption[]>>
    children?: ReactNode
    className?: string,
}

export const InputAddition:FC<InputAdditionProps> = ({options=[], setOptions, children, className}) => {
    // REF
    const wrapperRef = useRef<HTMLDivElement | null>(null)

    const handleAddValue = () => {
        if (!wrapperRef.current) return;

        const inputs = wrapperRef.current.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>('input, select, textarea');
        const formData = new FormData();

        inputs.forEach(input => {
            formData.append(input.name, input.value);
        });

        const tempDataStorage: Record<string, any> = {};
        formData.forEach((value, key) => {
            tempDataStorage[key] = value;
        });

        console.log('qwe tempDataStorage', tempDataStorage); // Logging to check collected data
    };

    return (
        <div ref={wrapperRef} className={cls(cl.block, className)}>
            {children}
            <Button variant={ButtonVariant.FILL} size={ButtonSize.Medium} 
                    title="Добавить" onClick={handleAddValue}
                    className={cl.button} />
            <OptionsAttachmentList options={options} setOptions={setOptions} />
        </div>
    )
}
