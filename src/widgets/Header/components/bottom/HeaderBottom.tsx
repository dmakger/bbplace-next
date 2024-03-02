import { cls } from '@/lib/classes';
import cl from './_HeaderBottom.module.scss';

interface HeaderTopProps {
    className?: string
}

export default async function HeaderBottom({className}: HeaderTopProps) {
    return (
        <div className={cls(cl.wrapper, className)}>
            HeaderBottom
        </div>
    )
}
