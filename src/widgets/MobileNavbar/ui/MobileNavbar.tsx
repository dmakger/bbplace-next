'use client'

import React, { useEffect, useState } from 'react';
import cl from './_MobileNavbar.module.scss'
import { FAVOURITES_ITEM_MOBILE_MENU_DATA, MOBILE_MENU_DATA, SUPPORT_PAGE_MOBILE_DATA } from '@/shared/data/menu/mobile.menu.data';
import { usePathname, useRouter } from 'next/navigation';
import { IIconVariants } from '@/shared/model/icon.model';
import { IIcon } from '@/shared/ui/Icon/model/icon.model';
import { Modal } from '@/shared/ui/Modal/Modal';
import { EModalView } from '@/shared/data/modal.data';
import { MobileNavbarMenu } from '@/widgets/Menu/MobileNavbar';
import { MenuItem } from '@/shared/ui/Button/data/MenuItem/MenuItem';
import { HandleSize } from '@/shared/ui/Handle/Size/HandleSize';

interface IMobileNavbar {
	menuData?: IIconVariants[]
}


export const MobileNavbar = ({
	menuData = MOBILE_MENU_DATA
}: IMobileNavbar) => {
	//STATE
	const [showSidebarMenu, setShowSidebarMenu] = useState<boolean>(false)
	const [is420, setIs420] = useState<boolean>(false)
	const [filteredMenuData, setFilteredMenuData] = useState<IIconVariants[]>(menuData);

	//ROUTER
	const pathname = usePathname();
	const router = useRouter();

	//EFFECT
	useEffect(() => {
		if (pathname === FAVOURITES_ITEM_MOBILE_MENU_DATA?.link && is420) {
			setFilteredMenuData(menuData.filter(it => it.link !== FAVOURITES_ITEM_MOBILE_MENU_DATA.link))
		}
		if(pathname.includes('support')){			
			setFilteredMenuData(SUPPORT_PAGE_MOBILE_DATA)
		}
	}, [pathname, menuData, is420])


	//FUNCTIONS
	const goBack = () => router.back();

	return (
		<>
			<nav className={cl.MobileNavbar}>
				<div className={cl.navBarParent}>
					{filteredMenuData?.map(el => {
						const isThisPage = pathname === el.link;
						return (
							<MenuItem
								href={el.link ?? ''}
								key={el.id}
								active={isThisPage}
								disabled={isThisPage}
								className={cl.mobileNavbarButton}
								title={el.title}
								beforeImage={el.image as IIcon}
								onClick={el.title === 'Меню' ? () => setShowSidebarMenu(true) : el.title === 'Назад' ? goBack : () => { }} />
						)
					})}
				</div>
			</nav>
			<Modal view={EModalView.RIGHT} _isOpen={showSidebarMenu} buttonNode onClickOverlay={() => setShowSidebarMenu(false)}
				classNameSidebar={cl.modalSidebar} >
				<MobileNavbarMenu setShowSidebarMenu={setShowSidebarMenu} />
			</Modal>
			<HandleSize width={420} set={setIs420} />
		</>

	)
}
