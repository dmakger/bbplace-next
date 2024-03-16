import { cls } from '@/shared/lib/classes.lib'
import cl from './_MenuWEB.module.scss'
import { MENU_DATA } from '@/shared/data/menu/base.menu.data'
import MenuButton from '@/shared/ui/Button/Menu/MenuButton'
import { DASHBOARD_WOT_MENU_DATA } from '@/shared/data/menu/dashboard.menu.data'

interface MenuWEBProps {
    className?: string
}

export default function MenuWEB({className}: MenuWEBProps) {
    return (
        <div className={cls(cl.block, className)}>
            <div className={cl.menu}>
                {MENU_DATA.map((it, index) => (
                    <MenuButton item={it} key={index} />
                ))}
                <div className={cl.line} />
                {DASHBOARD_WOT_MENU_DATA.map((it, index) => (
                    <MenuButton item={it} key={index} />
                ))}
            </div>
        </div>
    )
}
