"use client"

import Link from 'next/link'
import Image from 'next/image'
import cl from './_MenuButton.module.scss'
import { IMenuItem } from '@/shared/model/menu.model'
import { cls } from '@/shared/lib/classes.lib'
import { useState } from 'react'

interface MenuButtonProps {
    item: IMenuItem
    className?: string
}

export default function MenuButton({item, className}: MenuButtonProps) {
    const [isHovered, setIsHovered] = useState(false);
    
    return (
        <Link href={item.link} 
              onMouseEnter={() => setIsHovered(true)} 
              onMouseLeave={() => setIsHovered(false)} 
              className={cls(cl.link, className)}>
            <Image src={item.image || ''} 
                   alt={item.title ? item.title : 'menu item'} 
                   width={27} height={27} />
            <span className={cl.title}>{item.title}</span>
        </Link>
    )
}
