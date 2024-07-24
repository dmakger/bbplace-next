'use client'

import { FC, useEffect, useState } from "react";
import cl from './_NavBarPTC.module.scss';
import { cls } from "@/shared/lib/classes.lib";
import { IIconVariants } from "@/shared/model/icon.model";
import { MENU_WEB_DATA } from "@/widgets/Menu/WEB";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ViewsNavBarPTC } from "../components/ViewsNavBarPTC";
import { useAppSelector } from "@/storage/hooks";
import { getPTCTextByNumber } from "../lib/text.ptc.lib";
import { SortModal } from "@/features/Modal/Sort/SortModal";
import { ECatalogVariants } from "@/widgets/SortFilterSidebar";
import { getPTCVariantByPathname, getPTCViewByPathname } from "../lib/link.ptc.lib";
import { CORE_PARAMS } from "@/config/params/core.params.config";
import SuspenseL from "@/shared/ui/Wrapper/SuspenseL/SuspenseL";

interface INavBarPTC {}

export const NavBarPTC: FC<INavBarPTC> = ({...rest}) => {
    return (
        <SuspenseL>
            <NavBarPTCChild {...rest}/>
        </SuspenseL>
    )
}


export const NavBarPTCChild: FC<INavBarPTC> = ({ }) => {
    // RTK
    const ptcState = useAppSelector(state => state.ptc);    
    
    // ROUTER
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const router = useRouter()

    //STATE
    const [filterView, setFilterView] = useState<ECatalogVariants>(getPTCViewByPathname(pathname));
    const [selectedoption, setselectedoption] = useState<IIconVariants>(getPTCVariantByPathname(pathname));

    //EFFECT
    useEffect(() => {
        setselectedoption(getPTCVariantByPathname(pathname))
    }, [pathname])
    

    // ON CLICK
    const handleOnClickMenuItem = (el: IIconVariants) => {
        if (el.link === undefined)
            return
        setselectedoption(el)
        setFilterView(getPTCViewByPathname(el.link))
        const categoryValue = searchParams.get(CORE_PARAMS.CATEGORY)
        let param = ""
        if (categoryValue !== null)
            param = `${CORE_PARAMS.CATEGORY}=${categoryValue}`
        router.push(`${el.link}?${param}`);
    }    

    return (
        <section className={cl.NavBarPTC}>
            <div className={cl.leftContainer}>
                <div className={cl.navBarPTCItemContainer}>
                    {MENU_WEB_DATA.map(el => (
                        <button onClick={() => handleOnClickMenuItem(el)} className={cl.navBarItem} key={el.link}>
                            <p className={cls(cl.switchItem, selectedoption?.link === el.link ? cl.selected : '')}>
                                {el.title}
                            </p>
                            <span className={cls(cl.switchItemBorderBottom, selectedoption?.link === el.link ? cl.selectedSpan : '')} />
                        </button>
                    ))}
                </div>
                <div className={cl.mobileSortContainer}>                    
                    <SortModal variant={filterView} />
                </div>
            </div>
            <div className={cl.rightContainer}>
                <p className={cl.resultNumber}>
                    {ptcState.amount} {getPTCTextByNumber(ptcState.amount, ptcState.view)}
                </p>
                {selectedoption &&
                    <ViewsNavBarPTC ptcLink={selectedoption.link} />
                }
                <SortModal variant={filterView} hasOutline={true} 
                           classNameModal={cl.sortModal} classNameButton={cl.sortButton} />
            </div>
        </section>
    );
};
