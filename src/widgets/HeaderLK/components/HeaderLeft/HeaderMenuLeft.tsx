import { cls } from "@/shared/lib/classes.lib"
import cl from './_HeaderMenuLeft.module.scss'
import { Logo } from "@/shared/ui/Logo"

interface IHeaderMenuLeft{
    className?: string,

}

export const HeaderMenuLeft = ({className}: IHeaderMenuLeft) => {
    return (
        <nav className={cls(cl.HeaderMenuLeft, className)}>
            <Logo />
        </nav>
    )
}
