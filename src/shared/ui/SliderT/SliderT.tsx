"use client"

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
    gap = 0,
    ...rest
}: SliderTProps<T>) => {

    // REFS
    const sliderRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    // STATE
    const [slideSize, setSlideSize] = useState(0)
    const [sliderSize, setSliderSize] = useState(0)
    const [pagingWidth, setPagingWidth] = useState(0)
    const [currentScrollSize, setCurrentScrollSize] = useState(0)
    const [canScrollPrev, setCanScrollPrev] = useState(false)
    const [canScrollNext, setCanScrollNext] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(activeIndex); 

    

    // EFFECT
    // slider width
        useEffect(() => {
        const handleResize = () => {
            let offsetSize = sliderRef.current?.offsetWidth;
            let scrollSize = listRef.current?.scrollWidth;
            
            if (direction === ListDirection.Column) {
                offsetSize = sliderRef.current?.offsetHeight;
                scrollSize = listRef.current?.scrollHeight;
            }
    
            if (offsetSize) {
                setSliderSize(offsetSize);
            }
            
            // Если isFull=true, слайд занимает всю ширину контейнера
            if (offsetSize && scrollSize && isFull) {
                setSlideSize(offsetSize);  // ширина слайда = ширина контейнера
            } else if (scrollSize) {
                const calculatedSlideWidth = (scrollSize - gap * (items.length - 1)) / items.length;
                setSlideSize(slideWidthOut === undefined ? calculatedSlideWidth : slideWidthOut);
            }

            console.log('qwe size', offsetSize, scrollSize, isFull)
        };
    
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
    

    // paging width
    useEffect(() => {
        if (slideSize === 0) return

        setPagingWidth(() => {
            if (pagingVariant === SliderPagingVariant.Full)
                return sliderSize
            return slideSize * pagingAmount + gap * pagingAmount
        })
    }, [slideSize, pagingVariant, pagingAmount, gap, sliderSize])

    useEffect(() => {
        const updateScrollState = () => {
            if (!sliderRef.current) return;

            let sliderScrollSize = sliderRef.current.scrollWidth
            let sliderClientSize = sliderRef.current.clientWidth
            let sliderScrollPosition = sliderRef.current.scrollLeft
            if (direction === ListDirection.Column) {
                sliderScrollSize = sliderRef.current.scrollHeight
                sliderClientSize = sliderRef.current.clientHeight
                sliderScrollPosition = sliderRef.current.scrollTop
            }

            const maxScrollLeft = sliderScrollSize - sliderClientSize;
            setCanScrollPrev(sliderScrollPosition > 0);
            setCanScrollNext(sliderScrollPosition < maxScrollLeft);

            const newCurrentIndex = Math.round(sliderScrollPosition / (slideSize + gap));
            setCurrentIndex(newCurrentIndex + 1);
        };

        updateScrollState();

        const handleScroll = () => {
            updateScrollState();
        };

        sliderRef.current?.addEventListener('scroll', handleScroll);

        return () => {
            sliderRef.current?.removeEventListener('scroll', handleScroll);
        };
    }, [currentScrollSize, sliderSize, slideSize, gap, items.length, direction]);

    useEffect(() => {
        if (!sliderRef.current) return

        if (direction === ListDirection.Row) {
            sliderRef.current.scrollLeft = currentScrollSize;
        } else {
            sliderRef.current.scrollTop = currentScrollSize;
        }
    }, [currentScrollSize, direction])

    useEffect(() => {
        if (!sliderRef.current || !listRef.current || activeIndex === undefined) return;

        const targetIndex = Math.max(Math.min(activeIndex, items.length - 1), 0);
        const newScrollPosition = targetIndex * (slideSize + gap);
        setCurrentScrollSize(newScrollPosition);
    }, [activeIndex, items.length, slideSize, gap]);

    // HANDLE
    const getValidScrollSize = (prev: number, newValue: number) => {
        if (!sliderRef.current) return prev
        let scrollSize = sliderRef.current.scrollWidth
        let clientSize = sliderRef.current.clientWidth
        if (direction === ListDirection.Column) {
            scrollSize = sliderRef.current.scrollHeight
            clientSize = sliderRef.current.clientHeight
        }
        return Math.min(Math.max(newValue, 0), scrollSize - clientSize);
    }

    const onPrev = () => {
        setCurrentScrollSize(prev => getValidScrollSize(prev, prev - pagingWidth));
    };

    const onNext = () => {
        setCurrentScrollSize(prev => getValidScrollSize(prev, prev + pagingWidth));
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
                      activeIndex={activeIndex}
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
    )
}
