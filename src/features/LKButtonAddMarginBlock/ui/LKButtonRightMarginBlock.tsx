'use client'

import { usePathname } from 'next/navigation'
import cl from './_LKButtonRightMarginBlock.module.scss'
import { useEffect, useState } from 'react'
import { DASHBOARD_PAGES, MAIN_PAGES } from '@/config/pages-url.config'

export const LKButtonRightMarginBlock = () => {

  //STATE
  const [hasButtonRight, setHasButtonRight] = useState<boolean>(false);

  //PATHNAME
  const pathname = usePathname()

  //EFFECT
  useEffect(() => {
    const pagesToCheck = [
      DASHBOARD_PAGES.PRODUCTS.path,
      DASHBOARD_PAGES.TENDERS.path,
      DASHBOARD_PAGES.PROFILE_EDIT.path,
      MAIN_PAGES.TENDERS.path + '/',
      MAIN_PAGES.PRODUCTS.path + '/'
    ];

    const shouldShowButtonRight = pagesToCheck.some(page => pathname.includes(page));
    setHasButtonRight(shouldShowButtonRight);
  }, [pathname]);


  return (
    <div className={hasButtonRight ? cl.LKWButtonAddPage : cl.LKButtonAddMarginBlock} />
  )
}
