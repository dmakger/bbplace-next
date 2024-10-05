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
import { useAppSelector } from '@/storage/hooks';
import { ECurrentLK } from '@/entities/User/model/user.model';
import { isAuth } from '@/entities/Auth/lib/auth-token.lib';
import { ONLY_FOR_SUPPLIERS_PAGES_ARRAY } from '@/widgets/Pages/OnlyForSellers/data/onlyForSuppliers.data';

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
	const [isClientReady, setIsClientReady] = useState<boolean>(false)
	const [showSidebarMenu, setShowSidebarMenu] = useState<boolean>(false)
	const [is420, setIs420] = useState<boolean>(false)
	const [filteredMenuData, setFilteredMenuData] = useState<IIconVariants[]>(MOBILE_MENU_DATA);
	const [urlHomePage, setUrlHomePage] = useState<string>(DASHBOARD_PAGES.HOME.path)

	//ROUTER
	const pathname = usePathname();
	const router = useRouter();

	//EFFECT
	useEffect(() => {
		try {
			setIsAuthenticated(isAuth())
			// if (getCurrentLKToken() === ECurrentLK.SELLER) {
			// 	setUrlHomePage(DASHBOARD_PAGES._HOME__SELLER.path)
			// }
		} finally {
			setIsClientReady(true)
		}
	}, [])

	useEffect(() => {
		const updatedMenuData = getUpdatedMenuData().map(it => ({ ...it, link: getLink(it) }))
		setFilteredMenuData(updatedMenuData)
	}, [isAuthenticated, isClientReady, pathname, is420])

	useEffect(() => {
		if (menuData) setFilteredMenuData(menuData)
	}, [menuData, filteredMenuData])


	//FUNCTIONS
	const getUpdatedMenuData = () => {
		// MAIN_PAGE
		if (pathname === MAIN_PAGES.HOME.path)
			return MOBILE_MENU_DATA

		// FAVOURITE_PAGE
		if (pathname === FAVOURITES_ITEM_MOBILE_MENU_DATA?.link && is420)
			return filteredMenuData.filter(it => it.link !== FAVOURITES_ITEM_MOBILE_MENU_DATA.link)

		// SUPPORT_PAGE
		if (pathname.includes(MAIN_PAGES.SUPPORT.path))
			return SUPPORT_PAGE_MOBILE_DATA;

		// LK_PAGES
		if (pathname.includes(DASHBOARD_PAGES.HOME.path)) {
			if (is420) {
				return LK_MOBILE_DATA.filter(it => it.link !== FAVOURITES_ITEM_MOBILE_MENU_DATA.link)
			}
			return LK_MOBILE_DATA;
		}

		// AUTH_PAGES
		if (NOT_AUTH_PAGES_ARRAY.find(it => it === pathname))
			return NOT_AUTH_MOBILE_DATA;

		return []
	}

	const getLink = (el: IIconVariants) => {
		if (el.title === LK_ITEM_MOBILE_MENU_DATA.title) {
			// Ссылку на личный кабинет проверяем только когда клиент готов
			return isClientReady && isAuthenticated ? urlHomePage : MAIN_PAGES.CHECK_EMAIL.path;
		}
		return el.link;
	}

	const goBackByCurrentLK = () => {
		if (ONLY_FOR_SUPPLIERS_PAGES_ARRAY.find(it => it === prevPath) && currentLK === ECurrentLK.BUYER) {
			return router.back();
		}
		if (prevPath) return router.replace(prevPath);
		router.replace(urlHomePage)
	}

	const goBack = () => {
		goBackByCurrentLK()
		router.back();
	}

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