import { cls } from '@/shared/lib/classes.data'
import cl from './_MenuWEB.module.scss'
import MenuButton from '@/shared/ui/Button/Menu/MenuButton'
import { DASHBOARD_WOT_MENU_DATA } from '@/shared/data/menu/dashboard.menu.data'
import { DefaultIcon } from '@/shared/ui/Icon'
import { MENU_DATA } from '../data/menu.web.data'

interface MenuWEBProps {
    className?: string
}

export const MenuWEB = ({className}: MenuWEBProps) => {
    return (
        <div className={cls(cl.block, className)}>
            <div className={cl.menu}>
                {MENU_DATA.map(it => (
                    <DefaultIcon key={it.id}
                            className='menuItemButton'
                            classNameText={'menuItem'}
                            textLink={it.title}
                            link={it.link}>
                        {it.image}
                    </DefaultIcon>
                ))}
                <div className={cl.line} />
                {DASHBOARD_WOT_MENU_DATA.map((it, index) => (
                    <MenuButton item={it} key={index} />
                ))}
            </div>
        </div>
    )
}
