"use client"

import { cls } from "@/shared/lib/classes.lib"
import cl from './_ProductSingleCreationPage.module.scss'
import { useEffect, useMemo, useRef, useState } from "react"
import { useAppSelector } from "@/storage/hooks"
import { ProductForm } from "@/features/Form/Product/ui/Single/ProductForm"
import { ProductAPI } from "@/entities/Product/api/product.api"
import { skipToken } from "@reduxjs/toolkit/query"
import { IProduct, IProductAPI } from "@/entities/Product/model/product.model"
import { CurrencyAPI } from "@/entities/Metrics/api/currency.metrics.api"
import { MetricsAPI } from "@/entities/Metrics/api/metrics.metrics.api"
import { productApiListToProductList } from "@/entities/Product/lib/product.lib"
import { ProductTypeArticleBlock } from "@/entities/Product/ui/TypeArticle/Block/ProductTypeArticleBlock"
import { TListItemOnClick } from "@/shared/model/list.model"
import { CountryAPI } from "@/entities/Metrics/api/country.metrics.api"
import { isValidPropsProductForm, productToNewPropsProductForm, productToPropsProductForm } from "@/features/Form/Product/lib/product.form.lib"
import { IPropsProductForm } from "@/features/Form/Product/model/product.form.model"
import { useRouter } from "next/navigation"
import { DASHBOARD_PAGES } from "@/config/pages-url.config"
import { isDraftByPropsCreateUpdateProduct, productFormToCreateOrEditProduct, productFormToCreateProductTest, propsUpdateToCreateProduct } from "@/entities/Product/serializer/propsCreate.product.serializer"
import { IPropsCreateProduct, IPropsUpdateProduct } from "@/entities/Product/model/props.product.model"
import { EProductType } from "@/entities/Product/data/type.product.data"
import { IModalActionProps, ModalAction } from "@/shared/ui/Modal/ui/Action/ModalAction"
import { EModalView } from "@/shared/data/modal.data"
import { ButtonVariant } from "@/shared/ui/Button"
import { ButtonColor, ButtonSize } from "@/shared/ui/Button/model/button.model"
import { Button, IButton } from "@/shared/ui/Button/ui/Button"
import { useNotify } from "@/features/Notify/lib/hooks"
import { ENotifyStatus } from "@/features/Notify/data/notify.data"
import { HandleSize } from "@/shared/ui/Handle/Size/HandleSize"
import { Modal } from "@/shared/ui/Modal/ui/Modal/Modal"
import { WrapperModalBottom } from "@/shared/ui/Wrapper/ModalBottom"
import { List } from "@/shared/ui/List/Default/List"
import { ProductTypeArticleItem } from "@/entities/Product/ui/TypeArticle/Item/ProductTypeArticleItem"

interface IProductSingleCreationPage {
    groupId?: string | null
    productId?: string | null
    isDraft?: boolean
    className?: string,
}

