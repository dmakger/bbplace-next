'use client'

import { FC, useState } from "react";
import cl from './_NavBarPTC.module.scss';
import { DefaultIcon } from "@/shared/ui/Icon";
import { SORT_ICON, SORT_MOBILE_ICON, viewVariants } from "../data/navBarPTC.data";
import { cls } from "@/shared/lib/classes.lib";
import { IIconVariants } from "@/shared/model/icon.model";
import { MENU_WEB_DATA, PRODUCTS_ITEM_MENU_WEB_DATA } from "@/widgets/Menu/WEB";
import { useSearchParams } from "next/navigation";
import { ViewsNavBarPTC } from "../components/ViewsNavBarPTC";
import { useAppSelector } from "@/storage/hooks";
import { getPTCTextByNumber } from "../lib/text.ptc.lib";
import { SortModal } from "@/features/Modal/Sort/SortModal";
import { ECatalogVariants } from "@/widgets/SortFilterSidebar";

interface INavBarPTC {}

export const NavBarPTC: FC<INavBarPTC> = ({ }) => {
    // RTK
    const ptcState = useAppSelector(state => state.ptc);    
    
    // ROUTER
    const searchParams = useSearchParams()

    //STATE
    const [selectedOption, setSelectedOption] = useState<IIconVariants>(PRODUCTS_ITEM_MENU_WEB_DATA);

    return (
        <section className={cl.NavBarPTC}>
            <div className={cl.leftContainer}>
                <div className={cl.navBarPTCItemContainer}>
                    {MENU_WEB_DATA.map(el => (
                        <button key={el.link} className={cl.navBarItem}>
                            <p className={cls(cl.switchItem, selectedOption?.link === el.link ? cl.selected : '')}
                                onClick={() => setSelectedOption(el)}>
                                {el.title}
                            </p>
                            <span className={cls(cl.switchItemBorderBottom, selectedOption?.link === el.link ? cl.selectedSpan : '')} />
                        </button>
                    ))}
                </div>
                <div className={cl.mobileSortContainer}>
                    {/* <DefaultIcon className={cl.mobileSortButton} onClick={() => { }}>
                        {SORT_MOBILE_ICON.image}
                    </DefaultIcon> */}
                    
                    <SortModal variant={ECatalogVariants.PRODUCTS} />
                </div>
                {/* <SortModal variant={ECatalogVariants.PRODUCTS} /> */}
            </div>
            <div className={cl.rightContainer}>
                <p className={cl.resultNumber}>
                    {ptcState.amount} {getPTCTextByNumber(ptcState.amount, ptcState.view)}
                </p>
                <ViewsNavBarPTC ptcLink={selectedOption.link} />
                {/* <DefaultIcon className="sortButton" onClick={() => { }}>
                    {SORT_ICON.image}
                </DefaultIcon> */}
                
                <SortModal variant={ECatalogVariants.PRODUCTS} />
            </div>
        </section>
    );
};
