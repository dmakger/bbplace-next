"use client"

import { FC, useEffect, useRef, useState } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_Pagination.module.scss'
import { PaginationItem } from "../components/Item/PaginationItem";
import { PaginationArrow } from "../components/arrow/PaginationArrow";
import { HandleSize } from "@/shared/ui/Handle/Size/HandleSize";

interface PaginationProps{
    amount: number
    active: number
    amountContent?: number
    onClickItem?: Function
    className?: string,
}

export const Pagination:FC<PaginationProps> = ({amount, active, amountContent=9, onClickItem, className}) => {
    // STATE
    const [current, setCurrent] = useState(1)
    const [numbers, setNumbers] = useState<number[]>([1])
    const [is600, setIs600] = useState(false)

    // REF
    const numbersRef = useRef<HTMLDivElement>(null);

    // EFFECT
    useEffect(() => {
        if (current === active)
            return
        
        setCurrent(active)
    }, [active])

    useEffect(() => {
        setNumbers(() => {
            if (is600)
                return Array.from({ length: amount }, (_, index) => index+1);
            let start = current - Math.floor(amountContent / 2);
            if (start < 1)
                start = 1

            let end = start + amountContent - 1;
            if (end > amount) {
                end = amount;
                start = end - amountContent + 1;
                if (start < 1) 
                    start = 1; 
            }
            if (start === 1)
                end = end + 2 > amount ? amount : end + 2
            if (end === amount)
                start = start < 3 ? 1 : start-2

            return Array.from({ length: end - start + 1 }, (_, index) => start + index);
        })
    }, [is600, current, amountContent])

    useEffect(() => {
        let _current = current < 3 ? current : current-2
        if (is600 && numbersRef.current && numbersRef.current.children[_current - 1]) {
            numbersRef.current.children[_current - 1].scrollIntoView({ block: 'nearest', inline: 'start' });
        }
    }, [current, is600, numbers, numbersRef]);

    // ON CLICK
    const handleOnClick = (newNumber: number) => {
        setCurrent(newNumber)
        if (onClickItem)
            onClickItem(newNumber)
    }

    return (
        <>
            <div className={cls(cl.block, className)}>
                <PaginationArrow disabled={numbers[0] === 1 && !is600} 
                                onClick={() => handleOnClick(current-1)} classNameImage={cls(cl.arrowLeft, cl.button)}/>
                {numbers[0] !== 1 && !is600 && (
                    <>
                        <PaginationItem text={1} onClick={() => handleOnClick(1)} />
                        <PaginationItem text={'...'} disabled={true}/>
                    </>
                )}
                <div ref={numbersRef} className={cl.numbers}>
                    {numbers.map(n => (
                        <PaginationItem text={n} isActive={n === current} onClick={() => handleOnClick(n)} classNameContent={cl.button}/>
                    ))}
                </div>
                {numbers[numbers.length - 1] !== amount && !is600 && (
                    <>
                        <PaginationItem text={'...'} disabled={true}/>
                        <PaginationItem text={amount} onClick={() => handleOnClick(amount)}/>
                    </>
                )}
                <PaginationArrow disabled={numbers[numbers.length-1] === amount && !is600} 
                                onClick={() => handleOnClick(current+1)} className={cl.button} />
            </div>
            <HandleSize width={600} set={setIs600}/>
        </>
    )
}
