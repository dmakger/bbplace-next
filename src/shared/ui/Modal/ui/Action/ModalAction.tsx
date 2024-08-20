import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_ModalAction.module.scss'
import { Modal } from "../Modal/Modal";
import { Button } from "@/shared/ui/Button";
import { EModalView } from "@/shared/data/modal.data";

interface ModalActionProps{
    title: string
    text?: string[]
    className?: string,
}

export const ModalAction:FC<ModalActionProps> = ({title, text=[], className}) => {
    return (
        <Modal 
            view={EModalView.CENTER}
            isOpen={true}
            buttonNode={
                <Button title="Cock" />
            } 
            className={cls(className)}
        >
            <div className={cl.wrapper}>
                <div className={cl.body}>
                    <h2 className={cl.title}>{title}</h2>
                    <div className={cl.text}>
                        {text.map(textItem => (
                            <p className={cl.textItem}>{textItem}</p>
                        ))}
                    </div>
                </div>
            </div>
        </Modal>
    )
}
