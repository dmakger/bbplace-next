import { IOption } from '@/shared/model/option.model'
import cl from './_InputSelect.module.scss'

interface InputSelectProps {
    options: IOption[]
    className?: string
}

export default async function InputSelect({options, className}: InputSelectProps) {
    return (
        <div>InputSelect</div>
    )
}
