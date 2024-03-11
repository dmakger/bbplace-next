"use client"

import { useCategoryAll } from "@/entities/Metrics/hooks/useCategory.hooks"
import CategoryLine from "@/entities/Metrics/ui/Category/Line/CategoryLine";

import cl from './_CategorySmartLine.module.scss'
import { ICategory } from "@/entities/Metrics/model/category.metrics.model";

export default function CategorySmartLine() {
    const { data: categoryList, setData: setCategoryList } = useCategoryAll()

    return (
        <div className={cl.line}>
            <CategoryLine categoryList={categoryList ? categoryList : []} className={cl.list} />
            <CategoryLine categoryList={categoryList ? categoryList : []} className={cl.list} />
        </div>
    )
}
