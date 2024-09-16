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
import { isValidPropsProductForm, productToPropsProductForm } from "@/features/Form/Product/lib/product.form.lib"
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
import { IButton } from "@/shared/ui/Button/ui/Button"

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
    
    // REF
    const productFormRef = useRef<{getUpdatedData: () => Promise<IPropsProductForm>} | null>(null)

    // STATE
    // const [isEdit, setIsEdit] = useState(!!productId)
    const [products, setProducts] = useState<IProduct[]>([])
    const [currentProduct, setCurrentProduct] = useState<IProduct | undefined>()
    const [currentPropsProduct, setCurrentPropsProduct] = useState<IPropsProductForm | undefined>()
    const [showModal, setShowModal] = useState<boolean>(false)
    const [currentModalProps, setCurrentModalProps] = useState<IModalActionProps | undefined>()

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


    // EFFECT
    const typeProduct = useMemo(() => isDraft ? EProductType.Draft : EProductType.Public, [isDraft])
    const isEditForm = useMemo(() => !!productId, [productId])

    useEffect(() => {
        if ((!currencies || !metrics || !countries) || !(productsAPI || draftsAPI)) return
        const productsAPILoaded = (isDraft ? draftsAPI : productsAPI) as IProductAPI[]
        addProducts(productsAPILoaded)
    }, [productsAPI, draftsAPI, currencies, metrics, countries])

    const addProducts = (_productsAPI: IProductAPI[]) => {
        setProducts(prevProducts => {
            const newProducts = productApiListToProductList(_productsAPI, metrics, currencies, countries);
            return JSON.stringify(prevProducts) !== JSON.stringify(newProducts) ? [...newProducts, ...prevProducts] : prevProducts
        })
    }

    useEffect(() => {
        if (!productId || products.length === 0) return

        const _currentProduct = products.find(it => it.id === +productId)
        if (_currentProduct) {
            setCurrentProduct(_currentProduct)
            setCurrentPropsProduct(productToPropsProductForm(_currentProduct))
        }
    }, [productId, products])

    // HANDLE
    // сбор данных из формы
    const handleGetFormData = (data?: Promise<IPropsProductForm>) => {
        if (!productFormRef.current) return

        (data ? data : productFormRef.current.getUpdatedData()).then(r => {
            let propsButtonFirst: IButton = {
                variant: ButtonVariant.FILL,
                color: ButtonColor.Primary,
                size: ButtonSize.Big,
                onClick: () => handleLoadProduct(r),
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
                        buttonFirst: {...propsButtonFirst, title: "Улучшить"},
                        buttonSecond: {...propsButtonSecond, title: "Добавить так"},
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
            setCurrentModalProps(bodyCurrentModalProps)
            if (bodyCurrentModalProps) {
                setShowModal(true)
            } else {
                handleLoadProduct(r)
            }
            
        }, e => {
            console.log('qwe error updatedData', e)
        })
    }

    // create product
    const handleOnCreateProduct = async () => {
        if (!groupId || !isEditForm) return
        setCurrentProduct(undefined)
        setCurrentPropsProduct(undefined)
        // await handleGetFormData()
        router.push(DASHBOARD_PAGES.EDIT_PRODUCT({groupId: +groupId}).path);
    }
    // on product
    const handleOnProduct: TListItemOnClick<IProduct> = (it, _) => {
        if (currentProduct && it.id === currentProduct.id) return
        if (currentProduct) handleGetFormData()
        router.push(DASHBOARD_PAGES.EDIT_PRODUCT({groupId: it.groupId!, id: it.id}).path);
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

    // load
    // TODO: Сделать разделение по компонентам. update.product.form.ts
    const handleLoadProduct = async (formData: IPropsProductForm) => {
        if (!isValidPropsProductForm(formData)) return
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
                        if ('data' in r) addProducts([r.data as IProductAPI])
                        router.push(DASHBOARD_PAGES.EDIT_PRODUCT({type: typeProduct, groupId: _groupId, id: createdProductId}).path);
                    })
                }).finally(() => {
                    cancelAdd()
                })
            } else {
                const createdProductId = await createProduct(serializerData).unwrap()
                const _groupId = !isDraft && groupId ? +groupId : await createGroup().unwrap()
                await addProductToGroup({groupId: _groupId, productId: createdProductId}).then(async () => {
                    if (isDraft) return
                    await getProductById(createdProductId).then(r => {
                        if ('data' in r) addProducts([r.data as IProductAPI])
                        router.push(DASHBOARD_PAGES.EDIT_PRODUCT({type: typeProduct, groupId: _groupId, id: createdProductId}).path);
                    })
                })
            }
        }        
    }

    // MODAL
    const cancelAdd = () => {
        setShowModal(false)
    }


    return (
        <div className={cls(cl.page, className)}> 
            <div className={cl.left}>
                <ProductTypeArticleBlock items={products} 
                    onCreateProduct={handleOnCreateProduct}
                    onClickItem={handleOnProduct}
                    onDeleteItem={handleOnDelete}
                    componentProps={{ onClickDelete: handleOnDelete }}
                    activeId={currentProduct ? currentProduct.id : undefined} 
                    className={cl.typeArticleBlock} />
            </div>
            <ProductForm ref={productFormRef} data={currentPropsProduct} loadData={handleGetFormData} isEdit={isEditForm} />
            <ModalAction 
                isOpen={currentModalProps && showModal} view={EModalView.CENTER}
                title={currentModalProps ? currentModalProps.title : ''}
                text={currentModalProps?.text}
                buttonSecond={currentModalProps?.buttonSecond} 
                buttonFirst={currentModalProps?.buttonFirst} 
                onClickOverlay={cancelAdd}
                />
        </div> 
    )
}
