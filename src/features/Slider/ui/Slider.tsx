import { useCallback, useEffect, useRef, useState } from "react";

import { cls } from '@/shared/lib/classes.lib';
import cl from './_Slider.module.scss';
import { ARROW_WO_ICON } from "@/shared/ui/Icon/data/arrow.data.icon";
import { Axis } from "@/shared/model/button.model";
import { ISlider } from "../model/slider.model";
import { Button } from "@/shared/ui/Button";
import { ButtonArrowWLine } from "@/shared/ui/Button/Arrow/WLine/ButtonArrowWLine";

interface SliderProps<T> extends ISlider {
    slides?: T[];
    style?: object;
    component: React.FC<{
        slide: T,
        className?: string,
        style?: object,
        setTypeOfFile?: Function
    }>;
    setTypeOfFile?: Function;
}

export const Slider = <T extends (object | string)>({
    slides = [], amount = 3, limit = 10, setLimit,
    activeIndex, setActiveIndex = () => { },
    component: SlideComponent,
    className, classNameSlides, style, slideProps,
    setTypeOfFile
}: SliderProps<T>) => {
    // STATE
    const [startIndex, setStartIndex] = useState(0);
    const [translateX, setTranslateX] = useState(0);

    // Получение текущей ширины блока
    const [slidesWidth, setSlidesWidth] = useState(0);
    const slidesRef = useRef<HTMLDivElement>(null);

    const getWidthSlide = useCallback(() => {
        return slidesWidth / amount - 10;
    }, [slidesWidth]);

    // EFFECT
    useEffect(() => {
        const handleResize = () => {
            if (slidesRef.current) {
                console.log('nua', slidesRef.current.offsetWidth)
                setSlidesWidth(slidesRef.current.offsetWidth);
            }
        };

        const resizeObserver = new ResizeObserver(handleResize);
        if (slidesRef.current) {
            resizeObserver.observe(slidesRef.current);
        }

        window.addEventListener('resize', handleResize);
        
        return () => {
            window.removeEventListener('resize', handleResize);
            if (slidesRef.current) {
                resizeObserver.unobserve(slidesRef.current);
            }
        };
    }, [slidesRef]);

    useEffect(() => {
        if (activeIndex !== undefined) {
            setStartIndex(activeIndex);
            setTranslateX(-activeIndex * (slidesWidth / amount) - activeIndex * 10);
        }
    }, [activeIndex, slidesWidth, amount]);

    // НАВИГАЦИЯ СЛАЙДЕРА
    const nextSlide = () => {
        let newStartIndex = startIndex + 1;
        if (setLimit && newStartIndex + 5 > limit) {
            setLimit(limit * 10);
        }
        setStartIndex(newStartIndex);
        setTranslateX(translateX - slidesWidth / amount);
        setActiveIndex(newStartIndex);
    };

    const prevSlide = () => {
        const newIndex = Math.max(startIndex - 1, 0);
        setStartIndex(newIndex);
        setTranslateX(translateX + slidesWidth / amount);
        setActiveIndex(newIndex);
    };

    return (
        <div style={style} className={cls(cl.slider, className)} ref={slidesRef}>
            {startIndex > 0 &&
                <ButtonArrowWLine axis={Axis.Right} onClick={prevSlide} className={cl.prevButton} />
            }

            <div className={cls(cl.slideContainer)} style={{ transform: `translateX(${translateX}px)` }}>
                {slides.map((slide, index) => (
                    <SlideComponent {...slideProps} slide={slide}
                        setTypeOfFile={setTypeOfFile}
                        style={{ width: `${getWidthSlide()}px` }}
                        className={classNameSlides} key={index} />
                ))}
            </div>

            {startIndex < slides.length - amount &&
                <ButtonArrowWLine axis={Axis.Left} onClick={nextSlide} className={cl.nextButton} />
            }
        </div>
    );
};
