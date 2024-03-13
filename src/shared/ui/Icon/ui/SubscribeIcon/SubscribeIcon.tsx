'use client'

import { FC, useState } from 'react'
import cl from './SubscribeIcon.module.scss'
import SubscribedIcon from '@/shared/assets/img/SubscribedIcon.svg'
import Image from 'next/image'
import { SubscribeIconVariant } from '../..'
import { cls } from '@/shared/lib/classes.data'


interface ISubscribeIcon{
    variant?: SubscribeIconVariant
}


export const SubscribeIcon:FC<ISubscribeIcon> = ({variant = SubscribeIconVariant.EMPTY}) => {

    const [isSubscribed, setIsSubscribed] = useState<boolean>(false)

  return (
      <div className={cl.SubscribeIcon}>
          {!isSubscribed ? <button className={`${cl.iconContainer} ${cl[variant]}`} onClick={() => setIsSubscribed(!isSubscribed)}>
              <svg className={`${variant.includes('w-text') ? '' : cl.toSubscribeIcon}`} width="17" height="17" viewBox="0 0 17 17" fill='none' xmlns="http://www.w3.org/2000/svg">
                  <circle cx="8.5" cy="8.5" r="7.5" stroke="#979399" />
                  <path d="M8.00284 12.9375V4.5H9.43466V12.9375H8.00284ZM4.5 9.43466V8.00284H12.9375V9.43466H4.5Z" fill="#979399" />
              </svg>
              {(variant === SubscribeIconVariant.WTEXT_CLEAR) ? 'Подписаться' : ''}
          </button> :
              <button className={cls(cl.iconContainer, cl[variant], cl.emptyIconSubscribed)} onClick={() => setIsSubscribed(!isSubscribed)}>
                  <Image src={SubscribedIcon} alt='SubscribeIcon' />
                  {(variant === SubscribeIconVariant.WTEXT_GRAY) ? 'Вы подписаны' : ''}
              </button>
          }
      </div>
  )
}

