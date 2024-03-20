import { cls } from '@/shared/lib/classes.lib'
import HeaderBottom from '../components/bottom/HeaderBottom'
import HeaderTop from '../components/top/HeaderTop'
import cl from './_Header.module.scss'

interface HeaderProps {
    className?: string
}

export const Header = ({className}: HeaderProps) => {
    return (
        <header className={cls(cl.header, className)}>
            <HeaderTop />
            <HeaderBottom />
        </header>
    )
}
