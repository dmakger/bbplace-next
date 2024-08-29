'use client'

import { usePathname } from 'next/navigation'
import cl from './_LKButtonAddMarginBlock.module.scss'
import { useEffect, useState } from 'react'
import { DASHBOARD_PAGES } from '@/config/pages-url.config'

export const LKButtonAddMarginBlock = () => {

  //STATE
  const [hasButtonAdd, setHasButtonAdd] = useState<boolean>(false);

  //PATHNAME
  const pathname = usePathname()

  //EFFECT
  useEffect(() => {
    if (pathname.includes(DASHBOARD_PAGES.PRODUCTS.path) || pathname.includes(DASHBOARD_PAGES.TENDERS.path)) {
      setHasButtonAdd(true)
    }
    else {
      setHasButtonAdd(false)
    }
  }, [pathname])


  return (
    <div className={hasButtonAdd ? cl.LKWButtonAddPage : cl.LKButtonAddMarginBlock} />
  )
}
