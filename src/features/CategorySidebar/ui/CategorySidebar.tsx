'use client'

import WrapperClickOutside from '@/shared/ui/Wrapper/ClickOutside/WrapperClickOutside'
import cl from './_CategorySidebar.module.scss'
import { MouseEvent, useEffect, useRef, useState } from 'react'
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
    const [selectedCategory, setSelectedCategory] = useState<ICategoriesWithSubcategories[]>([])
    const [secondSelectedCategory, setSecondSelectedCategory] = useState<ICategoriesWithSubcategories[]>([])    
    
    //API
    const { data: categories } = CategoryAPI.useGetCategoriesWithSubcategoriesQuery()

    //REF
    const ref = useRef<HTMLDivElement>(null)

    const onHover = (e: MouseEvent<HTMLElement>) => {
        if(categories && e.currentTarget.innerText){
            const findedCategory = categories.find(it => it.name === e.currentTarget.innerText);
            setSelectedCategory(findedCategory ? findedCategory.subcategories : []);
        }
        
    }
    const onHoverSecond = (e: MouseEvent<HTMLElement>) => {
        if(categories && e.currentTarget.innerText){            
            const findedCategory = selectedCategory.find(it => it.name === e.currentTarget.innerText);
            setSecondSelectedCategory(findedCategory ? findedCategory.subcategories : []);
        }
        
    }

   

    //EFFFECT
    useEffect(() => {
        if (!isShowCategories) {
            setSelectedCategory([])
            setSecondSelectedCategory([])
        }
    }, [isShowCategories])

    return (
        <WrapperClickOutside isShow={isShowCategories} _ref={ref} handle={toggleShowCategories}> 
            <div className={cls(cl.CategorySidebar, isShowCategories ? cl.show : '')}>
                <CategoryColumn categories={categories || []} onHover={onHover}/>
                {selectedCategory && <CategoryColumn categories={selectedCategory || []} onHover={selectedCategory.length ? onHoverSecond : () => {}}/>}
                {secondSelectedCategory && <CategoryColumn categories={secondSelectedCategory || []} onHover={() => {}}/>}
            </div>
        </WrapperClickOutside>

    )
}
