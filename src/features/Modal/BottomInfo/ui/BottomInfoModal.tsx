'use client'

import { cls } from "@/shared/lib/classes.lib"
import cl from './_BottomInfoModal.module.scss'
import { EBottomInfoVariant } from "../model/bottomInfoModal.model"
import { Button, ButtonVariant } from "@/shared/ui/Button"
import { ButtonColor, ButtonSize } from "@/shared/ui/Button/model/button.model"
import { EDIT_ICON } from "@/shared/ui/Icon/data/edit.data.icon"
import { TRASH_ICON } from "@/shared/ui/Icon/data/trash.data.icon"
import { DASHBOARD_PAGES } from "@/config/pages-url.config"
import { IProduct } from "@/entities/Product/model/product.model"
import { useRouter } from "next/navigation"
import { ProductsTypeLK } from "@/shared/ui/SwitchSelector/data/switchSelector.data"
import { EProductType } from "@/entities/Product/data/type.product.data"

interface IBottomInfo {
    type?: ProductsTypeLK
    variant?: EBottomInfoVariant
    text?: string,
    product?: IProduct,
    isTitle?: boolean,
    setIsOpen?: Function,
    setProducts?: Function,
    setIsOpenDelModal?: Function
    
    className?: string,
    classNameText?: string,
    classNameButton?: string,
    classNameButtonContainer?: string,
}

export const BottomInfoModal = ({
    type = ProductsTypeLK.Active,
    variant = EBottomInfoVariant.TEXT,
    text,
    product,
    isTitle = true,
    setIsOpenDelModal,

    className,
    classNameText,
    classNameButton,
    classNameButtonContainer,

}: IBottomInfo) => {

    //ROUTER
    const router = useRouter()

    //FUNCTION
    const openDelModal = () => setIsOpenDelModal && setIsOpenDelModal(true);

    const navigateToEditProduct = () => {
        if (!product || product.groupId === null) return
        const {groupId, id} = product
        const typeProduct = type === ProductsTypeLK.Active ? EProductType.Public : EProductType.Draft
        router.push(DASHBOARD_PAGES.EDIT_PRODUCT({type: typeProduct, groupId, id}).path);
    }
     
    return (

        <div className={cls(cl.BottomInfo, className)}>
            {variant === EBottomInfoVariant.SETTINGS && <div className={cls(cl.buttonsContainer, !isTitle ? cl.noPadding : '', classNameButtonContainer)}>
                <Button title={isTitle ? 'Удалить' : ''}
                    variant={ButtonVariant.TONAL}
                    color={ButtonColor.Negative}
                    size={ButtonSize.Medium}
                    beforeImage={TRASH_ICON}
                    beforeProps={{ width: 20, height: 20 }}
                    onClick={openDelModal}
                    className={classNameButton}
                />
                <Button title={isTitle ? 'Редактировать' : ''}
                    variant={ButtonVariant.TONAL}
                    color={ButtonColor.Secondary}
                    size={ButtonSize.Medium}
                    beforeImage={EDIT_ICON}
                    beforeProps={{ width: 20, height: 20 }}
                    onClick={navigateToEditProduct}
                    className={classNameButton}
                />
            </div>}

            {variant === EBottomInfoVariant.TEXT && <p className={cls(cl.bottomText, classNameText)}>
                {text}
            </p>}
        </div>
    )
}