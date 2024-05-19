'use client'

import { cls } from "@/shared/lib/classes.lib"
import cl from './_SwitchSelector.module.scss'
import { IOption } from "@/shared/model/option.model"
import { useEffect, useRef, useState } from "react"

interface ISwitchSelector {
    className?: string,
    options: IOption[],
    selectedOption: IOption,
    setSelectedOption: Function
}

export const SwitchSelector = ({
    className,
    options,
    selectedOption,
    setSelectedOption
}: ISwitchSelector) => {
    //STATE
    const [lineStyle, setLineStyle] = useState<{ width: number, left: number }>({ width: 0, left: 0 })

    //REF
    const selectedOptionRef = useRef<HTMLDivElement>(null)

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
    const selectOption = (it: IOption) => setSelectedOption(it);
    const isChecked = (selectOption: IOption, it: IOption) => selectOption.id === it.id;

    return (
        <div className={cls(cl.SwitchSelector, className)}>
                {options.map(it => (
                    <div className={cls(cl.option, isChecked(selectedOption, it) ? cl.choosen : '')}
                        ref={isChecked(selectedOption, it) ? selectedOptionRef : null}
                        key={it.id}
                        onClick={() => selectOption(it)}>
                        <input
                            type="radio"
                            id={String(it.id)}
                            name={it.name}
                            checked={isChecked(selectedOption, it)}
                            onChange={() => {}}/>
                        <label
                            htmlFor={String(it.id)}>
                            {it.name}
                        </label>
                    </div>
                ))}
            <span
                className={cl.choosenLine}
                style={{ width: `${lineStyle.width}px`, left: `${lineStyle.left}px` }}
            />
        </div>
    )
}
