import { cls } from '@/shared/lib/classes.data'
import HeaderBottom from '../components/bottom/HeaderBottom'
import HeaderTop from '../components/top/HeaderTop'
import cl from './_Header.module.scss'

interface HeaderProps {
    className?: string
}

export default function Header({className}: HeaderProps) {
    return (
        <header className={cls(cl.header, className)}>
            <HeaderTop />
            <HeaderBottom />
        </header>
    )
}
