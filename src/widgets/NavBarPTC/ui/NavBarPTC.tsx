'use client'

import { FC, useState } from "react";
import cl from './_NavBarPTC.module.scss';
import { IIconVariants } from "../model/model";
import { DefaultIcon } from "@/shared/ui/Icon";
import { HORIZONTAL_VIEW, SORT_ICON, SORT_MOBILE_ICON, viewVariants } from "../data/navBarPTC.data";
import { cls } from "@/shared/lib/classes.data";
import { MENU_DATA, PRODUCTS_ITEM_MENU_DATA } from "@/shared/data/menu/base.menu.data";
import { IMenuItem } from "@/shared/model/menu.model";

interface INavBarPTC {

}

export const NavBarPTC: FC<INavBarPTC> = ({ }) => {

    //STATE
    const [selectedOption, setSelectedOption] = useState<IMenuItem>(PRODUCTS_ITEM_MENU_DATA);

    const [selectedView, setSelectedView] = useState<IIconVariants>(HORIZONTAL_VIEW)

    return (
        <section className={cl.NavBarPTC}>
            <div className={cl.leftContainer}>
                <div className={cl.navBarPTCItemContainer}>
                    {MENU_DATA.map(el => (
                        <button key={el.link} className={cl.navBarItem}>
                            <p
                                className={cls(cl.switchItem, selectedOption?.link === el.link ? cl.selected : '')}
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
