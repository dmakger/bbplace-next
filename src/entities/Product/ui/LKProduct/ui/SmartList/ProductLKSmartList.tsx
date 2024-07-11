"use client"

import { FC, useCallback, useEffect, useState } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_ProductLKSmartList.module.scss'
import { IProduct } from "@/entities/Product/model/product.model";
import { ProductAPI } from "@/entities/Product/api/product.api";
import { CurrencyAPI } from "@/entities/Metrics/api/currency.metrics.api";
import { MetricsAPI } from "@/entities/Metrics/api/metrics.metrics.api";
import { UserAPI } from "@/entities/Auth/api/auth.api";
import { useActionCreators, useAppSelector } from "@/storage/hooks";
import { productApiListToProductList } from "@/entities/Product/lib/product.lib";
import { SuspenseL } from "@/shared/ui/Wrapper/SuspenseL/SuspenseL";
import { LKSubheader } from "@/features/LKSubheader";
import { ProductLKList } from "../list/ProductLKList";
import { Modal } from "@/shared/ui/Modal/Modal";
import { BottomInfoModal } from "@/features/Modal/BottomInfo";
import { EBottomInfoVariant } from "@/features/Modal/BottomInfo/model/bottomInfoModal.model";
import { EModalView } from "@/shared/data/modal.data";
import { WrapperModalBottom } from "@/shared/ui/Wrapper/ModalBottom";
import { EProductLKVariants } from "../../model/productLK.model";
import { ProductsTypeLK } from "@/shared/ui/SwitchSelector/data/switchSelector.data";
import { skipToken } from "@reduxjs/toolkit/query";

interface ProductLKSmartListProps{
    typeProduct: ProductsTypeLK
    className?: string,
}

export const ProductLKSmartList:FC<ProductLKSmartListProps> = ({typeProduct, className}) => {

    //STATE
    const [isOpenSettings, setIsOpenSettings] = useState<boolean>(false);
    const [isOpenGroup, setIsOpenGroup] = useState<boolean>(false);
    const [products, setProducts] = useState<IProduct[]>([])
    const [choosenProduct, setChoosenProduct] = useState<IProduct>()
    const [groupProducts, setGroupProducts] = useState<IProduct[]>([])
    const [checkedProductsId, setCheckedProductsId] = useState<number[]>([])

    // RTK
    const { id: userId } = useAppSelector(state => state.user)

    //API
    // const { data: activeProductsAPI } = ProductAPI.useGetProductsByUserQuery({ userId: `55736903-ec19-4ea8-a591-fb03369910b0`, limit: 100000000, page: 0 }, { refetchOnMountOrArgChange: true })
    const { data: activeProductsAPI } = ProductAPI.useGetProductsByUserQuery(typeProduct === ProductsTypeLK.Active ? { userId, limit: 100000000, page: 0 } : skipToken, { refetchOnMountOrArgChange: true })
    // const { data: draftsProductsAPI } = ProductAPI.useGetDraftsByUserQuery({ limit: 100000000, page: 0 }, { refetchOnMountOrArgChange: true })
    const { data: draftsProductsAPI } = ProductAPI.useGetDraftsByUserQuery(typeProduct === ProductsTypeLK.Draft ? { limit: 100000000, page: 0 } : skipToken, { refetchOnMountOrArgChange: true })
    const { data: currencyList } = CurrencyAPI.useGetCurrenciesQuery()
    const { data: metrics } = MetricsAPI.useGetMetricsQuery()

    //EFFECT
    useEffect(() => {
        if (activeProductsAPI && metrics && currencyList) {
            setProducts(productApiListToProductList(activeProductsAPI, metrics, currencyList));
        }
        if (draftsProductsAPI && metrics && currencyList) {
            setProducts(productApiListToProductList(draftsProductsAPI, metrics, currencyList));
        }
    }, [activeProductsAPI, draftsProductsAPI, metrics, currencyList]);

    //FUNCTIONS
    const closeTheModal = useCallback(() => {
        if (isOpenSettings) setIsOpenSettings(false)
        if (isOpenGroup) setIsOpenGroup(false)
    }, [isOpenSettings, isOpenGroup]);

    return (
        <SuspenseL>
            <LKSubheader
                checkedItemsNumber={checkedProductsId.length}
                className={checkedProductsId.length ? cl.showSubheader : ''}
                checkedProductsId={checkedProductsId}
                setCheckedProductsId={setCheckedProductsId} />

            {products.length > 0 && (
                <ProductLKList products={products}
                    setIsOpenSettings={setIsOpenSettings}
                    isOpenGroup={isOpenGroup}
                    setIsOpenGroup={setIsOpenGroup}
                    choosenProduct={choosenProduct}
                    setChoosenProduct={setChoosenProduct}
                    setGroupProducts={setGroupProducts}
                    checkedProductsId={checkedProductsId}
                    setCheckedProducts={setCheckedProductsId}
                    variant={EProductLKVariants.DEFAULT} />
            )}

            <Modal view={EModalView.BOTTOM}
                buttonNode
                _isOpen={isOpenSettings || isOpenGroup}
                onClickOverlay={closeTheModal}>
                <WrapperModalBottom
                    setIsOpen={closeTheModal}
                    title={isOpenSettings ? "Выбор действия" : isOpenGroup && !checkedProductsId.length ? 'Варианты товара' : ''}
                    className={checkedProductsId.length ? cl.noPadding : ''}
                    classNameTitle={!checkedProductsId.length && isOpenGroup ? cl.showTitle : ''}
                    classNameTopChild={isOpenGroup ? cl.noMarginTop : ''}
                    topChildren={isOpenGroup && (
                        <LKSubheader
                            checkedItemsNumber={checkedProductsId.length}
                            className={cls(cl.subHeaderModal, checkedProductsId.length ? cl.showSubheader : '')}
                            checkedProductsId={checkedProductsId}
                            setCheckedProductsId={setCheckedProductsId} />
                    )}
                    bottomChildren={isOpenSettings ? (products.length > 0 && (
                        <BottomInfoModal
                            variant={EBottomInfoVariant.SETTINGS}
                            product={choosenProduct!}
                            setIsOpen={setIsOpenSettings}
                        />
                    )) : (isOpenGroup && groupProducts.length > 0 && (
                        <ProductLKList
                            products={groupProducts}
                            variant={EProductLKVariants.GROUP_ITEM}
                            checkedProductsId={checkedProductsId}
                            setCheckedProducts={setCheckedProductsId}
                        />
                    ))}
                    classNameBottomChild={isOpenGroup ? cl.paddingTop : ''}
                    isBorderTopOnBottomChild={isOpenGroup && groupProducts.length > 2}
                />
            </Modal>
        </SuspenseL>
    )
}
