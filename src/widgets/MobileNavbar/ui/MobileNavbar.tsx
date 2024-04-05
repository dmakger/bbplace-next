import React from 'react';
import cl from './_MobileNavbar.module.scss'
import Link from 'next/link';
import { MOBILE_MENU_DATA } from '@/shared/data/menu/mobile.menu.data';

export const MobileNavbar = () => {
  console.log('MobileNavbar')
  return (
    <nav className={cl.MobileNavbar}>
        <div className={cl.navBarParent}>
            {MOBILE_MENU_DATA.map(el => (
                <Link href={el.link ? el.link : ''} key={el.link} className={`${el.title === 'Главная' ? cl.noHover : cl.mobileNavbarButton}` }>
                    {el.image}
                    <p>{el.title}</p>
                </Link>
            ))}
        </div>
    </nav>
  )
}
