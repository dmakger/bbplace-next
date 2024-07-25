'use client'

import React, { useEffect, useState } from 'react';
import cl from './_MobileNavbar.module.scss'
import { Button, ButtonVariant } from '@/shared/ui/Button';
import { MOBILE_MENU_DATA, SUPPORT_PAGE_MOBILE_DATA } from '@/shared/data/menu/mobile.menu.data';
import { cls } from '@/shared/lib/classes.lib';
import { usePathname, useRouter } from 'next/navigation';
import { IIconVariants } from '@/shared/model/icon.model';
import { IIcon } from '@/shared/ui/Icon/model/icon.model';

interface IMobileNavbar {
	menuData?: IIconVariants[]
}


export const MobileNavbar = ({
	menuData = MOBILE_MENU_DATA
}: IMobileNavbar) => {

	//STATE
	const [mobileMenuData, setMobileMenuData] = useState<IIconVariants[]>(menuData)

	//ROUTER
	const pathname = usePathname();
	const router = useRouter();

	//EFFECT
	useEffect(() => {
		if(pathname.includes('support')){			
			setMobileMenuData(SUPPORT_PAGE_MOBILE_DATA)
		}
	}, [menuData, pathname])

	//FUNCTION
	const goBack = () => router.back();

	return (
		<nav className={cl.MobileNavbar}>
			<div className={cl.navBarParent}>
				{mobileMenuData.map(el => (
					<Button
						variant={ButtonVariant.CLEAR}
						href={el.link ?? ''}
						key={el.id}
						active={pathname === el.link}
						className={cls(cl.mobileNavbarButton, pathname === el.link ?? '' ? cl.active : '')}
						title={el.title}
						beforeImage={el.image as IIcon}
						beforeProps={{ width: 18, height: 18 }}
						onClick={!el.link ? goBack : () => { }} />
				))}
			</div>
		</nav>
	)
}
