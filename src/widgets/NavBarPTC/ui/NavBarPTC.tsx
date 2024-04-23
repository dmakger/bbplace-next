'use client'

import { FC, useEffect, useState } from "react";
import cl from './_NavBarPTC.module.scss';
import { DefaultIcon } from "@/shared/ui/Icon";
import { SORT_ICON, SORT_MOBILE_ICON, viewVariants } from "../data/navBarPTC.data";
import { cls } from "@/shared/lib/classes.lib";
import { IIconVariants } from "@/shared/model/icon.model";
import { MENU_WEB_DATA, PRODUCTS_ITEM_MENU_WEB_DATA } from "@/widgets/Menu/WEB";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ViewsNavBarPTC } from "../components/ViewsNavBarPTC";
import { useAppSelector } from "@/storage/hooks";
import { getPTCTextByNumber } from "../lib/text.ptc.lib";
import { SortModal } from "@/features/Modal/Sort/SortModal";
import { ECatalogVariants } from "@/widgets/SortFilterSidebar";
import { getPTCVariantByPathname } from "../lib/link.ptc.lib";

interface INavBarPTC {}

export const NavBarPTC: FC<INavBarPTC> = ({ }) => {
    // RTK
    const ptcState = useAppSelector(state => state.ptc);    
    
    // ROUTER
    const pathname = usePathname()
    const router = useRouter()

    //STATE
    const [selectedOption, setSelectedOption] = useState<IIconVariants>(getPTCVariantByPathname(pathname));

    // ON CLICK
    const handleOnClickMenuItem = (el: IIconVariants) => {
        if (el.link === undefined)
            return
        setSelectedOption(el)
        router.push(el.link);
    }    

    return (
        <section className={cl.NavBarPTC}>
            <div className={cl.leftContainer}>
                <div className={cl.navBarPTCItemContainer}>
                    {MENU_WEB_DATA.map(el => (
                        <button onClick={() => handleOnClickMenuItem(el)} className={cl.navBarItem} key={el.link}>
                            <p className={cls(cl.switchItem, selectedOption?.link === el.link ? cl.selected : '')}>
                                {el.title}
                            </p>
                            <span className={cls(cl.switchItemBorderBottom, selectedOption?.link === el.link ? cl.selectedSpan : '')} />
                        </button>
                    ))}
                </div>
                <div className={cl.mobileSortContainer}>                    
                    <SortModal variant={ECatalogVariants.PRODUCTS} />
                </div>
            </div>
            <div className={cl.rightContainer}>
                <p className={cl.resultNumber}>
                    {ptcState.amount} {getPTCTextByNumber(ptcState.amount, ptcState.view)}
                </p>
                {selectedOption &&
                    <ViewsNavBarPTC ptcLink={selectedOption.link} />
                }
                <SortModal variant={ECatalogVariants.PRODUCTS} hasOutline={true} 
                           classNameModal={cl.sortModal} classNameButton={cl.sortButton} />
            </div>
        </section>
    );
};
