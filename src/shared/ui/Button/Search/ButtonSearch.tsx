import { cls } from '@/lib/classes';
import cl from './_ButtonSearch.module.scss'
import Image from 'next/image';

interface ButtonSearchProps {
    className?: string
}

export default async function ButtonSearch({className}: ButtonSearchProps) {
    return (
        <button className={cls(cl.button, className)}>
            <Image src={"search.svg"} alt={"Поиск"} width={19} height={19} />
        </button>
    )
}
