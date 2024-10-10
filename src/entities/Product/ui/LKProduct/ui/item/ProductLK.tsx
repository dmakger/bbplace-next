'use client'

import { cls } from '@/shared/lib/classes.lib'
import cl from './_ProductLK.module.scss'
import { ImageAPI } from '@/shared/ui/Image/API/ImageAPI'
import { GEAR_ICON } from '@/shared/ui/Icon/data/gear.data.icon'
import { Button, ButtonVariant } from '@/shared/ui/Button'
import { EProductLKVariants } from '../../model/productLK.model'
import { MAIN_PAGES } from '@/config/pages-url.config'

import { IProduct } from '@/entities/Product/model/product.model'
import { useEffect, useState } from 'react'
import { ButtonArrowWOLine } from '@/shared/ui/Button/data/Arrow/WOLine/ButtonArrowWOLine'
import { Axis } from '@/shared/model/button.model'
import { BottomInfoModal } from '@/features/Modal/BottomInfo'
import { EBottomInfoVariant } from '@/features/Modal/BottomInfo/model/bottomInfoModal.model'
import Input from '@/shared/ui/Input/Input'
import { IGroupProducts } from '@/entities/Product/model/group.product.model'
import { ProductsTypeLK } from '@/shared/ui/SwitchSelector/data/switchSelector.data'
import { getIdFromVariant } from '@/entities/Product/lib/product.lib'
import { ImageAPIVariants } from '@/shared/data/image.data'

interface IProductLK {
	product: IGroupProducts | IProduct,
	type: ProductsTypeLK,
	className?: string,
	variant?: EProductLKVariants,
	choosenProduct?: IGroupProducts,
	setChoosenProduct?: Function,
	setIsOpenSettings?: Function,
	isOpenGroup?: boolean,
	setIsOpenGroup?: Function,
	checkedProductsId?: number[],
	setCheckedProductsId?: Function,
	setIsOpenDelModal?: Function
}

export const ProductLK = ({
	className,
	variant = EProductLKVariants.DEFAULT,
	product,
	type,
	choosenProduct,
	setChoosenProduct,
	setIsOpenSettings,
	isOpenGroup,
	setIsOpenGroup,
	checkedProductsId,
	setCheckedProductsId,
	setIsOpenDelModal
}: IProductLK) => {
	//STATE
	const [isChecked, setIsChecked] = useState<boolean>(false)

	//VARIABLE
	const productId = getIdFromVariant(product as IGroupProducts, variant);

	//EFFECT
	useEffect(() => {
		if (checkedProductsId) setIsChecked(checkedProductsId.includes(productId))
	}, [checkedProductsId]);

	useEffect(() => {
		if(checkedProductsId && setCheckedProductsId){
			if (isChecked && !checkedProductsId.includes(productId)) {
				setCheckedProductsId((prevIds: number[]) => [...prevIds, productId]);
			} 
			else if (!isChecked && checkedProductsId.includes(productId)) {
				setCheckedProductsId((prevIds: number[]) => prevIds.filter(it => it !== productId));
			}
		}
	}, [isChecked]);

	//FUNCTION
	const showSettingsModal = (product: IProduct) => {
		if (setChoosenProduct)
		setChoosenProduct(product)
		if (setIsOpenSettings)
		setIsOpenSettings(true)
	}

	const showGroupModal = (product: IProduct) => {
		if (setChoosenProduct)
		setChoosenProduct(product)
		if (setIsOpenGroup)
		setIsOpenGroup(true)
	}

	// VARIABLES
	const mediaProduct = (product as IGroupProducts).main?.media ?? (product as IProduct)?.media;
	const isDraft = !mediaProduct?.attachments?.length;

	if (!product) return null;

	return (
		<div className={cls(cl.LKProduct, className)}>
			{variant === EProductLKVariants.DEFAULT && (product as IGroupProducts).main.category && (
				<span className={cl.category}>
					{(product as IGroupProducts).main.category?.name}
				</span>
			)}
			<Input.Checkbox isChecked={isChecked} setIsChecked={setIsChecked} className={cl.checkbox} />
			<div className={cl.imageContainer}>
				{mediaProduct.attachments.length > 0 && (
					<ImageAPI src={mediaProduct.attachments[0]} variantDefault={ImageAPIVariants.Product} />
				)}

				<div className={cl.settings}>
					{variant === EProductLKVariants.DEFAULT ? (
						<Button variant={ButtonVariant.DEFAULT}
							beforeImage={GEAR_ICON} beforeProps={{ width: 20, height: 20 }}
							onClick={() => showSettingsModal((product as IProduct) ?? (product as IGroupProducts).main)}
							className={cl.iconWrapper} />
					) : (
						<BottomInfoModal
							type={type}
							setIsOpenDelModal={setIsOpenDelModal}
							variant={EBottomInfoVariant.SETTINGS}
							classNameButtonContainer={cl.groupSettings}
							product={(product as IProduct) ?? (product as IGroupProducts).main}
							setIsOpen={setIsOpenGroup ? setIsOpenGroup : () => { }}
							isTitle={false} />
					)}
				</div>

			</div>
			<div className={cl.infoContainer}>
				<Button variant={ButtonVariant.DEFAULT}
					className={cl.productName}
					title={(product as IProduct).name ?? (product as IGroupProducts).main.name ?? ''}
					href={!isDraft ? MAIN_PAGES.CURRENT_PRODUCT('main' in product ? product.main.id : product.id).path : ''} />
				<div className={cl.bottomContainer}>
					<div className={cl.productRestInfo}>
						<p className={cl.productColor}>
							{(product as IGroupProducts).main?.media.color ?? (product as IProduct).media.color}
						</p>
						<span className={cl.productArticle}>
							{(product as IGroupProducts).main?.media.article ?? (product as IProduct).media.article}
						</span>
					</div>
					{variant === EProductLKVariants.DEFAULT && (product as IGroupProducts).rest?.length > 1 && (
						<div className={cl.groupNavigate}>
							<p className={cl.groupLength}>
								+{(product as IGroupProducts).rest.length}
							</p>
							<ButtonArrowWOLine
								axis={choosenProduct && choosenProduct.id === product.id && isOpenGroup ? Axis.Top : Axis.Default}
								onClick={() => showGroupModal(product as IProduct ?? (product as IGroupProducts).main)} />
						</div>
					)}
				</div>
			</div>
		</div>
	)
}