import { cls } from "@/shared/lib/classes.lib"
import cl from './_InfoItem.module.scss'

interface IInfoItem{
    className?: string,
    heading?:string,
    classNameHeading?: string,
    

}

export const InfoItem = ({
    className,
    heading
}:IInfoItem) => {
    return (
        <div className={cls(cl.InfoItem, className)}>
            {heading && <span className={cl.heading}>{heading}</span>}
        </div>
    )
}
