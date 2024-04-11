'use client'

import cl from './_MobileNavbar.module.scss'
import { MOBILE_MENU_DATA } from '@/shared/data/menu/mobile.menu.data';
import { MobileNavbarItem } from './MobileNavbarItem/MobileNavbarItem';
import { useAppSelector } from '@/storage/hooks';

export const MobileNavbar = () => {

  const language = useAppSelector(state => state.translate.language)

  return (
    <nav className={cl.MobileNavbar}>
        <div className={cl.navBarParent}>
            {MOBILE_MENU_DATA.map(el => (
                <MobileNavbarItem link={el.link} image={el.image} title={el.title} language={language}/>
            ))}
        </div>
    </nav>
  )
}
