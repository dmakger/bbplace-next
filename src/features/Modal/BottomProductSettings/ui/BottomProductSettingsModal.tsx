'use client'

import { Button, ButtonVariant } from '@/shared/ui/Button'
import cl from './_BottomProductSettingsModal.module.scss'
import { cls } from "@/shared/lib/classes.lib"
import { TRASH_ICON } from '@/shared/ui/Icon/data/trash.data.icon'
import { EDIT_ICON } from '@/shared/ui/Icon/data/edit.data.icon'
import { useRouter } from 'next/navigation'
import { ProductAPI } from '@/entities/Product/api/product.api'
import { DASHBOARD_PAGES } from '@/config/pages-url.config'
import { IProduct } from '@/entities/Product/model/product.model'
import { ButtonColor, ButtonSize } from '@/shared/ui/Button/model/button.model'

interface IBottomProductSettingsModal {
    className?: string,
    classNameButton?: string,
    product: IProduct,
    setIsOpen: Function
    isTitle?: boolean
}

export const BottomProductSettingsModal = ({
    className,
    classNameButton,
    product,
    setIsOpen,
    isTitle = true
}: IBottomProductSettingsModal) => {

    //API
    const [deleteProduct] = ProductAPI.useDeleteProductMutation()
    const [deleteDraft] = ProductAPI.useDeleteDraftMutation()

    //ROUTER
    const router = useRouter()

    //FUNCTION
    const delProduct = () => {
        if (product.media.attachments.length) {
            deleteProduct(product.id)
        }
        else {
            deleteDraft(product.id)
        }
        setIsOpen(false)
    }

    const navigateToEditProduct = (productId: number) => {
        router.push(DASHBOARD_PAGES.EDIT_PRODUCT(productId))
    }

    return (
        <div className={cls(cl.BottomProductSettingsModal, className)}>
            <Button title={isTitle ? 'Удалить' : ''}
                variant={ButtonVariant.TONAL}
                color={ButtonColor.Negative}
                size={ButtonSize.Medium}
                beforeImage={TRASH_ICON}
                beforeProps={{ width: 20, height: 20 }}
                onClick={delProduct}
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
        </div>
    )
}
