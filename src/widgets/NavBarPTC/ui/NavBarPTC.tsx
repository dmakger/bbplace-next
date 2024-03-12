'use client'

import { FC, useState } from "react";
import cl from './_NavBarPTC.module.scss';
import { INavBarPTCOptions, IIconVariants } from "../model/model";
import { DefaultIcon } from "@/shared/ui/Icon";
import { cls } from "@/lib/classes";
import { HORIZONTAL_VIEW, ITEMS, NavBarPTCOptions, SORT_ICON, SORT_MOBILE_ICON, viewVariants } from "../data/navBarPTC.data";

interface INavBarPTC {

}

export const NavBarPTC: FC<INavBarPTC> = ({ }) => {

    //STATE
    const [selectedOption, setSelectedOption] = useState<INavBarPTCOptions | null>(ITEMS);

    const [selectedView, setSelectedView] = useState<IIconVariants>(HORIZONTAL_VIEW)

    return (
        <section className={cl.NavBarPTC}>
            <div className={cl.leftContainer}>
                <div className={cl.navBarPTCItemContainer}>
                    {NavBarPTCOptions.map(el => (
                        <div key={el.id} className={cl.navBarItem}>
                            <p
                                className={cls(cl.switchItem, selectedOption?.id === el.id ? cl.selected : '')}
                                onClick={() => setSelectedOption(el)}>
                                {el.name}
                            </p>
                            <span className={cls(cl.switchItemBorderBottom, selectedOption?.id === el.id ? cl.selectedSpan : '')} />
                        </div>
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
