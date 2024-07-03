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

interface IBottomInfo {
    className?: string,
    classNameText?: string,
    classNameButton?: string,
    classNameButtonContainer?: string,
    variant?: EBottomInfoVariant
    text?: string,
    product?: IProduct,
    isTitle?: boolean,
    setIsOpen?: Function
}

export const BottomInfoModal = ({
    className,
    classNameText,
    classNameButton,
    classNameButtonContainer,
    variant = EBottomInfoVariant.TEXT,
    text,
    product,
    isTitle = true,
    setIsOpen
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

    const navigateToEditProduct = (productId: number) => {
        router.push(DASHBOARD_PAGES.EDIT_PRODUCT(productId))
    }
    return (

        <div className={cls(cl.BottomInfo, className)}>
            {variant === EBottomInfoVariant.SETTINGS && <div className={cls(cl.buttonsContainer, classNameButtonContainer)}>
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
