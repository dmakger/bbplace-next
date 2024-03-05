import { cls } from '@/shared/lib/classes.data';
import cl from './_HeaderTop.module.scss';
import Logo from '@/shared/ui/Logo/Logo';
import Search from '@/features/Search/ui/Search';

interface HeaderTopProps {
    className?: string
}

export default async function HeaderTop({className}: HeaderTopProps) {
    return (
        <div className={cls(cl.wrapper, className)}>
            <div className={cl.block}>
                <div className={cl.left}>
                    <Logo />
                    <Search />
                </div>
            </div>
        </div>
    )
}
