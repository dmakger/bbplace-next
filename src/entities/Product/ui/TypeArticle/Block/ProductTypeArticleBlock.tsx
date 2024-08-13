import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_ProductTypeArticleBlock.module.scss'
import { IListTopLevel, TListItemOnClick } from "@/shared/model/list.model";
import { IProduct } from "@/entities/Product/model/product.model";
import { List } from "@/shared/ui/List/Default/List";
import { ProductTypeArticleItem } from "../Item/ProductTypeArticleItem";
import { Button, ButtonVariant } from "@/shared/ui/Button";
import { ButtonColor, ButtonSize } from "@/shared/ui/Button/model/button.model";

interface ProductTypeArticleBlockProps extends IListTopLevel<IProduct> {
    onCreateProduct?: Function
}

export const ProductTypeArticleBlock:FC<ProductTypeArticleBlockProps> = ({
    activeId,
    onCreateProduct,
    
    items: products,
    className,
    ...rest
}) => {
    return (
        <div className={cls(cl.block, className)}>
            <List items={products} activeId={activeId !== undefined ? +activeId : undefined} component={ProductTypeArticleItem} {...rest} />
            {onCreateProduct && (
                <Button variant={ButtonVariant.TONAL} color={ButtonColor.Secondary} size={ButtonSize.Medium}
                        title={"Добавить вариант"} onClick={onCreateProduct} 
                        className={cl.buttonCreate} />
            )}
        </div>
    )
}
