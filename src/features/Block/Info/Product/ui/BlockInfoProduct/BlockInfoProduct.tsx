"use client"

import { FC, useEffect, useState } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_BlockInfoProduct.module.scss'
import { PriceQuantity } from "@/shared/ui/PriceQuantity/PriceQuantity";
import { IProduct } from "@/entities/Product/model/product.model";
import { IWholesale } from "@/entities/Metrics/model/wholesale.metrics.model";
import { getDiapason } from "@/entities/Metrics/lib/metrics/diapason.metrics.metrics.lib";

interface BlockInfoProductProps {
    product: IProduct
    className?: string,
}

export const BlockInfoProduct: FC<BlockInfoProductProps> = ({ product, className }) => {
    // STATE
    const [priceList, setPriceList] = useState<IWholesale[]>([]);

    // EFFECT
    useEffect(() => {
        setPriceList(getDiapason(product.media.wholesalePrices, product.media.sizes))
    }, [product])


    return (
        <div className={cls(cl.priceBlock, className)}>
            <PriceQuantity wholesales={priceList} 
                className={cl.mainBlock}
                classNameWholesaleBlock={cl.wholesale}
                classNameQuantity={cl.quantity}
                classNamePrice={cl.price}
                classNameForEvenNumbered={cl.evenNumbered}
                classNameOneItem={cl.oneItem} />
        </div>
    )
}
