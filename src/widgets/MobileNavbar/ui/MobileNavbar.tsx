import React from 'react';
import cl from './_MobileNavbar.module.scss'
import Image from 'next/image';
import { MOBILE_MENU_DATA } from '../data/mobileNavbar.data';

export const MobileNavbar = () => {
  return (
    <nav className={cl.MobileNavbar}>
        <div className={cl.navBarParent}>
            {MOBILE_MENU_DATA.map(el => (
                <button key={el.link}>
                    {el.image}
                    <p>{el.title}</p>
                </button>
            ))}
        </div>
    </nav>
  )
}
