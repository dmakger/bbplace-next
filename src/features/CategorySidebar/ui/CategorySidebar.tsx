'use client'

import WrapperClickOutside from '@/shared/ui/Wrapper/ClickOutside/WrapperClickOutside'
import cl from './_CategorySidebar.module.scss'
import { useEffect, useRef, useState } from 'react'
import { cls } from '@/shared/lib/classes.lib'
import { CategoryAPI } from '@/entities/Metrics/api/category.metrics.api'
import { ICategoriesWithSubcategories } from '@/entities/Metrics/model/category.metrics.model'
import { CategoryColumn } from '../components/CategoryColumn/CategoryColumn'


interface ICategorySidebar {
    isShowCategories: boolean,
    toggleShowCategories: Function
}

export const CategorySidebar = ({
    isShowCategories,
    toggleShowCategories
 }: ICategorySidebar) => {

    //STATE
    const [selectedCategoriesArray, setSelectedCategoriesArray] = useState<ICategoriesWithSubcategories[]>([])
    const [filteredCategories, setFilteredCategories] = useState<ICategoriesWithSubcategories[]>([])
    
    //API
    const { data: categories } = CategoryAPI.useGetCategoriesWithSubcategoriesQuery({toOption: false})

    //REF
    const ref = useRef<HTMLDivElement>(null)
 
    //EFFECT
    useEffect(() => {
        if(categories)
            setFilteredCategories(categories as ICategoriesWithSubcategories[])
    }, [categories])

    useEffect(() => {
        if (!isShowCategories) {
            setSelectedCategoriesArray([])
        }
    }, [isShowCategories])

    // HANDLE
    const handleHoverCategory = (_: number, it: ICategoriesWithSubcategories) => {
        // let newSelectedOptions = [...selectedCategoriesArray]
        
        //     if (it.depth === 0) {
        //         newSelectedOptions = [it];            
        //     } else if (it.depth >= newSelectedOptions.length) {
        //         newSelectedOptions.push(it);
        //     } else {
        //         newSelectedOptions = newSelectedOptions.slice(0, it.depth);
        //         newSelectedOptions[it.depth] = it;
        //     }

        // setSelectedCategoriesArray(newSelectedOptions)
    }

    return (
        <WrapperClickOutside isShow={isShowCategories} _ref={ref} handle={toggleShowCategories}> 
            <div className={cls(cl.CategorySidebar, isShowCategories ? cl.show : '')}>
                <CategoryColumn className={cls(isShowCategories ? cl.addMainColumn : '')} categories={filteredCategories || []} onHover={handleHoverCategory} toggleShowCategories={toggleShowCategories}/>

                {/* {selectedCategoriesArray && selectedCategoriesArray.map(it => {
                    return it.subcategories.length > 0 ? (
                        <CategoryColumn key={it.id}
                            categories={it.subcategories}
                            onHover={handleHoverCategory}
                            className={cls(cl.subColumn, selectedCategoriesArray.length > it.depth ? cl.addColumn : '')}
                            toggleShowCategories={toggleShowCategories} />
                    ) : null
                })} */}
            </div>
        </WrapperClickOutside>

    )
}
