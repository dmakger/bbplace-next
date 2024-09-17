'use client'

import { cls } from "@/shared/lib/classes.lib"
import cl from './_BottomInfoModal.module.scss'
import { EBottomInfoVariant } from "../model/bottomInfoModal.model"
import { Button, ButtonVariant } from "@/shared/ui/Button"
import { ButtonColor, ButtonSize } from "@/shared/ui/Button/model/button.model"
import { EDIT_ICON } from "@/shared/ui/Icon/data/edit.data.icon"
import { TRASH_ICON } from "@/shared/ui/Icon/data/trash.data.icon"
import { ProductAPI } from "@/entities/Product/api/product.api"
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
    setIsOpen?: Function

    className?: string,
    classNameText?: string,
    classNameButton?: string,
    classNameButtonContainer?: string,
}

export const BottomInfoModal = ({
    type,
    variant = EBottomInfoVariant.TEXT,
    text,
    product,
    isTitle = true,
    setIsOpen,

    className,
    classNameText,
    classNameButton,
    classNameButtonContainer,

}: IBottomInfo) => {

    //API
    const [deleteProduct] = ProductAPI.useDeleteProductMutation()
    const [deleteDraft] = ProductAPI.useDeleteDraftMutation()

    //ROUTER
    const router = useRouter()

    //FUNCTION
    const delProduct = async (id: number) => {
        if (product?.media.attachments.length) {
            await deleteProduct(id)
        }
        else {
            await deleteDraft(id)
        }
        setIsOpen && setIsOpen(false)
    }

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
                    onClick={() => delProduct(product ? product.id : 0)}
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