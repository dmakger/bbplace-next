"use client"


import { FC, useEffect, useRef, useState } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_Slider.module.scss'
import { ButtonArrow } from "@/shared/ui/Button/Arrow/ButtonArrow";

interface SliderProps<T> {
    slides?: T[];
    amount: number;
    limit?: number;
    setNewLimit?: Function;
    className?: string
    classNameSlides?: string
    component: React.FC<{
        slide: T,
        className?: string,
        style?: object,
    setTypeOfFile?: Function
    }>;
    setTypeOfFile?: Function
    
}

export const Slider = <T extends (object | string)>({
    slides=[], amount = 3, limit = 10, setNewLimit,
    component: SlideComponent, className, classNameSlides, setTypeOfFile
}: SliderProps<T>) => {
    const [startIndex, setStartIndex] = useState(0);
    const [translateX, setTranslateX] = useState(0);

    // Получение текущей ширины блока
    const [slidesWidth, setSlidesWidth] = useState(0);
    const slidesRef = useRef<HTMLDivElement>(null);
    const getWidthSlide = () => {
        return slidesWidth / amount - 10
    }
    useEffect(() => {
        if (slidesRef.current) {
            setSlidesWidth(slidesRef.current.offsetWidth);
        }
    }, []);
    useEffect(() => {
        if (slidesRef.current) {
            setSlidesWidth(slidesRef.current.offsetWidth);
        }
    }, []);

    // НАВИГАЦИЯ СЛАЙДЕРА
    const nextSlide = () => {
        let newStartIndex = startIndex + 1;
        if (setNewLimit && newStartIndex + 5 > limit) {
            setNewLimit(limit * 10);
        }
        setStartIndex(newStartIndex);
        setTranslateX(translateX - slidesWidth / amount);
    };

    const prevSlide = () => {
        const newIndex = Math.max(startIndex - 1, 0)
        setStartIndex(newIndex);
        setTranslateX(translateX + slidesWidth / amount);
    };

    return (
        <div className={cls(cl.slider, className)} ref={slidesRef}>
            {startIndex > 0 &&
                <ButtonArrow onClick={prevSlide} className={cl.prevButton}/>
                // <button className={cl.prevButton} onClick={prevSlide}>
                //     <HandySvg className={cl.svg} src={chevron}/>
                // </button>
            }

            <div className={cls(cl.slideContainer)} style={{transform: `translateX(${translateX}px)`}}>
                {slides.map((slide, index) => (
                    <SlideComponent className={classNameSlides} key={index} slide={slide} style={{ width: `${getWidthSlide()}px` }} setTypeOfFile={setTypeOfFile}/>
                ))}
            </div>

            {startIndex < slides.length - amount &&
                <ButtonArrow onClick={nextSlide} className={cl.nextButton} />
                // <button className={cl.nextButton} onClick={nextSlide}>
                //     <HandySvg className={cl.svg} src={chevron}/>
                // </button>
            }
        </div>
    );

}
