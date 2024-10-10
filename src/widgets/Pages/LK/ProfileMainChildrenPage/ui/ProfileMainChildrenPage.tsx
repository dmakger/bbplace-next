'use client'

import { useAppSelector } from "@/storage/hooks"
import { ECurrentLK } from "@/entities/User/model/user.model"
import { PROFILE_CABINET_EMAIL_VERIFICATION_MESSAGE, PROFILE_CABINET_PHONE_NUMBER_VERIFICATION_MESSAGE } from "../data/profileMainChildrenPage.data"
import { IBlockCabinetModule } from "@/features/Block/Cabinet/Module/ui/BlockCabinetModule"
import { Button, ButtonVariant } from "@/shared/ui/Button"
import { ButtonColor, ButtonSize } from "@/shared/ui/Button/model/button.model"
import { PRODUCT_PLUS_SECONDARY_ICON } from "@/shared/ui/Icon/data/product.data.icon"
import { DASHBOARD_PAGES } from "@/config/pages-url.config"
import { TENDER_PLUS_SECONDARY_ICON } from "@/shared/ui/Icon/data/tender.data.icon"
import { ProductAPI } from "@/entities/Product/api/product.api"
import { TenderAPI } from "@/entities/Tender/api/tender.api"
import { toTenderType } from "@/entities/Tender/lib/tender.lib"
import { ETenderType } from "@/entities/Tender/model/tender.model"
import { FavouriteAPI } from "@/entities/Favourite/api/favourite.api"
import { IIcon } from "@/shared/ui/Icon/model/icon.model"
import { ProfileMain } from "../components/ProfileMain/ProfileMain"
import { PRODUCT_ARGS_REQUEST } from "@/entities/Product/data/product.data"
import { MetricsAPI } from "@/entities/Metrics/api/metrics.metrics.api"
import { CurrencyAPI } from "@/entities/Metrics/api/currency.metrics.api"
import { useEffect, useState } from "react"
import { IProduct } from "@/entities/Product/model/product.model"
import { productApiListToProductList } from "@/entities/Product/lib/product.lib"
import { UserAPI } from "@/entities/Auth/api/auth.api"
import { ISupplier } from "@/entities/Supplier/model/supplier.model"


