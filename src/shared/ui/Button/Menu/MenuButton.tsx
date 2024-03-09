import Link from 'next/link'
import Image from 'next/image'
import cl from './_MenuButton.module.scss'

interface MenuButtonProps {
    image: string
    title?: string
    href: string
    className?: string
}

export default function MenuButton({image, title, href, className}: MenuButtonProps) {
    return (
        <Link href={href} className={cl.link}>
            <Image src={image} 
                   alt={title ? title : 'menu item'}
                   width={27} height={27} />
            <span className={cl.title}>{title}</span>
        </Link>
    )
}
