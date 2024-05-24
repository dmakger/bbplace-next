'use client'

import { cls } from "@/shared/lib/classes.lib"
import cl from './_SwitchSelector.module.scss'
import { useCallback, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { IOption } from "@/shared/model/option.model"
import { IIconVariants } from "@/shared/model/icon.model"
import { IOptionsTab } from "@/features/DetailedPageInfo/model/detailedPageInfo.model"

interface ISwitchSelector {
    className?: string,
    options: IOption[] | IIconVariants[],
    selectedOption: IOption | IIconVariants,
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
    const selectOption = useCallback((option:  IOption | IIconVariants) => {
        setSelectedOption(option);
    }, [setSelectedOption]);

    const isChecked = useCallback((selectOption: IOption | IIconVariants, mapItem:  IOption | IIconVariants) => {
        return selectOption.id === mapItem.id;
    }, [selectedOption]);

    return (
        <div className={cls(cl.SwitchSelector, className)}>
            {options.map(it => {
                const optionValue = (it as IOption).value ?? '';

                const isLink = 'image' in it;
                const optionQuantity = optionsTab[optionValue].optionQuantity

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
            {options.length > 1 && <span
                className={cl.choosenLine}
                style={{ width: `${lineStyle.width}px`, left: `${lineStyle.left}px` }}
            />}
        </div>
    )
}
