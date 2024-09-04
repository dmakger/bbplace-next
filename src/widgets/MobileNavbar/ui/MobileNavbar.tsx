'use client'

import { useEffect, useState } from 'react';
import cl from './_MobileNavbar.module.scss';
import { FAVOURITES_ITEM_MOBILE_MENU_DATA, LK_MOBILE_DATA, MOBILE_MENU_DATA, NOT_AUTH_MOBILE_DATA, SUPPORT_PAGE_MOBILE_DATA } from '@/shared/data/menu/mobile.menu.data';
import { usePathname, useRouter } from 'next/navigation';
import { IIconVariants } from '@/shared/model/icon.model';
import { IIcon } from '@/shared/ui/Icon/model/icon.model';
import { MobileNavbarMenu } from '@/widgets/Menu/MobileNavbar';
import { MenuItem } from '@/shared/ui/Button/data/MenuItem/MenuItem';
import { HandleSize } from '@/shared/ui/Handle/Size/HandleSize';
import { DASHBOARD_PAGES, MAIN_PAGES } from '@/config/pages-url.config';

interface IMobileNavbar {
	menuData?: IIconVariants[]
}

export const MobileNavbar = ({
	menuData
}: IMobileNavbar) => {
	//STATE
	const [showSidebarMenu, setShowSidebarMenu] = useState<boolean>(false)
	const [is420, setIs420] = useState<boolean>(false)
	const [filteredMenuData, setFilteredMenuData] = useState<IIconVariants[]>(MOBILE_MENU_DATA);

	//ROUTER
	const pathname = usePathname();
	const router = useRouter();

	//EFFECT
	useEffect(() => {
		//FAVOURITE_PAGE
		if (pathname === FAVOURITES_ITEM_MOBILE_MENU_DATA?.link && is420) setFilteredMenuData(filteredMenuData.filter(it => it.link !== FAVOURITES_ITEM_MOBILE_MENU_DATA.link));
		
		//SUPPORT_PAGE
		if (pathname.includes(MAIN_PAGES.SUPPORT.path)) setFilteredMenuData(SUPPORT_PAGE_MOBILE_DATA);
		
		//LK_PAGES
		if (pathname.includes(DASHBOARD_PAGES.HOME.path)) setFilteredMenuData(LK_MOBILE_DATA);

		//AUTH_PAGES
		if (pathname.includes(MAIN_PAGES.REGISTRATION.path || MAIN_PAGES.LOGIN.path || MAIN_PAGES.CHECK_EMAIL.path || MAIN_PAGES.FORGOT_PASSWORD.path)) setFilteredMenuData(NOT_AUTH_MOBILE_DATA);

		
	}, [pathname, filteredMenuData, is420])


	useEffect(() => {
		if(menuData) setFilteredMenuData(menuData)
	}, [menuData, filteredMenuData])


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
			<MobileNavbarMenu showSidebarMenu={showSidebarMenu} setShowSidebarMenu={setShowSidebarMenu} is420={is420} />
			<HandleSize width={420} set={setIs420} />
		</>

	)
}
