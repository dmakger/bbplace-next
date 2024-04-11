"use client"

import { FC, useEffect, useState } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_Pagination.module.scss'
import { PaginationItem } from "../components/Item/PaginationItem";
import { PaginationArrow } from "../components/arrow/PaginationArrow";

interface PaginationProps{
    amount: number
    active: number
    amountContent?: number
    onClick?: Function
    className?: string,
}

export const Pagination:FC<PaginationProps> = ({amount, active, amountContent=9, onClick, className}) => {
    // STATE
    const [current, setCurrent] = useState(1)
    const [numbers, setNumbers] = useState<number[]>([1])

    // EFFECT
    useEffect(() => {
        if (current === active)
            return
        
        setCurrent(active)
    }, [active])

    useEffect(() => {
        setNumbers(() => {
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
            

            return Array.from({ length: end - start + 1 }, (_, index) => start + index);
        })
    }, [current])

    // ON CLICK
    const handleOnClick = (newNumber: number) => {
        setCurrent(newNumber)
        if (onClick)
            onClick(newNumber)
    }

    return (
        <div className={cls(cl.block, className)}>
            <PaginationArrow disabled={numbers[0] === 1} 
                             onClick={() => handleOnClick(current-1)} classNameImage={cl.arrowLeft}/>
            {numbers[0] !== 1 && (
                <>
                    <PaginationItem text={1} onClick={() => handleOnClick(1)} />
                    <PaginationItem text={'...'} disabled={true}/>
                </>
            )}
            {numbers.map(n => (
                <PaginationItem text={n} isActive={n === current} onClick={() => handleOnClick(n)} />
            ))}
            {numbers[numbers.length - 1] !== amount && (
                <>
                    <PaginationItem text={'...'} disabled={true}/>
                    <PaginationItem text={amount} onClick={() => handleOnClick(amount)}/>
                </>
            )}
            <PaginationArrow disabled={numbers[numbers.length-1] === amount} 
                             onClick={() => handleOnClick(current+1)} />
        </div>
    )
}
