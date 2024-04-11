'use client'

import { FC, useState } from "react";
import cl from './_NavBarPTC.module.scss';
import { DefaultIcon } from "@/shared/ui/Icon";
import { SORT_ICON, SORT_MOBILE_ICON, viewVariants } from "../data/navBarPTC.data";
import { HORIZONTAL_VIEW } from "@/shared/data/menu/base.menu.data";
import { IIconVariants } from "@/shared/model/icon.model";
import { MENU_WEB_DATA, PRODUCTS_ITEM_MENU_WEB_DATA } from "@/widgets/Menu/WEB";
import { useAppSelector } from "@/storage/hooks";
import { NavBarPTCItem } from "./NavBarPTCItem/NavBarPTCItem";

interface INavBarPTC {

}

export const NavBarPTC: FC<INavBarPTC> = ({ }) => {

    //STATE
    const [selectedOption, setSelectedOption] = useState<IIconVariants>(PRODUCTS_ITEM_MENU_WEB_DATA);

    const [selectedView, setSelectedView] = useState<IIconVariants>(HORIZONTAL_VIEW)

    const language = useAppSelector(state => state.translate.language)


    return (
        <section className={cl.NavBarPTC}>
            <div className={cl.leftContainer}>
                <div className={cl.navBarPTCItemContainer}>
                    {MENU_WEB_DATA.map(el => (
                        <NavBarPTCItem link={el.link} selectedOption={selectedOption} title={el.title} language={language} onClick={() => setSelectedOption(el)} />
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
