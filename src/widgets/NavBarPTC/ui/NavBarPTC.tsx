'use client'

import { FC, useState } from "react";
import cl from './_NavBarPTC.module.scss';
import { INavBarPTCOptions, IIconVariants, NavBarPTCOptions, viewVariants, sortVariant, mobileSortIcon } from "../model/navBarPTC.data";
import { DefaultIcon } from "@/shared/ui/Icons";

interface INavBarPTC {

}

export const NavBarPTC: FC<INavBarPTC> = ({}) => {

    //STATE
    const [selectedOption, setSelectedOption] = useState<INavBarPTCOptions | null>(NavBarPTCOptions[0]);

    const [selectedView, setSelectedView] = useState<IIconVariants>(viewVariants[0])
        

    return (
        <section className={cl.NavBarPTC}>
            <div className={cl.leftContainer}>
                <div className={cl.navBarPTCItemContainer}>
                    {NavBarPTCOptions.map(el => (
                        <div key={el.id} className={cl.navBarItem}>
                            <p
                                className={`${cl.switchItem} ${selectedOption?.id === el.id ? cl.selected : ''}`}
                                onClick={() => setSelectedOption(el)}>
                                {el.name}
                            </p>
                            <span className={`${cl.switchItemBorderBottom} ${selectedOption?.id === el.id ? cl.selectedSpan : ''}`} />
                        </div>
                    ))}
                </div>
                <div className={cl.mobileSortContainer}>
                    <DefaultIcon image={mobileSortIcon.image} onClick={() => {}}/>
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
                            image={el.image}
                            onClick={() => setSelectedView(el)} />
                    ))}
                </div>
                <DefaultIcon className="sortButton" image={sortVariant.image} onClick={() => {}}/>
            </div>
        </section>
    );
};
