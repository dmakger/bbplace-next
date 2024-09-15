import { cls } from '@/shared/lib/classes.lib';
import cl from './_HeaderTop.module.scss';
import { Search } from '@/features/Search';
import { MenuWEB } from '@/widgets/Menu/WEB';
import Wrapper1280 from '@/shared/ui/Wrapper/1280/Wrapper1280';
import { HeaderUser } from '@/features/User/Auth';
import { Logo } from '@/shared/ui/Logo';
import { SmartSidebar } from '@/widgets/Category/SmartSidebar/SmartSidebar';

interface HeaderTopProps {
    className?: string
}

export default function HeaderTop({ className }: HeaderTopProps) {
    return (
        <Wrapper1280 classNameWrapper={cls(cl.wrapper, className)} classNameContent={cl.block}>
            <div className={cl.left} autoFocus>
                <div className={cl.logo}>
                    <Logo />
                </div>
                <SmartSidebar isMobile className={cl.categoryMobile} />
                <Search />
            </div>
            <div className={cl.right}>
                <MenuWEB />
                <HeaderUser />
            </div>

        </Wrapper1280>
    )
}
