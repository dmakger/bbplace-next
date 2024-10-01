'use client'

import { cls } from "@/shared/lib/classes.lib"
import cl from './_LKSubheader.module.scss'
import { Button, ButtonVariant } from "@/shared/ui/Button"
import { ButtonColor, ButtonSize } from "@/shared/ui/Button/model/button.model"
import { HandleSize } from "@/shared/ui/Handle/Size/HandleSize"
import { useState } from "react"
import { ButtonDelete } from "@/shared/ui/Button/data/Delete/ButtonDelete"

interface ILKSubheader {
    className?: string,
    checkedItemsNumber: number,
    setCheckedProductsId: Function,
    setIsOpenDelModal?: Function
}

export const LKSubheader = ({
    className,
    checkedItemsNumber,
    setCheckedProductsId,
    setIsOpenDelModal
}: ILKSubheader) => {

    //STATE
    const [is425, setIs425] = useState<boolean>(false)

    //FUNCTION
    const openDelModal = () => setIsOpenDelModal && setIsOpenDelModal(true);
    const handleCancel = () => setCheckedProductsId([]);

    return (
        <>
            <div className={cls(cl.LKSubheader, className)}>
                <div className={cl.container}>
                    <Button variant={ButtonVariant.CONTENT}
                        color={ButtonColor.Secondary}
                        size={ButtonSize.Medium}
                        title="Отмена"
                        onClick={handleCancel} />

                    <span className={cl.checkedItemsNumber}>
                        Выбрано: <span>{checkedItemsNumber}</span>
                    </span>

                    <ButtonDelete
                        title={is425 ? '' : 'Удалить'}
                        classNameButton={cl.delButton}
                        handleDelete={openDelModal}
                    />
                </div>
            </div>
            <HandleSize width={425} set={setIs425} />
        </>

    )
}
