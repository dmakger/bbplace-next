import { cls } from "@/shared/lib/classes.lib"
import cl from './_NavBarPTCItem.module.scss'
import { IIconVariants } from "@/shared/model/icon.model"
import { TRANSLATED_PTC_MENU } from "@/shared/data/translate/ptcMenu.translate.data"
import { useTranslate } from "@/shared/ui/Translate"

interface INavBarPTCItem {
    link: string | undefined,
    selectedOption: IIconVariants,
    onClick: () => void,
    title: string | undefined,
    language: string
}

export const NavBarPTCItem = ({
     link,
     selectedOption,
     title,
     language,
     onClick
 }: INavBarPTCItem) => {

    const t = useTranslate(TRANSLATED_PTC_MENU, title, language)

    return (
        <button key={link} className={cl.navBarItem} onClick={onClick}> 
            <p
                className={cls(cl.switchItem, selectedOption?.link === link ? cl.selected : '')}>
                {t}
            </p>
            <span className={cls(cl.switchItemBorderBottom, selectedOption?.link === link? cl.selectedSpan : '')} />
        </button>
    )
}
