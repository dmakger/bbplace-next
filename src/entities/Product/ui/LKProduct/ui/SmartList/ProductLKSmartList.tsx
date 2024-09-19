'use client'

import { FC, useCallback, useEffect, useState } from "react";

import { cls } from '@/shared/lib/classes.lib';
import cl from './_ProductLKSmartList.module.scss';
import { IProduct } from "@/entities/Product/model/product.model";
import { ProductAPI } from "@/entities/Product/api/product.api";
import { productApiToProduct } from "@/entities/Product/lib/product.lib";
import SuspenseL from "@/shared/ui/Wrapper/SuspenseL/SuspenseL";
import { LKSubheader } from "@/features/LKSubheader";
import { ProductLKList } from "../list/ProductLKList";
import { Modal } from "@/shared/ui/Modal/ui/Modal/Modal";
import { BottomInfoModal } from "@/features/Modal/BottomInfo";
import { EBottomInfoVariant } from "@/features/Modal/BottomInfo/model/bottomInfoModal.model";
import { EModalView } from "@/shared/data/modal.data";
import { WrapperModalBottom } from "@/shared/ui/Wrapper/ModalBottom";
import { EProductLKVariants } from "../../model/productLK.model";
import { skipToken } from "@reduxjs/toolkit/query";
import { WrapperDefaultProductNotFound } from "@/shared/ui/Wrapper/Default/ui/Product/NotFound/WrapperDefaultProductNotFound";
import { createGroupProducts } from "@/entities/Product/lib/group.product.lib";
import { IGroupProducts } from "@/entities/Product/model/group.product.model";
import { ICategory } from "@/entities/Metrics/model/category.metrics.model";
import { CategoryAPI } from "@/entities/Metrics/api/category.metrics.api";
import { ProductsTypeLK } from "@/shared/ui/SwitchSelector/data/switchSelector.data";
import { ModalAction } from "@/shared/ui/Modal/ui/Action/ModalAction";
import { ButtonVariant } from "@/shared/ui/Button";
import { ButtonColor, ButtonSize } from "@/shared/ui/Button/model/button.model";

interface ProductLKSmartListProps {
    products: IProduct[],
    type: ProductsTypeLK
    className?: string,
}

