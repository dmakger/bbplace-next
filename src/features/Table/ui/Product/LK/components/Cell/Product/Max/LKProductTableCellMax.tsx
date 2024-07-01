import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_LKProductTableCellMax.module.scss'
import { IProduct } from "@/entities/Product/model/product.model";
import { ImageAPI } from "@/shared/ui/Image/API/ImageAPI";
import { getImage } from "@/shared/lib/image.lib";
import { OptionT } from "@/shared/ui/Option/ui/this/OptionT";
import TableCell from "@/shared/ui/Table/components/Cell";

interface LKProductTableCellMaxProps{
    product: IProduct
    className?: string,
}

export const LKProductTableCellMax:FC<LKProductTableCellMaxProps> = ({product, className}) => {
    console.log('product qwe', product);
    
    return (
        <div className={cls(cl.block, className)}>
            {product.media.attachments.length > 0 &&
                <div className={cl.wrapperImage}>
                    <ImageAPI src={getImage(product.media.attachments[0])} className={cl.image} />
                </div>
            }
            <div className={cl.right}>
                {product.category && 
                    <TableCell.Text text={product.category.name} className={cl.category} />
                }
                <OptionT text={product.name} className={cl.option} classNameText={cl.optionText} />
            </div>
        </div>
    )
}
