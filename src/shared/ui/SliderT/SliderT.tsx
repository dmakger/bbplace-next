"use client"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_SliderT.module.scss'
import { List } from "../List/Default/List";
import { useEffect, useRef, useState } from 'react';
import { ISliderT } from '@/shared/model/sliderT.model';
import { Axis } from '@/shared/model/button.model';
import { ButtonArrowWLine } from '../Button/data/Arrow/WLine/ButtonArrowWLine';
import { ListDirection } from '@/shared/data/list.data';

interface SliderTProps<T> extends ISliderT<T> {
}

export const SliderT = <T extends any> ({
    slideWidth: slideWidthOut,
    classNameWrapper,
    className,

    items,
    direction=ListDirection.Row,
    gap=0,
    ...rest
}: SliderTProps<T>) => {

    // REF
    const sliderRef = useRef<HTMLDivElement>(null);

    // STATE
    const [slideWidth, setSlideWidth] = useState(0)
    const [sliderWidth, setSliderWidth] = useState(0)

    // EFFECT
    // slider width
    useEffect(() => {
        const handleResize = () => {
            if (sliderRef.current) {
                setSliderWidth(sliderRef.current.offsetWidth);
            }
        };

        const resizeObserver = new ResizeObserver(handleResize);
        if (sliderRef.current) {
            resizeObserver.observe(sliderRef.current);
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (sliderRef.current) {
                resizeObserver.unobserve(sliderRef.current);
            }
        };
    }, [sliderRef]);

    // slide width
    useEffect(() => {
        setSlideWidth(() => {
            return slideWidthOut === undefined ? sliderWidth / items.length - gap : slideWidthOut
        })
    }, [slideWidthOut, sliderWidth, gap])


    // HANDLE
    const onPrev = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollLeft -= slideWidth;
        }
    };
    
    const onNext = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollLeft += slideWidth;
        }
    };

    if (sliderRef.current)
        console.log('qwe slider', sliderRef.current.scrollLeft)

    return (
        <div ref={sliderRef} className={cls(cl.slider, classNameWrapper)}>
            <ButtonArrowWLine axis={Axis.Right} onClick={onPrev} className={cl.prevButton} />
            <List items={items} direction={direction} className={cls(cl.slideContainer, className)} {...rest}/>
            <ButtonArrowWLine axis={Axis.Left} onClick={onNext} className={cl.nextButton} />
        </div>
    )
}
