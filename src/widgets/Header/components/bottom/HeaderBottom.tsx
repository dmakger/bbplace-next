import { cls } from '@/shared/lib/classes.data';
import cl from './_HeaderBottom.module.scss';
import Wrapper1280 from '@/shared/ui/Wrapper/1280/Wrapper1280';
import CategorySmartLine from '@/widgets/Category/SmartLine/CategorySmartLine';
import { SmartSidebar } from '@/widgets/Category/SmartSidebar/SmartSidebar';

interface HeaderTopProps {
    className?: string
}

export default function HeaderBottom({className}: HeaderTopProps) {
    return (
        <Wrapper1280 classNameWrapper={cls(cl.wrapper, className)} classNameContent={cl.content}>
            <SmartSidebar />
            <div className={cl.line} />
            <CategorySmartLine />
        </Wrapper1280>
    )
}
