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

    //STATE
    const [filter, setFilter] = useState<ISortFilter>(DEFAULT_SORT_FILTER__DATA)
    // const [filter, setFilter] = useState<ISortFilter>(toSortFilter(searchParams));
    const [isUpdated, setIsUpdated] = useState(false);

    useEffect(() => {
        setFilter(() => {
            const _data = toSortFilter(searchParams)
            console.log('nigger _data', _data, DEFAULT_SORT_FILTER__DATA);
            
            return _data
        })
    }, [searchParams])

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
        console.log('nigger', sortData);
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
                    setFilter={setFilter} />}
            <Filter variant={variant}
                filter={filter}
                setFilter={setFilter} />
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
