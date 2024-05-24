import cl from './_DetailedPageDescription.module.scss'
import { cls } from "@/shared/lib/classes.lib"

interface IDetailedPageDescription {
    className?: string,
    description: string
}


export const DetailedPageDescription = ({
    className,
    description
}: IDetailedPageDescription) => {
    return (
        <p className={cls(cl.DetailedPageDescription, className)}>
            {description}
        </p>
    )
}
