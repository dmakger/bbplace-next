'use client'

import { FC, useEffect, useState } from "react";

import { cls } from '@/shared/lib/classes.lib';
import cl from './_SmartSidebar.module.scss';
import { CategorySidebar } from "@/features/CategorySidebar";
import { CategoryButton } from "@/entities/Metrics/ui/Category";
import { CategoryAPI } from "@/entities/Metrics/api/category.metrics.api";
import { DropDownCatalog } from "@/features/DropDownCatalog";
import { updateCategoriesAsMenuItem } from "@/features/DropDownCatalog/lib/dropDownCatalog.lib";
import { IMenuItem } from "@/shared/model/menu.model";
import { EWrapperDropdownListPosition, EWrapperDropdownListVariant } from "@/shared/ui/Wrapper/DropdownList/model/wrapperDropdownList.model";

interface SmartSidebarProps {
    className?: string,
    isMobile?: boolean
}

export const SmartSidebar: FC<SmartSidebarProps> = ({
    className,
    isMobile = false
}) => {
    // STATE
    const [isShowCategories, setIsShowCategories] = useState<boolean>(false)
    const [categoriesAsMenuItem, setCategoriesAsMenuItem] = useState<IMenuItem[]>([])

    //API
    const { data: categories, isLoading: isLoadingCategoriesParent } = CategoryAPI.useGetCategoriesByIdQuery(undefined)

    //EFFECT
    useEffect(() => {
        categories && categories.length && updateCategoriesAsMenuItem(categories, setCategoriesAsMenuItem);
    }, [categories]);

    //HANDLE
    const closeTheModal = () => setIsShowCategories(false);

    return (
        <div className={cls(cl.SmartSidebar, className)}>
            <CategoryButton onClick={(prevState: boolean) => setIsShowCategories(!prevState)} isMobile />
            {!isMobile && <CategorySidebar isShowCategories={isShowCategories} toggleShowCategories={setIsShowCategories} />}

            {isMobile && !isLoadingCategoriesParent &&
                <DropDownCatalog
                    title="Каталог"
                    secondDropDownListData={categoriesAsMenuItem}
                    onClickXMark={closeTheModal}
                    dropDownListVariant={EWrapperDropdownListVariant.MOBILE}
                    dropDownListPosition={EWrapperDropdownListPosition.RIGHT}
                    isOpenModal={isShowCategories}
                    setIsOpenModal={setIsShowCategories}
                />}
        </div>
    )
}
