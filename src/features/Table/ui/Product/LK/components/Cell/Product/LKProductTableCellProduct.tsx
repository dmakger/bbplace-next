'use client'

import { FC, SetStateAction, useState } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_LKProductTableCellProduct.module.scss'
import { IProduct } from "@/entities/Product/model/product.model";
import { ImageAPI } from "@/shared/ui/Image/API/ImageAPI";
import { getImage } from "@/shared/lib/image.lib";
import { OptionT } from "@/shared/ui/Option/ui/this/OptionT";
import TableCell from "@/shared/ui/Table/components/Cell";
import { HandleSize } from "@/shared/ui/Handle/Size/HandleSize";

interface LKProductTableCellProductProps{
    product: IProduct
    className?: string,
}

export const LKProductTableCellProduct:FC<LKProductTableCellProductProps> = ({product, className}) => {
    // STATE
    const [is1024, setIs1024] = useState(false) 

    return (
        <>
            <div className={cls(cl.block, className)}>
                {is1024 && product.category &&
                    <TableCell.Text text={product.category.name} className={cl.category} />
                }

                {!is1024 && product.media.attachments.length > 0 &&
                    <div className={cl.wrapperImage}>
                        <ImageAPI src={getImage(product.media.attachments[0])} className={cl.image} />
                    </div>
                }
                <div className={cl.right}>
                    {!is1024 && product.category && 
                        <TableCell.Text text={product.category.name} className={cl.category} />
                    }
                    <OptionT image={is1024 && product.media.attachments.length > 0 ? getImage(product.media.attachments[0]) : undefined} classNameImage={cl.optionImage}
                             text={product.name} 
                             className={cl.option} classNameText={cl.optionText} />
                </div>
            </div>
            <HandleSize width={1024} set={setIs1024} />
        </>
    )
}
