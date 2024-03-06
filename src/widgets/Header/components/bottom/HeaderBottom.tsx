import { cls } from '@/shared/lib/classes.data';
import cl from './_HeaderBottom.module.scss';

interface HeaderTopProps {
    className?: string
}

export default function HeaderBottom({className}: HeaderTopProps) {
    return (
        <div className={cls(cl.wrapper, className)}>
            HeaderBottom
        </div>
    )
}
