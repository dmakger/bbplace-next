import { cls } from '@/shared/lib/classes.data'
import cl from './_MenuWEB.module.scss'
import { DefaultIcon } from '@/shared/ui/Icon'
import { MENU_WEB_DATA } from '../data/menu.web.data'
import { MENU_DATA } from '@/shared/data/menu/base.menu.data'

interface MenuWEBProps {
    className?: string
}

export const MenuWEB = ({className}: MenuWEBProps) => {
    return (
        <div className={cls(cl.block, className)}>
            <div className={cl.menu}>
                {MENU_WEB_DATA.map(el => (
                    <DefaultIcon key={el.id}
                        className='menuItemButton'
                        classNameText={'menuItem'}
                        textLink={el.title}
                        link={el.link}>
                        {el.image}
                    </DefaultIcon>
                ))}
                <div className={cl.line} />
                <div className={cl.iconsMenu}>
                    {MENU_DATA.map(el => (
                        <DefaultIcon key={el.id}
                            link={el.link}
                            className='menuWebButton'>
                            {el.image}
                        </DefaultIcon>
                    ))}
                </div>
                    
            </div>
        </div>
    )
}
