import Link from 'next/link'
import Image from 'next/image'
import cl from './_MenuButton.module.scss'
import { IMenuItem } from '@/shared/model/menu.model'

interface MenuButtonProps {
    item: IMenuItem
    className?: string
}

export default function MenuButton({item, className}: MenuButtonProps) {
    return (
        <Link href={item.link} className={cl.link}>
            <Image src={item.image} 
                   alt={item.title ? item.title : 'menu item'}
                   width={27} height={27} />
            <span className={cl.title}>{item.title}</span>
        </Link>
    )
}
