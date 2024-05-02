'use client'

import { FC, useState } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_SmartSidebar.module.scss'
import CategoryButton from "@/entities/Metrics/ui/Category/Button/CategoryButton";
import { CategorySidebar } from "@/features/CategorySidebar";

interface SmartSidebarProps{
    className?: string,
    
}

export const SmartSidebar:FC<SmartSidebarProps> = ({className}) => {

    const [isShowCategories, setIsShowCategories] = useState<boolean>(false)

    return (
        <div className={cls(cl.SmartSidebar, className)}>
            <CategoryButton onClick={(prevState:boolean) => setIsShowCategories(!prevState)}/>
            <CategorySidebar isShowCategories={isShowCategories} toggleShowCategories={setIsShowCategories}/>
        </div>
    )
}
