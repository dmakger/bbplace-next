"use client"

import CategoryLine from "@/entities/Metrics/ui/Category/Line/CategoryLine";

import cl from './_CategorySmartLine.module.scss'
import { useAppSelector } from "@/storage/hooks";

export default function CategorySmartLine() {
    const categoryList = useAppSelector(state => state.categoryList);

    return (
        <div className={cl.line}>
            <CategoryLine categoryList={categoryList ? categoryList : []} className={cl.list} />
            <CategoryLine categoryList={categoryList ? categoryList : []} className={cl.list} />
        </div>
    )
}
