"use client";

import { cls } from '@/shared/lib/classes.lib';
import cl from './_SliderT.module.scss'
import { List } from "../List/Default/List";
import { useEffect, useRef, useState } from 'react';
import { ISliderT } from '@/shared/model/sliderT.model';
import { Axis } from '@/shared/model/button.model';
import { ButtonArrowWLine } from '../Button/data/Arrow/WLine/ButtonArrowWLine';
import { ListDirection } from '@/shared/data/list.data';
import { SliderPagingVariant } from '@/shared/data/sliderT.data';
import { GalleryCounter } from '../GalleryCounter';

interface SliderTProps<T> extends ISliderT<T> {}

/**
 * Если `pagingVariant`:  
 * 1. `SliderPagingVariant.Full` - перелистование на всю страницу  
 * 2. `SliderPagingVariant.Amount` - перелистование по `pagingAmount`
 * 
 * `isFull = true`, то `item` заполняет всю область, если нет, то по ширине блока
 */
export const SliderT = <T extends any>({
    pagingVariant = SliderPagingVariant.Amount,
    pagingAmount = 1,
    slideWidth: slideWidthOut,
    isFull = false,
    classNameWrapper,
    className,
    classNameItem,

    hasGalleryCounter = false,

    items,
    direction = ListDirection.Row,
    activeIndex = 0,
    setActiveIndex=()=>{},
    gap = 0,
    ...rest
}: SliderTProps<T>) => {

    // REFS
    const sliderRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    // STATE
    const [slideSize, setSlideSize] = useState(0);
    const [sliderSize, setSliderSize] = useState(0);
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(activeIndex);

    useEffect(() => {
        setActiveIndex(currentIndex)
    }, [currentIndex, setActiveIndex])

    useEffect(() => {
        setCurrentIndex(prevIndex => {
            return prevIndex === activeIndex ? prevIndex : activeIndex
        })
    }, [activeIndex])

    // EFFECT
    // Calculate sizes on resize and mount
    useEffect(() => {
        const handleResize = () => {
            let offsetSize = sliderRef.current?.offsetWidth || 0;
            let scrollSize = listRef.current?.scrollWidth || 0;
            
            if (direction === ListDirection.Column) {
                offsetSize = sliderRef.current?.offsetHeight || 0;
                scrollSize = listRef.current?.scrollHeight || 0;
            }

            setSliderSize(offsetSize);

            if (isFull) {
                setSlideSize(offsetSize); // ширина слайда = ширина контейнера
            } else {
                const calculatedSlideWidth = (scrollSize - gap * (items.length - 1)) / items.length;
                setSlideSize(slideWidthOut || calculatedSlideWidth);
            }
        };
    
        handleResize();

        const resizeObserver = new ResizeObserver(handleResize);
        if (sliderRef.current) {
            resizeObserver.observe(sliderRef.current);
        }
        if (listRef.current) {
            resizeObserver.observe(listRef.current);
        }

        window.addEventListener('resize', handleResize);
    
        return () => {
            window.removeEventListener('resize', handleResize);
            if (sliderRef.current) {
                resizeObserver.unobserve(sliderRef.current);
            }
            if (listRef.current) {
                resizeObserver.unobserve(listRef.current);
            }
        };
    }, [sliderRef, listRef, slideWidthOut, gap, items.length, direction, isFull]);

    // Sync scroll position with activeIndex
    useEffect(() => {
        if (!sliderRef.current || !listRef.current) return;

        const newScrollPosition = currentIndex * (slideSize + gap);

        if (direction === ListDirection.Row) {
            sliderRef.current.scrollLeft = newScrollPosition;
        } else {
            sliderRef.current.scrollTop = newScrollPosition;
        }
    }, [currentIndex, slideSize, gap, direction]);

    // Update scroll state
    useEffect(() => {
        const updateScrollState = () => {
            if (!sliderRef.current) return;

            let scrollSize = sliderRef.current.scrollWidth;
            let clientSize = sliderRef.current.clientWidth;
            let scrollPosition = sliderRef.current.scrollLeft;

            if (direction === ListDirection.Column) {
                scrollSize = sliderRef.current.scrollHeight;
                clientSize = sliderRef.current.clientHeight;
                scrollPosition = sliderRef.current.scrollTop;
            }

            const maxScroll = scrollSize - clientSize;
            setCanScrollPrev(scrollPosition > 0);
            setCanScrollNext(scrollPosition < maxScroll);
        };

        updateScrollState();

        const handleScroll = () => {
            updateScrollState();
        };

        sliderRef.current?.addEventListener('scroll', handleScroll);

        return () => {
            sliderRef.current?.removeEventListener('scroll', handleScroll);
        };
    }, [sliderSize, slideSize, gap, items.length, direction]);

    // NAVIGATION
    const onPrev = () => {
        setCurrentIndex(prev => Math.max(0, prev-1))
    };

    const onNext = () => {
        setCurrentIndex(prev => Math.min(items.length-1, prev+1))
    };

    return (
        <div className={cls(cl.sliderWrapper, cl[direction], isFull ? cl.fullWidth : cl.normalWidth, classNameWrapper)}>
            <ButtonArrowWLine 
                isSecondary={false} direction={direction}
                axis={direction === ListDirection.Row ? Axis.Bottom : Axis.Left}
                onClick={onPrev} sizes={{ width: 20, height: 20 }}
                className={cls(cl.prevButton, canScrollPrev ? cl.visible : '')} />
            <div ref={sliderRef} className={cls(cl.slider)}>
                <List listRef={listRef} items={items} direction={direction}
                      activeIndex={currentIndex}
                      gap={gap}
                      className={cls(cl.slideContainer, className)}
                      classNameItem={cls(cl.slide, classNameItem)}
                      {...rest} />
            </div>
            {hasGalleryCounter && items.length > 1 && <GalleryCounter activeIndex={currentIndex} listLength={items.length}/>}
            
            <ButtonArrowWLine 
                isSecondary={false} direction={direction}
                axis={direction === ListDirection.Row ? Axis.Top : Axis.Right} 
                onClick={onNext} sizes={{ width: 20, height: 20 }}
                className={cls(cl.nextButton, canScrollNext ? cl.visible : '')} />
        </div>
    );
}
