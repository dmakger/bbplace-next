'use client';
import cl from './_SortFilterSidebar.module.scss';
import { cls } from "@/shared/lib/classes.lib";
import { Button, ButtonVariant } from "@/shared/ui/Button";
import { Filter } from "@/features/Filter";
import { useCallback, useEffect, useState } from 'react';
import { ECatalogVariants } from '..';
import { DEFAULT_SORT_FILTER__DATA } from '../data/sortFilter.data';
import { ISortFilter } from '../model/sortFilterSidebar.model';
import { getUpdatedDataSortFilter, toSortFilter } from '../lib/sortFilter.lib';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { isEqual } from 'lodash';
import { Sort } from '@/features/Sort';
import { CountryAPI } from '@/entities/Metrics/api/country.metrics.api';
import { CategoryAPI } from '@/entities/Metrics/api/category.metrics.api';

interface ISortFilterSidebar{
    variant: ECatalogVariants,
    className?: string
}

export const SortFilterSidebar = ({ variant, className }: ISortFilterSidebar) => {

    // ROUTER
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    // toSortFilter(searchParams);

    // API
    // const { data: categories } = CategoryAPI.useGetCategoriesByIdQuery(undefined)
    const { data: categories, isLoading: isLoadingCategories } = CategoryAPI.useGetCategoriesQuery()
    const { data: categoriesParent, isLoading: isLoadingCategoriesParent } = CategoryAPI.useGetCategoriesByIdQuery(undefined)
    const { data: countries, isLoading: isLoadingCountries } = CountryAPI.useGetCountriesQuery()
    
    //STATE
    const [filter, setFilter] = useState<ISortFilter>(DEFAULT_SORT_FILTER__DATA)
    // const [filter, setFilter] = useState<ISortFilter>(toSortFilter(searchParams));
    const [isUpdated, setIsUpdated] = useState(false);

    useEffect(() => {
        if (isLoadingCategories || isLoadingCountries)
            return
        setFilter(() => toSortFilter(searchParams, categories!, countries!))
    }, [searchParams, categories, countries])

    useEffect(() => {
        setIsUpdated(!isEqual(filter, DEFAULT_SORT_FILTER__DATA));
    }, [filter, isUpdated]);


    const clearFilters = useCallback(() => {
        setFilter(DEFAULT_SORT_FILTER__DATA);
    }, []);

    const handleOnClickShow = () => {
        if (!isUpdated)
            return;
        const sortData = getUpdatedDataSortFilter(filter);
        const params = new URLSearchParams(searchParams.toString());
        Object.keys(sortData).map(keySort => {
            params.set(keySort, sortData[keySort]);
        });
        router.push(`${pathname}?${params.toString()}`);
    };


    return (
        <aside className={cls(cl.SortFilterSidebar, className)}>
            {variant !== ECatalogVariants.TENDERS &&
                <Sort variant={variant}
                    filter={filter}
                    setFilter={setFilter} />
            }
            <Filter variant={variant} 
                    filter={filter}
                    setFilter={setFilter} 
                    categories={categoriesParent ? categoriesParent : []} 
                    countries={countries ? countries : []} />
            <div className={cl.buttons}>
                {isUpdated &&
                    <Button variant={ButtonVariant.CLEAR} onClick={clearFilters}>
                        Очистить
                    </Button>}
                <Button variant={ButtonVariant.BORDERED_RED_WIDE} onClick={handleOnClickShow}>
                    Показать
                </Button>
            </div>
        </aside>
    );
};
