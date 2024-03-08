'use client'

import { FC, useState } from "react";
import cl from './_NavBarPTC.module.scss';
import { INavBarPTCOptions, NavBarPTCOptions } from "../model/navBarPTC.data";

interface INavBarPTC {

}

export const NavBarPTC: FC<INavBarPTC> = ({}) => {

    const [selectedOption, setSelectedOption] = useState<INavBarPTCOptions | null>(null);

    return (
        <section className={cl.NavBarPTC}>
            <div className={cl.leftContainer}>
                {NavBarPTCOptions.map(el => (
                    <p
                        key={el.id}
                        className={`${cl.switchItem} ${selectedOption?.id === el.id ? cl.selected : ''}`}
                        onClick={() => setSelectedOption(el)}>
                        {el.name}
                    </p>
                ))}
            </div>
            <div className={cl.rightContainer}>
                <p className={cl.resultNumber}>
                    125 результатов в товарах
                </p>
                <div className={cl.iconsContainer}>
                    <button className={cl.sortButton}>
                        <svg className={cl.icon} width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 1.99997H19.0007" stroke="#28252E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M11 6H16.0004" stroke="#28252E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M11 12H19.0007" stroke="#28252E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M11 16H16.0004" stroke="#28252E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M1 2C1 1.73479 1.10537 1.48043 1.29292 1.29289C1.48047 1.10536 1.73485 1 2.00009 1H6.00043C6.26567 1 6.52005 1.10536 6.7076 1.29289C6.89515 1.48043 7.00052 1.73479 7.00052 2V6.00001C7.00052 6.26523 6.89515 6.51958 6.7076 6.70712C6.52005 6.89466 6.26567 7.00002 6.00043 7.00002H2.00009C1.73485 7.00002 1.48047 6.89466 1.29292 6.70712C1.10537 6.51958 1 6.26523 1 6.00001V2Z" stroke="#28252E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M1 12C1 11.7348 1.10537 11.4804 1.29292 11.2929C1.48047 11.1054 1.73485 11 2.00009 11H6.00043C6.26567 11 6.52005 11.1054 6.7076 11.2929C6.89515 11.4804 7.00052 11.7348 7.00052 12V16C7.00052 16.2652 6.89515 16.5196 6.7076 16.7071C6.52005 16.8947 6.26567 17 6.00043 17H2.00009C1.73485 17 1.48047 16.8947 1.29292 16.7071C1.10537 16.5196 1 16.2652 1 16V12Z" stroke="#28252E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <button className={cl.sortButton}>
                        <svg className={cl.icon} width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1H7V7H1V1Z" stroke="#28252E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M11 1H17V7H11V1Z" stroke="#28252E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M1 11H7V17H1V11Z" stroke="#28252E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M10.7773 11H16.7773V17H10.7773V11Z" stroke="#28252E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
};
