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
import { useRouter } from "next/navigation";
import { MAIN_PAGES } from "@/config/pages-url.config";

interface LKProductTableCellProductProps{
    product: IProduct
    showCategory?: boolean
    isMin?: boolean
    className?: string,
}

export const LKProductTableCellProduct:FC<LKProductTableCellProductProps> = ({product, showCategory=true, isMin=false, className}) => {
    // ROUTE
    const router = useRouter()
    
    // STATE
    const [is1024, setIs1024] = useState(false) 

    // HANDLE
    const handleOnClickOption = () => {
        router.push(MAIN_PAGES.CURRENT_PRODUCT(product.id).path)
    }

    return (
        <>
            <div className={cls(cl.block, className)}>
                {(isMin || is1024) && product.category && showCategory &&
                    <TableCell.Text text={product.category.name} className={cl.category} />
                }

                {!(isMin || is1024) && product.media.attachments.length > 0 &&
                    <div className={cl.wrapperImage}>
                        <ImageAPI src={getImage(product.media.attachments[0])} width={90} height={90} className={cl.image} />
                    </div>
                }
                <div className={cl.right}>
                    {!(isMin || is1024) && product.category && showCategory && 
                        <TableCell.Text text={product.category.name} className={cl.category} />
                    }
                    <OptionT image={(isMin || is1024) && product.media.attachments.length > 0 ? getImage(product.media.attachments[0]) : undefined} 
                             classNameImage={cl.optionImage}
                             onClick={handleOnClickOption}
                             text={product.name} 
                             className={cl.option} classNameText={cl.optionText} />
                </div>
            </div>
            <HandleSize width={1024} set={setIs1024} />
        </>
    )
}