export const ProfileMainChildrenPage = () => {

    //STATE
    const [productList, setProductList] = useState<IProduct[]>([]);

    //RTK
    const { currentLK, id: userId, ...userInfo } = useAppSelector(state => state.user)

    //API
    const { data: productsAPI } = ProductAPI.useGetProductsQuery({ limit: PRODUCT_ARGS_REQUEST.limit, page: 0 }, { refetchOnMountOrArgChange: true });
    const { data: activeProductsNumber } = ProductAPI.useGetPagesProductsByUserQuery({ userId, limit: 1 })
    const { data: draftsProductsNumber } = ProductAPI.useGetPagesDraftsByUserQuery({ limit: 1 })

    const { data: currencyList } = CurrencyAPI.useGetCurrenciesQuery();
    const { data: metrics } = MetricsAPI.useGetMetricsQuery();

    const { data: tenders } = TenderAPI.useGetUserTendersQuery({ userId })
    const { data: saleTenders } = TenderAPI.useGetUserTendersQuery({ userId, type: toTenderType(ETenderType.SALE) })
    const { data: purchaseTenders } = TenderAPI.useGetUserTendersQuery({ userId, type: toTenderType(ETenderType.PURCHASE) })

    const { data: favouriteProducts } = FavouriteAPI.useGetFavouriteProductsQuery()
    const { data: favouritePurchaseTenders } = FavouriteAPI.useGetFavouritePurchasesQuery()
    const { data: favouriteSaleTenders } = FavouriteAPI.useGetFavouriteSalesQuery()

    const { data: userAsSupplier } = UserAPI.useGetUserDataQuery(userId)


    //EFFECT
    useEffect(() => {
        if (productsAPI && metrics && currencyList) {
            setProductList(productApiListToProductList(productsAPI, metrics, currencyList))
        }
    }, [productsAPI, metrics, currencyList]);

    //FUNCTIONS
    const sumItems = (items: (number | undefined)[]) => items.reduce((acc, curr) => (acc ?? 0) + (curr || 0), 0);

    const getProductsSum = () => String(sumItems([activeProductsNumber ?? 0, draftsProductsNumber ?? 1]))
    const getFavouritesSum = () => String(sumItems([favouriteProducts?.length, favouritePurchaseTenders?.length, favouriteSaleTenders?.length]))

    const createHeaderButton = (href: string, icon: IIcon) => (
        <Button
            variant={ButtonVariant.FILLED}
            color={ButtonColor.Secondary}
            size={ButtonSize.Medium}
            beforeImage={icon}
            href={href}
        />
    )

    //VARIABLES
    const PROFILE_MESSAGE_ARRAY = [
        PROFILE_CABINET_EMAIL_VERIFICATION_MESSAGE,
        // PROFILE_CABINET_PHONE_NUMBER_VERIFICATION_MESSAGE
    ]

    const CABINET_MODULE_SUPPLIER_ARRAY: IBlockCabinetModule[] = [
        {
            title: 'Товары',
            titleQuantity: getProductsSum(),
            href: DASHBOARD_PAGES.PRODUCTS(false).path,
            statisticsTextArray: [
                { title: 'Созданные', quantity: String(activeProductsNumber) },
                { title: 'Без цен', quantity: '0' },
                { title: 'Черновики', quantity: String(draftsProductsNumber) }
            ],
            headerButton: createHeaderButton(DASHBOARD_PAGES.NEW_PRODUCT.path, PRODUCT_PLUS_SECONDARY_ICON)
        },
        {
            title: 'Цены и скидки',
            href: DASHBOARD_PAGES.PRICES_N_DISCOUNTS.path,
            mainBlockText: 'Массовое обновление цен у товаров'
        },
        {
            title: 'Тендеры',
            titleQuantity: String(tenders?.length),
            href: DASHBOARD_PAGES.TENDERS(false).path,
            statisticsTextArray: [
                { title: 'Продажа', quantity: String(saleTenders?.length) },
                { title: 'Покупка', quantity: String(purchaseTenders?.length) }
            ],
            headerButton: createHeaderButton(DASHBOARD_PAGES.NEW_TENDER.path, TENDER_PLUS_SECONDARY_ICON)
        },
        {
            title: 'Отзывы',
            mainBlockText: 'Вот-вот станут доступны',
            disabled: true
        },
        {
            title: 'Чат',
            href: DASHBOARD_PAGES.CHATS('').path,
            statisticsTextArray: [{ title: 'Непрочитанные', quantity: String(userInfo.unreadMessages) }]
        },
        {
            title: 'Избранное',
            titleQuantity: getFavouritesSum(),
            statisticsTextArray: [
                { title: 'Товары', quantity: String(favouriteProducts?.length) },
                { title: 'Тендеры', quantity: String(favouritePurchaseTenders?.length) },
                { title: 'Поставщики', quantity: String(favouriteSaleTenders?.length) }
            ],
            headerButton: createHeaderButton(DASHBOARD_PAGES.NEW_PRODUCT.path, PRODUCT_PLUS_SECONDARY_ICON)
        }
    ]

    const CABINET_MODULE_BUYER_ARRAY: IBlockCabinetModule[] = [
        {
            title: 'Тендеры',
            titleQuantity: String(tenders?.length),
            href: DASHBOARD_PAGES.TENDERS(false).path,
            statisticsTextArray: [
                { title: 'Продажа', quantity: String(saleTenders?.length) },
                { title: 'Покупка', quantity: String(purchaseTenders?.length) }
            ],
            headerButton: createHeaderButton(DASHBOARD_PAGES.NEW_TENDER.path, TENDER_PLUS_SECONDARY_ICON)
        },
        {
            title: 'Отзывы',
            mainBlockText: 'Вот-вот станут доступны',
            disabled: true
        },
        {
            title: 'Новости',
            mainBlockText: 'Скоро всё вам расскажем',
            disabled: true,
            className: 'newsModule'
        },
        {
            title: 'Чат',
            href: DASHBOARD_PAGES.CHATS('').path,
            statisticsTextArray: [{ title: 'Непрочитанные', quantity: '' }]
        },
        {
            title: 'Избранное',
            href: DASHBOARD_PAGES.FAVOURITES.path,
            titleQuantity: getFavouritesSum(),
            statisticsTextArray: [
                { title: 'Товары', quantity: String(favouriteProducts?.length) },
                { title: 'Тендеры', quantity: String(favouritePurchaseTenders?.length) },
                { title: 'Поставщики', quantity: String(favouriteSaleTenders?.length) }
            ]
        }
    ]

    const cabinetModules = currentLK === ECurrentLK.SUPPLIER ? CABINET_MODULE_SUPPLIER_ARRAY : CABINET_MODULE_BUYER_ARRAY

    return <ProfileMain
        productList={productList}
        currentLK={currentLK!}
        profileMessageArray={PROFILE_MESSAGE_ARRAY}
        cabinetModuleArray={cabinetModules}
        userAsSupplier={userAsSupplier as ISupplier}
        {...userInfo}
    />
}
