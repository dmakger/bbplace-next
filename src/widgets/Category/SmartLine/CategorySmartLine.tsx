"use client"


import { CategoryLine } from '@/entities/Metrics/ui/Category';
import cl from './_CategorySmartLine.module.scss'
import { CategoryAPI } from "@/entities/Metrics/api/category.metrics.api";

export default function CategorySmartLine() {
    const {data: categoryList} = CategoryAPI.useGetCategoriesByIdQuery(undefined)              

    return (
        <div className={cl.line}>
            <CategoryLine categoryList={categoryList ? categoryList : []} className={cl.list} />
            <CategoryLine categoryList={categoryList ? categoryList : []} className={cl.list} />
        </div>
    )
}
