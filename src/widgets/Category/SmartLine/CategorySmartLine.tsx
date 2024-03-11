"use client"

import { useCategoryAll } from "@/entities/Metrics/hooks/useCategory.hooks"

export default function CategorySmartLine() {
    const { data: categoryList, setData: setCategoryList } = useCategoryAll()
    console.log(categoryList);
    

    return (
        <div>CategorySmartLine</div>
    )
}
