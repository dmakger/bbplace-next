'use client'

import { FC, useState } from "react";
import cl from './_NavBarPTC.module.scss';
import { DefaultIcon } from "@/shared/ui/Icon";
import { SORT_ICON, SORT_MOBILE_ICON, viewVariants } from "../data/navBarPTC.data";
import { cls } from "@/shared/lib/classes.lib";
import { HORIZONTAL_VIEW } from "@/shared/data/menu/base.menu.data";
import { IIconVariants } from "@/shared/model/icon.model";
import { MENU_WEB_DATA, PRODUCTS_ITEM_MENU_WEB_DATA } from "@/widgets/Menu/WEB";
import { useSearchParams } from "next/navigation";
import { EViewProductParams, VIEW_PRODUCT__KEY_PARAM } from "@/entities/Product/data/params.product.data";
import { getViewProductByParam } from "@/entities/Product/lib/params.product.lib";

interface INavBarPTC {}

export const NavBarPTC: FC<INavBarPTC> = ({ }) => {
    // ROUTER
    const searchParams = useSearchParams()
    const productView = searchParams.get(VIEW_PRODUCT__KEY_PARAM) as EViewProductParams
    const viewPTCItem = getViewProductByParam(productView)

    //STATE
    const [selectedOption, setSelectedOption] = useState<IIconVariants>(PRODUCTS_ITEM_MENU_WEB_DATA);
    const [selectedView, setSelectedView] = useState<IIconVariants>(HORIZONTAL_VIEW)

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
                    <DefaultIcon className={cl.mobileSortButton} onClick={() => { }}>
                        {SORT_MOBILE_ICON.image}
                    </DefaultIcon>
                </div>
            </div>
            <div className={cl.rightContainer}>
                <p className={cl.resultNumber}>
                    125 результатов <span>в товарах</span>
                </p>
                <div className={cl.viewIconsContainer}>
                    {viewVariants.map(el => (
                        <DefaultIcon key={el.id}
                            className='viewButton'
                            classNameSelected='selectedView'
                            isSelected={selectedView.id === el.id}
                            onClick={() => setSelectedView(el)}>
                            {el.image}
                        </DefaultIcon>
                    ))}
                </div>
                <DefaultIcon className="sortButton" onClick={() => { }}>
                    {SORT_ICON.image}
                </DefaultIcon>
            </div>
        </section>
    );
};
