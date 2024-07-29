'use client'

import React, { useState } from 'react';
import cl from './_MobileNavbar.module.scss'
import { MOBILE_MENU_DATA } from '@/shared/data/menu/mobile.menu.data';
import { cls } from '@/shared/lib/classes.lib';
import { usePathname, useRouter } from 'next/navigation';
import { IIconVariants } from '@/shared/model/icon.model';
import { IIcon } from '@/shared/ui/Icon/model/icon.model';
import { Modal } from '@/shared/ui/Modal/Modal';
import { EModalView } from '@/shared/data/modal.data';
import { MobileNavbarMenu } from '@/widgets/Menu/MobileNavbar';
import { MenuItem } from '@/shared/ui/Button/data/MenuItem/MenuItem';

interface IMobileNavbar {
	menuData?: IIconVariants[]
}


export const MobileNavbar = ({
	menuData = MOBILE_MENU_DATA
}: IMobileNavbar) => {

	//STATE
	const [showSidebarMenu, setShowSidebarMenu] = useState<boolean>(false)

	//ROUTER
	const pathname = usePathname();
	const router = useRouter();

	//FUNCTIONS
	const goBack = () => router.back();


	return (
		<>
			<nav className={cl.MobileNavbar}>
				<div className={cl.navBarParent}>
					{menuData?.map(el => (
						<MenuItem
							href={el.link ?? ''}
							key={el.id}
							active={pathname === el.link}
							className={cls(cl.mobileNavbarButton, pathname === el.link ?? '' ? cl.active : '')}
							title={el.title}
							beforeImage={el.image as IIcon}
							onClick={el.title === 'Меню' ? () => setShowSidebarMenu(true) : el.title === 'Назад' ? goBack : () => { }} />
					))}
				</div>
			</nav>
			<Modal view={EModalView.RIGHT} _isOpen={showSidebarMenu} buttonNode onClickOverlay={() => setShowSidebarMenu(false)}
				classNameSidebar={cl.modalSidebar} >
				<MobileNavbarMenu setShowSidebarMenu={setShowSidebarMenu} />
			</Modal></>

	)
}
