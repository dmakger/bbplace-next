import { cls } from '@/shared/lib/classes.lib';
import cl from './_HeaderTop.module.scss'
import Logo from '@/shared/ui/Logo/Logo';
import Search from '@/features/Search/ui/Search';
import { MenuWEB } from '@/widgets/Menu/WEB';
import UserAuth from '@/features/User/Auth/UserAuth';
import Wrapper1280 from '@/shared/ui/Wrapper/1280/Wrapper1280';

interface HeaderTopProps {
    className?: string
}

export default function HeaderTop({className}: HeaderTopProps) {
    return (
        <Wrapper1280 classNameWrapper={cls(cl.wrapper, className)} classNameContent={cl.block}>
            <div className={cl.left}>
                <Logo />
                <Search />
            </div>
            <MenuWEB />
            <UserAuth />
        </Wrapper1280>
    )
}
