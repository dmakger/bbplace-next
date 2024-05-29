'use client'

import { cls } from "@/shared/lib/classes.lib"
import cl from './_SwitchSelector.module.scss'
import { useCallback, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { IOption } from "@/shared/model/option.model"
import { IOptionsTab } from "@/features/DetailedPageInfo/model/detailedPageInfo.model"
import { IMenuItem } from "@/shared/model/menu.model"
import Image from "next/image"

interface ISwitchSelector {
    className?: string,
    options: IOption[] | IMenuItem[],
    selectedOption: IOption | IMenuItem,
    setSelectedOption: Function
    optionsTab: IOptionsTab
}

export const SwitchSelector = ({
    className,
    options,
    selectedOption,
    setSelectedOption,
    optionsTab
}: ISwitchSelector) => {
    //STATE
    const [lineStyle, setLineStyle] = useState<{ width: number, left: number }>({ width: 0, left: 0 })

    //REF
    const switchSelectorRef = useRef<HTMLDivElement>(null)
    const selectedOptionRef = useRef<HTMLButtonElement>(null)

    //EFFECT
    useEffect(() => {
        if (selectedOptionRef.current) {
            setLineStyle({
                width: selectedOptionRef.current.offsetWidth,
                left: selectedOptionRef.current.offsetLeft
            })
        }
    }, [options, selectedOption])

    //FUNCTIONS
    const selectOption = (option: IOption | IMenuItem) => {
        setSelectedOption(option);
        const element = document.getElementById('value' in option ? String(option.value) : '');
        if (element)
            element.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    const isChecked = useCallback((selectOption: IOption | IMenuItem, mapItem: IOption | IMenuItem) => {
        return selectOption.id === mapItem.id;
    }, [selectedOption]);

    const scrollToTop = () => {
   
        window.scrollTo({top: 0, behavior: 'smooth'})   
     
    };
    

    return (
        <div className={cls(cl.SwitchSelector, className)} ref={switchSelectorRef}>
            <div className={cl.optionsTabContainer}>
                <div className={cl.leftContainer}>
                    {options.map(it => {
                        const optionValue = (it as IOption).value ?? '';

                        const isLink = 'link' in it;
                        const optionQuantity = optionsTab[optionValue]?.optionQuantity

                        const html = (
                            <button className={cls(cl.option, options.length > 1 ? cl.optionHover : '', isChecked(selectedOption, it) ? cl.choosen : '')}
                                ref={isChecked(selectedOption, it) ? selectedOptionRef : null}
                                key={it.id}
                                onClick={() => selectOption(it)}>
                                <input
                                    type="radio"
                                    id={String(it.id)}
                                    name={isLink ? it.title : it.name}
                                    checked={isChecked(selectedOption, it)}
                                    onChange={() => { }} />
                                <label
                                    htmlFor={String(it.id)}>
                                    {isLink ? it.title : it.name}
                                    {optionQuantity && <span className={cl.optionQuantity}>{optionQuantity}</span>}
                                </label>
                            </button>
                        )

                        if (!isLink) return html;

                        return <Link href={it.link ?? ''}>{html}</Link>
                    }
                    )}
                </div>
                <button className={cl.arrowUp} onClick={scrollToTop}>
                    <Image src={'/arrowUp.svg'} alt="" width={16} height={16} />
                </button>
            </div>
            {options.length > 1 && <span
                className={cl.choosenLine}
                style={{ width: `${lineStyle.width}px`, left: `${lineStyle.left}px` }}
            />}
        </div>
    )
}