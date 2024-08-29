'use client'

import { usePathname } from 'next/navigation'
import cl from './_LKButtonRightMarginBlock.module.scss'
import { useEffect, useState } from 'react'
import { DASHBOARD_PAGES } from '@/config/pages-url.config'

export const LKButtonRightMarginBlock = () => {

  //STATE
  const [hasButtonRight, setHasButtonRight] = useState<boolean>(false);

  //PATHNAME
  const pathname = usePathname()

  //EFFECT
  useEffect(() => {
    const isMyTendersPage = pathname.includes(DASHBOARD_PAGES.PRODUCTS.path);
    const isMyProductsPage = pathname.includes(DASHBOARD_PAGES.TENDERS.path);
    const isProfileEditPage = pathname.includes(DASHBOARD_PAGES.PROFILE_EDIT.path);
    
    const BUTTON_RIGHT_PAGES: boolean[] = [
      isMyTendersPage,
      isMyProductsPage,
      isProfileEditPage
    ]
    if (BUTTON_RIGHT_PAGES.find(it => it)) {
      setHasButtonRight(true)
    }
    else {
      setHasButtonRight(false)
    }
  }, [pathname])


  return (
    <div className={hasButtonRight ? cl.LKWButtonAddPage : cl.LKButtonAddMarginBlock} />
  )
}
