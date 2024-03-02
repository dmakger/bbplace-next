import { cls } from '@/lib/classes'
import cl from './_InputText.module.scss'

interface InputTextProps {
    placeholder?: string
    className?: string
}

export default async function InputText({placeholder='', className}: InputTextProps) {
    return (
        <input type="text" placeholder={placeholder} 
               className={cls(cl.input, className)} />
    )
}