export const ProductLKSmartList: FC<ProductLKSmartListProps> = ({ type, products: _products, className }) => {

    //STATE
    const [isOpenSettings, setIsOpenSettings] = useState<boolean>(false);
    const [isOpenGroup, setIsOpenGroup] = useState<boolean>(false);
    const [isOpenDelModal, setIsOpenDelModal] = useState<boolean>(false);

    const [choosenProduct, setChoosenProduct] = useState<IGroupProducts>()
    const [groupProducts, setGroupProducts] = useState<IProduct[]>([])
    const [products, setProducts] = useState<IProduct[]>([]);
    const [checkedProductsId, setCheckedProductsId] = useState<number[]>([])
    const [groupsProducts, setGroupsProducts] = useState<IGroupProducts[]>([]);
    const [categoryList, setCategoryList] = useState<ICategory[]>([])

    //API
    const [deleteProduct] = ProductAPI.useDeleteProductMutation()
    const [deleteDraft] = ProductAPI.useDeleteDraftMutation()
    const [getCategory] = CategoryAPI.useGetCategoryMutation();
    const { data: productsAPI, isLoading: isProductLoading } = ProductAPI.useGetProductsQuery(
        _products === undefined ? { limit: 24, page: 11 } : skipToken,
        { refetchOnMountOrArgChange: true }
    );

    //EFFECT
    useEffect(() => {
        if (productsAPI && categoryList && _products === undefined) {
            setProducts(() => {
                return productsAPI.map((it, index) => (
                    { ...productApiToProduct({ productAPI: it }), category: categoryList[index] }
                ))
            })
        }
    }, [productsAPI, categoryList])

    useEffect(() => {
        if (_products !== undefined)
            setProducts(_products)
    }, [_products])

    // SET CATEGORIES
    useEffect(() => {
        if (!productsAPI || _products !== undefined) return;

        const fetchCategories = async () => {
            try {
                await Promise.all(
                    productsAPI.map(async (it) => {
                        const categoryResponse = await getCategory(it.categoryId).unwrap();
                        return categoryResponse[0]; // Assuming the response is an array and we need the first element
                    })
                ).then(categories => {
                    setCategoryList(categories)
                })
            } catch (error) {
                console.error("Failed to fetch categories", error);
            }
        };

        fetchCategories();
    }, [_products, productsAPI, getCategory]);

    useEffect(() => {
        if (!products) return;
        setGroupsProducts(createGroupProducts(products))
    }, [products])

    useEffect(() => {
        if (choosenProduct) {
            const filteredGroupProducts = groupsProducts.filter(it => it.main.id === choosenProduct.main.id);
            setGroupProducts(filteredGroupProducts.map(it => it.rest).flat())
        }
    }, [choosenProduct, groupsProducts])


    //FUNCTIONS
    const closeTheModal = useCallback(() => {
        if (isOpenSettings) setIsOpenSettings(false)
        if (isOpenGroup) setIsOpenGroup(false)
        setChoosenProduct(undefined)
    }, [isOpenSettings, isOpenGroup]);

    const deleteSelectedProduct = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        e.stopPropagation()

        try {
            const deleteProductFunc = type === ProductsTypeLK.Active ? deleteProduct : deleteDraft

            if (!checkedProductsId.length && choosenProduct) {
                const choosenProductId = choosenProduct?.main.id;
                deleteProductFunc(choosenProductId);
                setProducts((prevProducts: IProduct[]) => prevProducts.filter(product => product.id !== choosenProductId))
            }

            checkedProductsId.map(async it => {
                const deleteProductFunc = type === ProductsTypeLK.Active ? deleteProduct : deleteDraft
                await deleteProductFunc(it).catch(() => {
                    console.log(e);
                })
                setProducts((prevProducts: IProduct[]) => prevProducts.filter(product => product.id !== it))
            })

        } finally {
            setCheckedProductsId([])
            setIsOpenDelModal(false)
            isOpenSettings && setIsOpenSettings(false)
        }
    }

    const cancelDeleting = () => {
        setIsOpenDelModal(false)
        isOpenSettings && setIsOpenSettings(false)
        setCheckedProductsId([])
    }


    return (
        <div className={cl.ProductLKSmartList}>
            <SuspenseL>
                <LKSubheader
                    checkedItemsNumber={checkedProductsId.length}
                    className={cls(cl.subHeader, checkedProductsId.length ? cl.showSubheader : '')}
                    setCheckedProductsId={setCheckedProductsId}
                    setIsOpenDelModal={setIsOpenDelModal} />

                <WrapperDefaultProductNotFound showDefault={products.length === 0}>
                    <ProductLKList products={groupsProducts}
                        type={type}
                        setIsOpenSettings={setIsOpenSettings}
                        isOpenGroup={isOpenGroup}
                        setIsOpenGroup={setIsOpenGroup}
                        choosenProduct={choosenProduct}
                        setChoosenProduct={setChoosenProduct}
                        checkedProductsId={checkedProductsId}
                        setCheckedProductsId={setCheckedProductsId} />
                </WrapperDefaultProductNotFound>

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
                        topChildren={isOpenGroup && checkedProductsId.length > 0 && (
                            <LKSubheader
                                checkedItemsNumber={checkedProductsId.length}
                                className={cls(cl.subHeaderModal, checkedProductsId.length ? cl.showSubheader : '')}
                                setCheckedProductsId={setCheckedProductsId}
                                setIsOpenDelModal={setIsOpenDelModal} />
                        )}
                        bottomChildren={isOpenSettings ? (products.length > 0 && (
                            <BottomInfoModal
                                variant={EBottomInfoVariant.SETTINGS}
                                product={choosenProduct?.main}
                                type={type}
                                setIsOpen={setIsOpenSettings}
                                setProducts={setProducts}
                                setIsOpenDelModal={setIsOpenDelModal}
                            />
                        )) : (isOpenGroup && groupProducts.length > 0 && (
                            <ProductLKList
                                type={type}
                                products={groupProducts}
                                setProducts={setGroupProducts}
                                variant={EProductLKVariants.GROUP_ITEM}
                                checkedProductsId={checkedProductsId}
                                setCheckedProductsId={setCheckedProductsId}
                                setIsOpenDelModal={setIsOpenDelModal}
                            />
                        ))}
                        isBorderTopOnBottomChild={isOpenGroup && groupProducts.length > 2}
                    />
                </Modal>
                <ModalAction
                    isOpen={isOpenDelModal} view={EModalView.CENTER}
                    title={checkedProductsId.length === 1 ? "Удаление товара" : "Удаление товаров"}
                    text={[
                        checkedProductsId.length === 0 && choosenProduct
                            ? `«${choosenProduct.main.name}» будет удалён без возможности восстановления.`
                            : `Выбранные ${checkedProductsId.length} товара(-ов) будут удалены без возможности восстановления.`
                    ]}
                    buttonSecond={{
                        variant: ButtonVariant.BORDER,
                        color: ButtonColor.Tertiary,
                        size: ButtonSize.Big,
                        title: 'Отмена',
                        onClick: cancelDeleting
                    }}
                    buttonFirst={{
                        variant: ButtonVariant.TONAL,
                        color: ButtonColor.Negative,
                        size: ButtonSize.Big,
                        title: 'Удалить',
                        onClick: deleteSelectedProduct
                    }}
                    onClickOverlay={cancelDeleting}
                />
            </SuspenseL>
        </div>
    )
}