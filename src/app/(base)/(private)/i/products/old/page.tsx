'use client'
import cl from './_LKProductPage.module.scss'

import Wrapper1280 from '@/shared/ui/Wrapper/1280/Wrapper1280'
import { ProductAPI } from '@/entities/Product/api/product.api'
import { useEffect, useState, useCallback } from 'react'
import { ProductLKList } from '@/entities/Product/ui/LKProduct'
import { Modal } from '@/shared/ui/Modal/ui/Modal/Modal'
import { EProductLKVariants } from '@/entities/Product/ui/LKProduct/model/productLK.model'
import { EModalView } from '@/shared/data/modal.data'
import { WrapperModalBottom } from '@/shared/ui/Wrapper/ModalBottom'
import { IProduct } from '@/entities/Product/model/product.model'
import { productApiListToProductList } from '@/entities/Product/lib/product.lib'
import { CurrencyAPI } from '@/entities/Metrics/api/currency.metrics.api'
import { MetricsAPI } from '@/entities/Metrics/api/metrics.metrics.api'
import { LKSubheader } from '@/features/LKSubheader'
import { cls } from '@/shared/lib/classes.lib'
import SuspenseL from '@/shared/ui/Wrapper/SuspenseL/SuspenseL'
import { BottomInfoModal } from '@/features/Modal/BottomInfo'
import { EBottomInfoVariant } from '@/features/Modal/BottomInfo/model/bottomInfoModal.model'


export default function LKProductPage() {

    //STATE
    const [isOpenSettings, setIsOpenSettings] = useState<boolean>(false);
    const [isOpenGroup, setIsOpenGroup] = useState<boolean>(false);
    const [activeProducts, setActiveProducts] = useState<IProduct[]>([])
    const [draftsProducts, setDraftsProducts] = useState<IProduct[]>([])
    const [choosenProduct, setChoosenProduct] = useState<IProduct>()
    const [groupProducts, setGroupProducts] = useState<IProduct[]>([])
    const [checkedProductsId, setсheckedProductsId] = useState<number[]>([])

    //API
    // const { data: activeProductsAPI } = ProductAPI.useGetProductsByUserQuery({ userId: `55736903-ec19-4ea8-a591-fb03369910b0`, limit: 100000000, page: 0 }, { refetchOnMountOrArgChange: true })
    const { data: activeProductsAPI } = ProductAPI.useGetProductsByUserQuery({ userId: `55736903-ec19-4ea8-a591-fb03369910b0`, limit: 24, page: 0 }, { refetchOnMountOrArgChange: true })
    // const { data: draftsProductsAPI } = ProductAPI.useGetDraftsByUserQuery({ limit: 100000000, page: 0 }, { refetchOnMountOrArgChange: true })
    const { data: draftsProductsAPI } = ProductAPI.useGetDraftsByUserQuery({ limit: 24, page: 0 }, { refetchOnMountOrArgChange: true })
    const { data: currencyList } = CurrencyAPI.useGetCurrenciesQuery()
    const { data: metrics } = MetricsAPI.useGetMetricsQuery()


    //EFFECT
    useEffect(() => {
        if (activeProductsAPI && metrics && currencyList) {
            setActiveProducts(productApiListToProductList(activeProductsAPI, metrics, currencyList));
        }
        if (draftsProductsAPI && metrics && currencyList) {
            setDraftsProducts(productApiListToProductList(draftsProductsAPI, metrics, currencyList));
        }
    }, [activeProductsAPI, draftsProductsAPI, metrics, currencyList]);

    //FUNCTIONS
    const closeTheModal = useCallback(() => {
        if (isOpenSettings) setIsOpenSettings(false)
        if (isOpenGroup) setIsOpenGroup(false)
    }, [isOpenSettings, isOpenGroup]);

    return (
        <Wrapper1280>
            <SuspenseL>
                <LKSubheader
                    checkedItemsNumber={checkedProductsId.length}
                    className={checkedProductsId.length ? cl.showSubheader : ''}
                    checkedProductsId={checkedProductsId}
                    setсheckedProductsId={setсheckedProductsId} />

                {activeProducts.length > 0 && (
                    <ProductLKList products={activeProducts}
                        setIsOpenSettings={setIsOpenSettings}
                        isOpenGroup={isOpenGroup}
                        setIsOpenGroup={setIsOpenGroup}
                        choosenProduct={choosenProduct}
                        setChoosenProduct={setChoosenProduct}
                        setGroupProducts={setGroupProducts}
                        checkedProductsId={checkedProductsId}
                        setсheckedProducts={setсheckedProductsId}
                        variant={EProductLKVariants.DEFAULT} />
                )}

                <Modal view={EModalView.BOTTOM}
                    buttonNode
                    isOpen={isOpenSettings || isOpenGroup}
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
                                setсheckedProductsId={setсheckedProductsId} />
                        )}
                        bottomChildren={isOpenSettings ? (
                            activeProducts.length > 0 && (
                                <BottomInfoModal
                                    variant={EBottomInfoVariant.SETTINGS}
                                    product={choosenProduct!}
                                    setIsOpen={setIsOpenSettings}
                                />
                            )
                        ) : (
                            isOpenGroup && groupProducts.length > 0 && (
                                <ProductLKList
                                    products={groupProducts}
                                    variant={EProductLKVariants.GROUP_ITEM}
                                    checkedProductsId={checkedProductsId}
                                    setсheckedProducts={setсheckedProductsId}
                                />
                            )
                        )}
                        classNameBottomChild={isOpenGroup ? cl.paddingTop : ''}
                        isBorderTopOnBottomChild={isOpenGroup && groupProducts.length > 2}
                    />
                </Modal>
            </SuspenseL>

        </Wrapper1280>
    )
}