export const ProductSingleCreationPage = ({ groupId, productId, isDraft=false, className }: IProductSingleCreationPage) => {
    // ROUTE
    const router = useRouter();

    // RTK
    const { id: userId } = useAppSelector(state => state.user)
    
    // NOTIFY
    const {notify} = useNotify();

    // REF
    const productFormRef = useRef<{
        getUpdatedData: () => Promise<IPropsProductForm>,
        writeFormDataToParent: () => void,
    } | null>(null)

    // STATE
    // const [isEdit, setIsEdit] = useState(!!productId)
    const [products, setProducts] = useState<IProduct[]>([])
    const [currentProduct, setCurrentProduct] = useState<IProduct | undefined>()
    const [currentPropsProduct, setCurrentPropsProduct] = useState<IPropsProductForm | undefined>()
    const [showModal, setShowModal] = useState<boolean>(false)
    const [showBottomModal, setShowBottomModal] = useState<boolean>(false)
    const [currentModalProps, setCurrentModalProps] = useState<IModalActionProps | undefined>()
    const [pendingNavigation, setPendingNavigation] = useState<IProduct | undefined>(undefined);
    // const [nextURL, setNextURL] = useState<string | undefined>();

    // API
    const { data: productsAPI } = ProductAPI.useGetProductsByGroupQuery(!isDraft && groupId ? groupId : skipToken, {refetchOnMountOrArgChange: true})
    const { data: draftsAPI } = ProductAPI.useGetDraftsByGroupQuery(isDraft && groupId ? groupId : skipToken, {refetchOnMountOrArgChange: true})
    const { data: currencies } = CurrencyAPI.useGetCurrenciesQuery();
    const { data: metrics } = MetricsAPI.useGetMetricsQuery();
    const { data: countries } = CountryAPI.useGetCountriesQuery();

    const [ getProductById ] = ProductAPI.useGetProductByIdMutation()
    const [ createProduct ] = ProductAPI.useCreateProductMutation()
    const [ updateProduct ] = ProductAPI.useUpdateProductMutation()
    const [ deleteProduct ] = ProductAPI.useDeleteProductMutation()
    const [ createGroup ] = ProductAPI.useCreateGroupMutation()
    const [ addProductToGroup ] = ProductAPI.useAddProductToGroupMutation()

    const [ getDraftProductById ] = ProductAPI.useGetDraftProductByIdMutation()
    const [ createDraftProduct ] = ProductAPI.useCreateDraftProductMutation()
    const [ updateDraftProduct ] = ProductAPI.useUpdateDraftProductMutation()
    const [ deleteDraftProduct ] = ProductAPI.useDeleteDraftMutation()
    const [ createDraftGroup ] = ProductAPI.useCreateDraftGroupMutation()
    const [ addProductToDraftGroup ] = ProductAPI.useAddProductToDraftGroupMutation()

    const [is768, setIs768] = useState(false)


    // MEMO
    const typeProduct = useMemo(() => isDraft ? EProductType.Draft : EProductType.Public, [isDraft])
    const isEditForm = useMemo(() => !!productId, [productId])

    // EFFECT
    useEffect(() => {
        if ((!currencies || !metrics || !countries) || !(productsAPI || draftsAPI)) return
        const productsAPILoaded = (isDraft ? draftsAPI : productsAPI) as IProductAPI[]
        addProductsInSidebar(productsAPILoaded)
    }, [productsAPI, draftsAPI, currencies, metrics, countries])

    useEffect(() => {
        if (products.length === 0) return 
        const _currentProduct = productId ? products.find(it => it.id === +productId) : undefined
        if (_currentProduct) {
            setCurrentProduct(_currentProduct)
            setCurrentPropsProduct(productToPropsProductForm(_currentProduct))
        }
        else {
            setCurrentPropsProduct(productToNewPropsProductForm(products[0].categoryId))
        }  
    }, [productId, products])

    // HANDLE
    // create product
    const handleOnCreateProduct = async () => {
        if (!groupId || !isEditForm) {
            handleGetFormData(undefined, true)
        } else {
            setCurrentProduct(undefined)
            setCurrentPropsProduct(undefined)
            const _typeProduct = isDraft ? EProductType.Draft : EProductType.Public
            router.push(DASHBOARD_PAGES.EDIT_PRODUCT({groupId: +groupId, type: _typeProduct}).path);
        }
    }
    // on product
    const handleOnProduct: TListItemOnClick<IProduct> = (it, _) => {
        if (currentProduct && it.id === currentProduct.id) return
        const _typeProduct = isDraft ? EProductType.Draft : EProductType.Public
        const touchedProductURL = DASHBOARD_PAGES.EDIT_PRODUCT({type: _typeProduct, groupId: it.groupId!, id: it.id}).path
        if (currentProduct) {
            handleGetFormData(undefined, false, touchedProductURL)
        } else {
            router.push(touchedProductURL);    
        }
    }
    // on delete
    const handleOnDelete: TListItemOnClick<IProduct> = async (it, _) => {
        const currentDeleteProduct = isDraft ? deleteDraftProduct : deleteProduct
        await currentDeleteProduct(it.id).then(() => {
            setProducts(prev => prev.filter(prevItem => prevItem.id !== it.id))
            if (groupId) {
                router.push(DASHBOARD_PAGES.EDIT_PRODUCT({type: typeProduct, groupId: +groupId}).path);
            }
        })
    }

    const addProductsInSidebar = (_productsAPI: IProductAPI[]) => {
        setProducts(prevProducts => {
            // Преобразуем данные продуктов API в формат, нужный вашему приложению
            const newProducts = productApiListToProductList(_productsAPI, metrics, currencies, countries);
    
            // Объединяем новые и предыдущие продукты
            const allProducts = [...newProducts, ...prevProducts];
    
            // Фильтруем продукты, оставляя только уникальные по id
            const uniqueProducts = allProducts.reduce((acc, it) => {
                if (!acc.some(p => p.id === it.id)) {
                    acc.push(it);
                }
                return acc;
            }, [] as IProduct[]);
    
            return uniqueProducts;
        });
    };    

    // сбор данных из формы
    const handleGetFormData = (data?: Promise<IPropsProductForm>, hasModal?: boolean, nextURL?: string) => {
        if (!productFormRef.current) return

        (data ? data : productFormRef.current.getUpdatedData()).then(r => {
            let propsButtonFirst: IButton = {
                variant: ButtonVariant.FILL,
                color: ButtonColor.Primary,
                size: ButtonSize.Big,
                onClick: () => handleModalConfirm(r, nextURL),
            }
            let propsButtonSecond: IButton = {
                variant: ButtonVariant.TONAL,
                color: ButtonColor.Primary,
                size: ButtonSize.Big,
                onClick: cancelAdd,
            }
            let bodyCurrentModalProps: IModalActionProps | undefined
            if (r.variation && r.variation.form) {
                const {attachments, wholesalePrices} = r.variation.form.media
                const hasPrice = wholesalePrices.length > 0
                if (!hasPrice) {
                    bodyCurrentModalProps = {
                        title: "Отсутствует цена",
                        text: ["Рекомендуем указать цены для улучшения рейтинга товара."],
                        buttonFirst: {...propsButtonSecond, title: "Улучшить"},
                        buttonSecond: {...propsButtonFirst, title: "Добавить так"},
                    }
                } 
                if (attachments.length === 0) {
                    if (!hasPrice) {
                        bodyCurrentModalProps = {
                            title: "Отсутствует цена и фотография",
                            text: [
                                "Рекомендуем добавить цены для улучшения рейтинга товара.",
                                "Загрузите фотографии, чтобы товар смог отобразиться на сайте. Иначе он будет перенесён в «Черновики».",
                            ],
                            buttonFirst: {...propsButtonFirst, title: "В черновики"},
                            buttonSecond: {...propsButtonSecond, title: "Изменить"},
                        }
                    } else {
                        bodyCurrentModalProps = {
                            title: "Отсутствует фотография",
                            text: [
                                "Загрузите фотографии, чтобы товар смог отобразиться на сайте. Иначе он будет перенесён в «Черновики».",
                            ],
                            buttonFirst: {...propsButtonFirst, title: "В черновики"},
                            buttonSecond: {...propsButtonSecond, title: "Изменить"},
                        }
                    }
                }
            }
            if (hasModal)
                setCurrentModalProps(bodyCurrentModalProps)
            if (bodyCurrentModalProps && hasModal) {
                setShowModal(true)
            } else {
                handleLoadProduct(r, nextURL)
            }
            
        }, e => {
            console.error('qwe error updatedData', e)
        })
    }

    // Обработчик, который срабатывает после клика на первую кнопку в модалке
    const handleModalConfirm = (formData: IPropsProductForm, nextURL?: string) => {
        handleLoadProduct(formData, nextURL); // Обрабатываем данные формы
        setShowModal(false); // Закрываем модалку
    };

    // load
    // TODO: Сделать разделение по компонентам. update.product.form.ts
    const handleLoadProduct = async (formData: IPropsProductForm, nextURL?: string) => {
        if (!isValidPropsProductForm(formData)) return
        try {
            // IS EDIT
            if (isEditForm && productId) {
                const serializerData = productFormToCreateOrEditProduct(formData, userId, true) as (IPropsUpdateProduct | undefined)
                if (serializerData === undefined) return

                if (isDraftByPropsCreateUpdateProduct(serializerData)) {
                    if (isDraft) {
                        await updateDraftProduct({id: productId, body: serializerData}).then(() => {
                            setProducts(prev => (
                                prev.map(it => {
                                    if (it.id !== +productId) return it
                                    return {...it, media: JSON.parse(serializerData.media)}
                                })
                            ))
                        })
                    } else {
                        const createdPropsFormData = propsUpdateToCreateProduct(serializerData, formData)
                        if (createdPropsFormData === undefined) return

                        await createDraftProduct(createdPropsFormData).then(async r => {
                            await deleteProduct(+productId).unwrap()
                            if ('data' in r && r.data) {
                                const draftGroupId = await createDraftGroup().unwrap()
                                await addProductToDraftGroup({groupId: draftGroupId, productId: r.data}).then(() => {
                                    if (products.length === 1) {
                                        router.push(DASHBOARD_PAGES.EDIT_PRODUCT({type: EProductType.Draft, groupId: draftGroupId}).path);
                                    } else {
                                        setProducts(prev => prev.filter(it => it.id !== +productId))
                                    }
                                })
                            }
                        }).finally(() => {
                            cancelAdd()
                        })
                    }
                } else {
                    if (!isDraft) {
                        await updateProduct({id: productId, body: serializerData}).then(() => {
                            setProducts(prev => (
                                prev.map(it => {
                                    if (it.id !== +productId) return it
                                    return {...it, media: JSON.parse(serializerData.media)}
                                })
                            ))
                        })
                    } else {
                        const createdPropsFormData = propsUpdateToCreateProduct(serializerData, formData)
                        if (createdPropsFormData === undefined) return

                        await createProduct(createdPropsFormData).then(async r => {
                            await deleteDraftProduct(productId).unwrap()
                            if ('data' in r && r.data) {
                                const createdGroupId = await createGroup().unwrap()
                                await addProductToGroup({groupId: createdGroupId, productId: r.data}).then(() => {
                                    if (products.length === 1) {
                                        router.push(DASHBOARD_PAGES.EDIT_PRODUCT({type: EProductType.Draft, groupId: createdGroupId}).path);
                                    } else {
                                        setProducts(prev => prev.filter(it => it.id !== +productId))
                                    }
                                })
                            }
                        })
                    }
                }
            }
            // IS CREATE
            else {
                // ПЕРЕВОД ДАННЫХ ИЗ ФОРМЫ В ДАННЫЕ ДЛЯ ОТПРАВКИ НА БЭК
                const serializerData = productFormToCreateOrEditProduct(formData, userId, false) as (IPropsCreateProduct | undefined)
                if (serializerData === undefined) return

                if (isDraftByPropsCreateUpdateProduct(serializerData)) {
                    const createdProductId = await createDraftProduct(serializerData).unwrap()
                    const _groupId = isDraft && groupId ? +groupId : await createDraftGroup().unwrap()
                    await addProductToDraftGroup({groupId: _groupId, productId: createdProductId}).then(async () => {
                        if (!isDraft) return
                        await getDraftProductById(createdProductId).then(r => {
                            if ('data' in r) addProductsInSidebar([r.data as IProductAPI])
                            router.push(DASHBOARD_PAGES.EDIT_PRODUCT({type: typeProduct, groupId: _groupId, id: createdProductId}).path);
                        })
                    }).finally(() => {
                        cancelAdd()
                        notify({text: "Товар добавлен в «Черновики»", status: ENotifyStatus.Success})
                        router.push(DASHBOARD_PAGES.PRODUCTS(true).path);
                    })
                } else {
                    const createdProductId = await createProduct(serializerData).unwrap()
                    const _groupId = !isDraft && groupId ? +groupId : await createGroup().unwrap()
                    await addProductToGroup({groupId: _groupId, productId: createdProductId}).then(async () => {
                        if (isDraft) return
                        await getProductById(createdProductId).then(r => {
                            if ('data' in r) addProductsInSidebar([r.data as IProductAPI])
                            router.push(DASHBOARD_PAGES.EDIT_PRODUCT({type: typeProduct, groupId: _groupId, id: createdProductId}).path);
                        })
                    })
                }
            }
        } finally {
            if (nextURL) {
                router.push(nextURL)
            }
        }
    }

    // MODAL
    const cancelAdd = () => {
        setShowModal(false)
    }

    const toggleBottomModal = () => {
        setShowBottomModal(prev => !prev)
    }

    // HANDLE
    const handleOnClickBottomSave = () => {
        if (productFormRef.current) {
            productFormRef.current.writeFormDataToParent();  // Вызов метода из дочернего компонента
        }
    }

    return (
        <>
            <div className={cls(cl.page, className)}> 
                {!is768 && (
                    <div className={cl.left}>
                        <ProductTypeArticleBlock items={products} 
                            onCreateProduct={handleOnCreateProduct}
                            onClickItem={handleOnProduct}
                            onDeleteItem={handleOnDelete}
                            componentProps={{ onClickDelete: handleOnDelete }}
                            activeId={currentProduct ? currentProduct.id : undefined} 
                            className={cl.typeArticleBlock} />
                    </div>
                )}
                <ProductForm ref={productFormRef} data={currentPropsProduct} loadData={handleGetFormData} isEdit={isEditForm} />
                {is768 && (
                    <div className={cl.bottom}>
                        <Button color={ButtonColor.Secondary} variant={ButtonVariant.TONAL} size={ButtonSize.Medium} 
                                title={`Варианты ${products.length}`} className={cl.button} 
                                onClick={toggleBottomModal} />
                        <Button color={ButtonColor.Primary} variant={ButtonVariant.FILL} size={ButtonSize.Medium} 
                                title={"Обновить"} className={cl.button}
                                onClick={handleOnClickBottomSave} />
                    </div>
                )}
            </div> 
            <HandleSize width={768} set={setIs768} />

            {/* MODAL */}
            <ModalAction isOpen={currentModalProps && showModal} view={EModalView.CENTER}
                        title={currentModalProps ? currentModalProps.title : ''}
                        text={currentModalProps?.text}
                        buttonSecond={currentModalProps?.buttonSecond} 
                        buttonFirst={currentModalProps?.buttonFirst} 
                        onClickOverlay={cancelAdd} />
            <Modal view={EModalView.BOTTOM}
                buttonNode
                isOpen={showBottomModal}
                onClickOverlay={toggleBottomModal}
            >
                <WrapperModalBottom
                    setIsOpen={toggleBottomModal}
                    title={`Варианты ${products.length}`}
                    middleChildren={(
                        <List items={products} activeId={currentProduct ? currentProduct.id : undefined} 
                                component={ProductTypeArticleItem} 
                                onClickItem={handleOnProduct}
                                onDeleteItem={handleOnDelete}
                                componentProps={{ onClickDelete: handleOnDelete }}
                                classNameItem={cl.bottomModalItem} />
                    )}
                    bottomChildren={(
                        <Button color={ButtonColor.Secondary} variant={ButtonVariant.TONAL} size={ButtonSize.Medium} 
                                title={"Добавить вариант"} 
                                onClick={handleOnCreateProduct} className={cl.button} />
                    )}
                />
            </Modal>
        </>
    )
}
