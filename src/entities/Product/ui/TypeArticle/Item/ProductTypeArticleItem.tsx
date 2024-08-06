import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_ProductTypeArticleItem.module.scss'
import { IListItem, TListItemOnClick } from "@/shared/model/list.model";
import { IProduct } from "@/entities/Product/model/product.model";
import { Button, ButtonVariant } from "@/shared/ui/Button";
import { ButtonColor } from "@/shared/ui/Button/model/button.model";
import { TRASH_NEGATIVE_TO_WHITE_ICON } from "@/shared/ui/Icon/data/trash.data.icon";
import { ImageAPI } from "@/shared/ui/Image/API/ImageAPI";
import { getImage } from "@/shared/lib/image.lib";
import { ImageProduction } from "@/shared/ui/Image/Production/ui/ImageProduction";

interface ProductTypeArticleItemProps extends IListItem<IProduct> {
    onClickDelete?: TListItemOnClick<IProduct>
}

export const ProductTypeArticleItem:FC<ProductTypeArticleItemProps> = ({
    item: product,
    isActive=false, 

    onClick,
    onClickDelete,
    className, 
    ...rest
}) => {
    // VARS
    const { media } = product

    // HANDLE
    const handleOnClick = () => {
        if (onClick) onClick()
    }

    // HTML
    return (
        <div onClick={handleOnClick} className={cls(cl.block, isActive ? cl.active : '', className)}>
            {onClickDelete && (
                <Button variant={ButtonVariant.CONTENT} color={ButtonColor.Negative} 
                        beforeImage={TRASH_NEGATIVE_TO_WHITE_ICON} 
                        onClick={onClickDelete} className={cl.buttonDelete} />
            )}
            {media.attachments.length > 0 && (
                <div className={cl.wrapperImage}>
                    <ImageAPI src={getImage(media.attachments[0])} className={cl.image} />
                </div>
            )}
            <div className={cl.text}>
                <span className={cl.type}>{media.color}</span>
                <span className={cl.article}>{media.article}</span>
            </div>
        </div>
    )
}
