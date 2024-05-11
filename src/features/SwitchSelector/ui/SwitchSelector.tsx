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
    const [selectedLabelWidth, setSelectedLabelWidth] = useState<number>(0)
    const [unselectedLabelWidth, setUnselectedLabelWidth] = useState<number>(0)

    const gap: number = 25;

    //REF
    const selectedLabelRef = useRef<HTMLLabelElement>(null)
    const unselectedLabelRef = useRef<HTMLLabelElement>(null)

    //EFFECT
    useEffect(() => {
        if (options.length === 1) {
            if (selectedLabelRef.current) {
                setSelectedLabelWidth(selectedLabelRef.current.offsetWidth);
            }
        }
        else if (options.length > 1) {
            if (selectedLabelRef.current && unselectedLabelRef.current) {
                setSelectedLabelWidth(selectedLabelRef.current.offsetWidth);
                setUnselectedLabelWidth(unselectedLabelRef.current.offsetWidth)
            }
        }

    }, [options, selectedOption])

    useEffect(() => {
        document.documentElement.style.setProperty('--labelWidth', `${unselectedLabelWidth + gap}px`);
    }, [selectedLabelWidth]);


    const selectOption = (it: IOption) => setSelectedOption(it);



    return (
        <div className={cls(cl.SwitchSelector, className)} style={{ gap: `${gap}px` }}>
            {options.map(it => (
                <div className={cl.option}
                    key={it.id}>
                    <input
                        type="radio"
                        id={String(it.id)}
                        name={it.name}
                        checked={selectedOption.id === it.id}
                        onChange={() => selectOption(it)}
                    />
                    <label htmlFor={String(it.id)} ref={selectedOption.id === it.id ? selectedLabelRef : unselectedLabelRef}>
                        {it.name}
                    </label>
                </div>
            ))}
            <span
                className={cl.redLine}
                style={{ width: `${selectedLabelWidth}px`, left: `${selectedOption.id === 1 ? 0 : (unselectedLabelWidth + gap)}px` }}
            />
        </div>
    )
}
