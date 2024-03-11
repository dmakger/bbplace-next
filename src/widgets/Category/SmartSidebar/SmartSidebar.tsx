import { FC } from "react"

import { cls } from '@/shared/lib/classes.data';
import cl from './_SmartSidebar.module.scss'
import CategoryButton from "@/entities/Metrics/ui/Category/Button/CategoryButton";

interface SmartSidebarProps{
    className?: string,
}

export const SmartSidebar:FC<SmartSidebarProps> = ({className}) => {
    return (
        <div className={cls(className)}>
            <CategoryButton />
        </div>
    )
}
