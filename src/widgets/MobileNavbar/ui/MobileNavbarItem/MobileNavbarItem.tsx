import { IMenuItem } from '@/shared/model/menu.model'
import cl from './_MobileNavbarItem.module.scss'
import Link from "next/link"
import { useTranslate } from '@/shared/ui/Translate'
import { TRANSLATED_MENU_NAV } from '@/shared/data/translate.data'

interface IMobileNavbarItem extends IMenuItem{
    language: string
}


export const MobileNavbarItem = ({
    image,
    link,
    title,
    language
}: IMobileNavbarItem) => {

    const t = useTranslate(TRANSLATED_MENU_NAV, title ? title : '', language)

    return (
        <Link href={link ? link : ''} key={link} className={`${title === 'Главная' ? cl.noHover : cl.mobileNavbarButton}`}>
            {image}
            <p>{t}</p>
        </Link>
    )
}
