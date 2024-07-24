'use client'

import { cls } from "@/shared/lib/classes.lib"
import cl from './_SwitchSelector.module.scss'
import { useCallback, useEffect, useRef, useState } from "react"
import { IOption } from "@/shared/model/option.model"
import { OptionsTabType } from "@/features/DetailedPageInfo/model/detailedPageInfo.model"
import Image from "next/image"
import { ESwitchSelectorVariants } from "../model/switchSelector.model"
import { useRouter } from "next/navigation"

interface ISwitchSelector {
    variant?: ESwitchSelectorVariants,
    className?: string,
    options: IOption[],
    selectedOption: IOption,
    setSelectedOption: Function
    optionsTab?: OptionsTabType
}

export const SwitchSelector = ({
    variant = ESwitchSelectorVariants.DEFAULT,
    className,
    options = [],
    selectedOption,
    setSelectedOption,
    optionsTab
}: ISwitchSelector) => {
    //STATE
    const [lineStyle, setLineStyle] = useState<{ width: number, left: number }>({ width: 0, left: 0 })
    const [isAtTop, setIsAtTop] = useState(false)

    //REF
    const switchSelectorRef = useRef<HTMLDivElement>(null)
    const selectedOptionRef = useRef<HTMLButtonElement>(null)

    //ROUTER
    const router = useRouter();

    //EFFECT
    useEffect(() => {
        if (selectedOptionRef.current && variant === ESwitchSelectorVariants.DEFAULT) {
            setLineStyle({
                width: selectedOptionRef.current.offsetWidth,
                left: selectedOptionRef.current.offsetLeft
            })
        }
    }, [options, selectedOption])

    useEffect(() => {
        const handleScroll = () => {
            if (switchSelectorRef.current) {
                const rect = switchSelectorRef.current.getBoundingClientRect()
                setIsAtTop(rect.top <= 0)
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])



    //FUNCTIONS
    const selectOption = (option: IOption) => {
        setSelectedOption(option);
        const element = document.getElementById('value' in option ? String(option.value) : '');
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        if (variant === ESwitchSelectorVariants.TABS) {
          options.length > 1 && router.push(`?type=${option.value}`)
        }
    }

    const isChecked = useCallback((selectOption: IOption, mapItem: IOption) => {
        return selectOption.id === mapItem.id;
    }, [selectedOption]);


    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    };

    return (
        <div className={cls(cl.SwitchSelector, cl[variant], isAtTop ? cl.sticky : '', className)} ref={switchSelectorRef}>
            <div className={cl.optionsContainer}>
                <div className={cl.leftContainer}>
                    {options.map(it => {
                        const optionValue = (it as IOption).value ?? '';

                        const optionQuantity = optionsTab && optionsTab[optionValue]?.optionQuantity

                        return (
                            <button className={cls(
                                cl.option,
                                options.length > 1 ? cl.optionHover : '',
                                isChecked(selectedOption, it) ? cl.choosen : '')}
                                ref={isChecked(selectedOption, it) ? selectedOptionRef : null}
                                key={it.id}
                                onClick={() => selectOption(it)}>
                                <input
                                    type="radio"
                                    id={String(it.id)}
                                    name={it.name}
                                    checked={isChecked(selectedOption, it)}
                                    onChange={() => { }} />
                                <label
                                    htmlFor={String(it.id)}>
                                    {it.name}
                                    {optionQuantity !== undefined && <span className={cl.optionQuantity}>{optionQuantity}</span>}
                                </label>
                            </button>
                        )
                    }
                    )}
                </div>
                {variant === ESwitchSelectorVariants.DEFAULT && <button className={cl.arrowUp} onClick={scrollToTop}>
                    <Image src={'/arrowUp.svg'} alt="" width={16} height={16} />
                </button>}
            </div>
            {variant === ESwitchSelectorVariants.DEFAULT && options.length > 1 && <span
                className={cls(cl.choosenLine, isAtTop ? cl.stickyChoosenLine : '')}
                style={{ width: `${lineStyle.width}px`, left: `${lineStyle.left}px` }}
            />}
        </div>
    )
}