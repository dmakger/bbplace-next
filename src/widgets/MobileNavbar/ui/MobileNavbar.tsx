'use client'

import { useEffect, useState } from 'react';
import cl from './_MobileNavbar.module.scss';
import { FAVOURITES_ITEM_MOBILE_MENU_DATA, LK_ITEM_MOBILE_MENU_DATA, LK_MOBILE_DATA, MOBILE_MENU_DATA, NOT_AUTH_MOBILE_DATA, NOT_AUTH_PAGES_ARRAY, SUPPORT_PAGE_MOBILE_DATA } from '@/shared/data/menu/mobile.menu.data';
import { usePathname, useRouter } from 'next/navigation';
import { IIconVariants } from '@/shared/model/icon.model';
import { IIcon } from '@/shared/ui/Icon/model/icon.model';
import { MobileNavbarMenu } from '@/widgets/Menu/MobileNavbar';
import { MenuItem } from '@/shared/ui/Button/data/MenuItem/MenuItem';
import { HandleSize } from '@/shared/ui/Handle/Size/HandleSize';
import { DASHBOARD_PAGES, MAIN_PAGES } from '@/config/pages-url.config';
import { ONLY_FOR_SELLERS_PAGES_ARRAY } from '@/widgets/Pages/OnlyForSellers/data/onlyForSellers.data';
import { useAppSelector } from '@/storage/hooks';
import { ECurrentLK } from '@/entities/User/model/user.model';
import { isAuth } from '@/entities/Auth/lib/auth-token.lib';

interface IMobileNavbar {
	menuData?: IIconVariants[]
}

export const MobileNavbar = ({
	menuData
}: IMobileNavbar) => {
	//RTK
	const { currentLK, prevPath } = useAppSelector(state => state.user)

	//STATE
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
	const [showSidebarMenu, setShowSidebarMenu] = useState<boolean>(false)
	const [filteredMenuData, setFilteredMenuData] = useState<IIconVariants[]>(MOBILE_MENU_DATA);

	const [is420, setIs420] = useState<boolean>(false)

	//ROUTER
	const pathname = usePathname();
	const router = useRouter();

	useEffect(() => {
		setIsAuthenticated(isAuth())
	}, [])

	//EFFECT
	useEffect(() => {
		//MAIN_PAGE
		if (pathname === MAIN_PAGES.HOME.path) setFilteredMenuData(MOBILE_MENU_DATA)

		//FAVOURITE_PAGE
		if (pathname === FAVOURITES_ITEM_MOBILE_MENU_DATA?.link && is420) setFilteredMenuData(filteredMenuData.filter(it => it.link !== FAVOURITES_ITEM_MOBILE_MENU_DATA.link));

		//SUPPORT_PAGE
		if (pathname.includes(MAIN_PAGES.SUPPORT.path)) setFilteredMenuData(SUPPORT_PAGE_MOBILE_DATA);

		//LK_PAGES
		if (pathname.includes(DASHBOARD_PAGES.HOME.path)) setFilteredMenuData(LK_MOBILE_DATA);

		//AUTH_PAGES
		if (NOT_AUTH_PAGES_ARRAY.find(it => it === pathname)) setFilteredMenuData(NOT_AUTH_MOBILE_DATA);

	}, [pathname, filteredMenuData, is420])


	useEffect(() => {
		if (menuData) setFilteredMenuData(menuData)
	}, [menuData, filteredMenuData])


	//FUNCTIONS
	const goBackByCurrentLK = () => {
		if (ONLY_FOR_SELLERS_PAGES_ARRAY.find(it => it === prevPath) && currentLK === ECurrentLK.BUYER) {
			return router.back();
		}
		if (prevPath) return router.replace(prevPath);
		router.replace(DASHBOARD_PAGES.HOME.path)
	}

	const goBack = () => {
		goBackByCurrentLK()
		router.back();
	}

	const getLink = (el: IIconVariants) => {
		// Проверка аутентификации только на клиенте
		if (typeof window === 'undefined') {
			if (el.title === LK_ITEM_MOBILE_MENU_DATA.title) {
				return isAuthenticated ? DASHBOARD_PAGES.HOME.path : MAIN_PAGES.CHECK_EMAIL.path;
			}
		}
		return el.link;
	}
	

	return (
		<>
			<nav className={cl.MobileNavbar}>
				<div className={cl.navBarParent}>
					{filteredMenuData?.map(el => {
						const isThisPage = pathname === el.link;
						return (
							<MenuItem
								href={getLink(el)}
								key={el.id}
								active={isThisPage}
								disabled={isThisPage}
								className={cl.mobileNavbarButton}
								title={el.title}
								beforeImage={el.image as IIcon}
								onClick={el.title === 'Меню' ? () => setShowSidebarMenu(true)
									: el.title === 'Назад' ? goBack
										: () => { }} />
						)
					})}
				</div>
			</nav>
			<MobileNavbarMenu showSidebarMenu={showSidebarMenu} setShowSidebarMenu={setShowSidebarMenu} is420={is420} />
			<HandleSize width={420} set={setIs420} />
		</>

	)
}
