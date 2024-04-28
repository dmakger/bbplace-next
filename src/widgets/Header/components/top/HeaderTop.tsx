import { cls } from '@/shared/lib/classes.lib';
import cl from './_HeaderTop.module.scss'
import Logo from '@/shared/ui/Logo/Logo';
import { Search } from '@/features/Search';
import { MenuWEB } from '@/widgets/Menu/WEB';
import Wrapper1280 from '@/shared/ui/Wrapper/1280/Wrapper1280';
import CategoryButton from '@/entities/Metrics/ui/Category/Button/CategoryButton';
import { HeaderUser } from '@/features/User/Auth';

interface HeaderTopProps {
    className?: string
}

export default function HeaderTop({className}: HeaderTopProps) {
    return (
        <Wrapper1280 classNameWrapper={cls(cl.wrapper, className)} classNameContent={cl.block}>
            <div className={cl.left}>
                <div className={cl.logo}>
                    <Logo />
                </div>
                <div className={cl.categoryButton}>
                    <CategoryButton isMobile={true} className={cl.mobileButton}/>
                </div>
                <Search />
            </div>
            <div className={cl.right}>
                <MenuWEB />
                <HeaderUser/>
            </div>
            
        </Wrapper1280>
    )
}
