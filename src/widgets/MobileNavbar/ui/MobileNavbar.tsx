'use client'
import React from 'react';
import cl from './_MobileNavbar.module.scss'
import { Button, ButtonVariant } from '@/shared/ui/Button';
import { MOBILE_MENU_DATA } from '@/shared/data/menu/mobile.menu.data';
import { cls } from '@/shared/lib/classes.lib';
import { usePathname } from 'next/navigation';
import { IIconVariants } from '@/shared/model/icon.model';

interface IMobileNavbar {
  menuData?: IIconVariants[]
}


export const MobileNavbar = ({
  menuData = MOBILE_MENU_DATA 
}: IMobileNavbar) => {

  //ROUTER
  const pathname = usePathname()  

  return (
    <nav className={cl.MobileNavbar}>
      <div className={cl.navBarParent}>
        {menuData.map(el => (
          <Button 
            variant={ButtonVariant.CLEAR}
            href={el.link ?? ''}
            key={el.link}
            active={pathname === el.link}
            className={cls(cl.mobileNavbarButton, pathname === el.link ?? '' ? cl.active : '')}
            title={el.title}
            beforeImage={el.image}
            beforeProps={{width: 18, height: 18}}/>
        ))}
      </div>
    </nav>
  )
}
