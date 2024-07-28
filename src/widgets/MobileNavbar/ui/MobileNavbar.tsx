'use client'

import React, { useState } from 'react';
import cl from './_MobileNavbar.module.scss'
import { Button, ButtonVariant } from '@/shared/ui/Button';
import { MOBILE_MENU_DATA } from '@/shared/data/menu/mobile.menu.data';
import { cls } from '@/shared/lib/classes.lib';
import { usePathname, useRouter } from 'next/navigation';
import { IIconVariants } from '@/shared/model/icon.model';
import { IIcon } from '@/shared/ui/Icon/model/icon.model';
import { Modal } from '@/shared/ui/Modal/Modal';
import { EModalView } from '@/shared/data/modal.data';
import { MobileNavbarMenu } from '@/widgets/Menu/MobileNavbar';

interface IMobileNavbar {
	menuData?: IIconVariants[]
}


export const MobileNavbar = ({
	menuData = MOBILE_MENU_DATA
}: IMobileNavbar) => {

	//STATE
	const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false)

	//ROUTER
	const pathname = usePathname();
	const router = useRouter();

	//FUNCTIONS
	const goBack = () => router.back();

	const showSideMenu = () => setShowMobileMenu(prevState => !prevState)

	return (
		<nav className={cl.MobileNavbar}>
			<div className={cl.navBarParent}>
				{menuData?.map(el => (
					<Button
						variant={ButtonVariant.CLEAR}
						href={el.link ?? ''}
						key={el.id}
						active={pathname === el.link}
						className={cls(cl.mobileNavbarButton, pathname === el.link ?? '' ? cl.active : '')}
						title={el.title}
						beforeImage={el.image as IIcon}
						beforeProps={{ width: 18, height: 18 }}
						onClick={el.title === 'Меню' ? showSideMenu : el.title === 'Назад' ? goBack : () => { }} />
				))}
			</div>
			<Modal view={EModalView.RIGHT} _isOpen={showMobileMenu} buttonNode onClickOverlay={showSideMenu} classNameSidebar={cl.modalSidebar}>
				<MobileNavbarMenu />
			</Modal>
		</nav>
	)
}
