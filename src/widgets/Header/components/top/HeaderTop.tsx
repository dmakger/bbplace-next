import { cls } from '@/shared/lib/classes.data';
import cl from './_HeaderTop.module.scss';
import Logo from '@/shared/ui/Logo/Logo';
import Search from '@/features/Search/ui/Search';
import MenuWEB from '@/widgets/Menu/WEB/MenuWEB';
import UserAuth from '@/features/User/Auth/UserAuth';

interface HeaderTopProps {
    className?: string
}

export default function HeaderTop({className}: HeaderTopProps) {
    return (
        <div className={cls(cl.wrapper, className)}>
            <div className={cl.block}>
                <div className={cl.left}>
                    <Logo />
                    <Search />
                </div>
                <MenuWEB />
                <UserAuth />
            </div>
        </div>
    )
}
