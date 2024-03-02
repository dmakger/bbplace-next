import HeaderBottom from '../components/bottom/HeaderBottom'
import HeaderTop from '../components/top/HeaderTop'
import cl from './_Header.module.scss'

interface HeaderProps {
    className?: string
}

export default async function Header({className}: HeaderProps) {
    return (
        <div className={className}>
            <HeaderTop />
            <HeaderBottom />
        </div>
    )
}
