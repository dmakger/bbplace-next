'use client'
import { useActionCreators } from '@/storage/hooks'
import cl from './_LKProductPage.module.scss'

import Wrapper1280 from '@/shared/ui/Wrapper/1280/Wrapper1280'
import { ProductAPI } from '@/entities/Product/api/product.api'
import { useEffect, useState } from 'react'
import { ProductLK, ProductLKList } from '@/entities/Product/ui/LKProduct'
import { Modal } from '@/shared/ui/Modal/Modal'
import { EProductLKVariants } from '@/entities/Product/ui/LKProduct/model/productLK.model'
import { EModalView } from '@/shared/data/modal.data'
import { WrapperModalBottom } from '@/shared/ui/Wrapper/ModalBottom'
import { BottomProductSettingsModal } from '@/features/Modal/BottomProductSettings'
import { IProduct } from '@/entities/Product/model/product.model'
import { productApiListToProductList } from '@/entities/Product/lib/product.lib'
import { CurrencyAPI } from '@/entities/Metrics/api/currency.metrics.api'
import { MetricsAPI } from '@/entities/Metrics/api/metrics.metrics.api'
import { UserAPI } from '@/entities/Auth/api/auth.api'


export default function LKProductPage() {

    //STATE
    const [isOpenSettings, setIsOpenSettings] = useState<boolean>(false);
    const [isOpenGroup, setIsOpenGroup] = useState<boolean>(false);
    const [activeProducts, setActiveProducts] = useState<IProduct[]>([])
    const [draftsProducts, setDraftsProducts] = useState<IProduct[]>([])

    //API
    const [userLogin] = UserAPI.useUserLoginMutation();

    //RTK
    const actionCreators = useActionCreators();

    const login = async () => {
        try {
            const data = await userLogin({
                username: 'ilya-yudenkov@mail.ru',
                password: '12345Ii'
            }).unwrap();            
            if (data) {
                actionCreators.setAuth(data);
            }
        } catch (error) {
            console.error('Ошибка аутентификации:', error);
        }
    };

    useEffect(() => {
        login()
    }, [])

    //API
    const { data: activeProductsAPI } = ProductAPI.useGetProductsByUserQuery({ userId: `55736903-ec19-4ea8-a591-fb03369910b0`, limit: 100000000, page: 0 }, { refetchOnMountOrArgChange: true })
    const { data: draftsProductsAPI } = ProductAPI.useGetDraftsByUserQuery({ limit: 100000000, page: 0 }, { refetchOnMountOrArgChange: true })
    const { data: currencyList } = CurrencyAPI.useGetCurrenciesQuery()
    const { data: metrics } = MetricsAPI.useGetMetricsQuery()

    //EFFECT
    useEffect(() => {
        if (activeProductsAPI)
            setActiveProducts(productApiListToProductList(activeProductsAPI, metrics, currencyList))
    }, [activeProductsAPI, metrics, currencyList])

    useEffect(() => {
        if (draftsProductsAPI)
        setDraftsProducts(productApiListToProductList(draftsProductsAPI, metrics, currencyList))
    }, [draftsProductsAPI, metrics, currencyList])


    //FUNCTIONS
    const closeTheModal = () => {
        if (isOpenSettings) setIsOpenSettings(false)
        if (isOpenGroup) setIsOpenGroup(false)
    }


    return (
        <Wrapper1280>
            {activeProducts && <ProductLK product={activeProducts[128]}
                setIsOpenGroup={setIsOpenGroup}
                setIsOpenSettings={setIsOpenSettings}
                variant={EProductLKVariants.DEFAULT} />}
            <Modal view={EModalView.BOTTOM}
                buttonNode
                _isOpen={isOpenSettings || isOpenGroup}
                onClickOverlay={closeTheModal}>
                <WrapperModalBottom
                    setIsOpen={closeTheModal}
                    title={isOpenSettings ? "Выбор действия" : 'Варианты товара'}
                    bottomChildren={isOpenSettings ? activeProducts && <BottomProductSettingsModal
                        product={activeProducts[0]}
                        setIsOpen={setIsOpenSettings}
                    /> : isOpenGroup && activeProducts && <ProductLKList products={[]}
                        variant={EProductLKVariants.GROUP_ITEM} />}
                />
            </Modal>
        </Wrapper1280>
    )
}