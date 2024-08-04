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

interface SliderTProps<T> extends ISliderT<T> {}

/**
 * Если `pagingVariant`:  
 * 1. `SliderPagingVariant.Full` - перелистование на всю страницу  
 * 2. `SliderPagingVariant.Amount` - перелистование по `pagingAmount`
 */
export const SliderT = <T extends any>({
    pagingVariant = SliderPagingVariant.Amount,
    pagingAmount = 1,
    slideWidth: slideWidthOut,
    classNameWrapper,
    className,

    items,
    direction = ListDirection.Row,
    activeIndex,
    gap = 0,
    ...rest
}: SliderTProps<T>) => {

    // REFS
    const sliderRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    // STATE
    const [slideWidth, setSlideWidth] = useState(0)
    const [sliderWidth, setSliderWidth] = useState(0)
    const [pagingWidth, setPagingWidth] = useState(0)
    const [currentScrollSize, setCurrentScrollSize] = useState(0)
    const [canScrollPrev, setCanScrollPrev] = useState(false)
    const [canScrollNext, setCanScrollNext] = useState(false)

    // EFFECT
    // slider width
    useEffect(() => {
        const handleResize = () => {
            if (sliderRef.current) {
                setSliderWidth(sliderRef.current.offsetWidth);
            }
            if (listRef.current) {
                const listWidth = listRef.current.scrollWidth;
                const calculatedSlideWidth = (listWidth - gap * (items.length - 1)) / items.length;
                setSlideWidth(slideWidthOut === undefined ? calculatedSlideWidth : slideWidthOut);
            }
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
    }, [sliderRef, listRef, slideWidthOut, gap, items.length]);

    // paging width
    useEffect(() => {
        if (slideWidth === 0) return

        setPagingWidth(() => {
            if (pagingVariant === SliderPagingVariant.Full)
                return sliderWidth
            return slideWidth * pagingAmount + gap * pagingAmount
        })
    }, [slideWidth, pagingVariant, pagingAmount, gap, sliderWidth])

    useEffect(() => {
        const updateScrollState = () => {
            if (!sliderRef.current) return;

            const maxScrollLeft = sliderRef.current.scrollWidth - sliderRef.current.clientWidth;

            setCanScrollPrev(sliderRef.current.scrollLeft > 0);
            setCanScrollNext(sliderRef.current.scrollLeft < maxScrollLeft);
        };

        updateScrollState();

        const handleScroll = () => {
            updateScrollState();
        };

        sliderRef.current?.addEventListener('scroll', handleScroll);

        return () => {
            sliderRef.current?.removeEventListener('scroll', handleScroll);
        };
    }, [currentScrollSize, sliderWidth, slideWidth, gap, items.length]);

    useEffect(() => {
        if (!sliderRef.current) return

        if (direction === ListDirection.Row) {
            sliderRef.current.scrollLeft = currentScrollSize;
        }
    }, [currentScrollSize, direction])

    useEffect(() => {
        if (!sliderRef.current || !listRef.current || activeIndex === undefined) return;

        const targetIndex = Math.max(Math.min(activeIndex, items.length - 1), 0);
        const newScrollPosition = targetIndex * (slideWidth + gap);
        setCurrentScrollSize(newScrollPosition);
    }, [activeIndex, items.length, slideWidth, gap]);

    // HANDLE
    const getValidScrollSize = (prev: number, newValue: number) => {
        if (!sliderRef.current) return prev
        return Math.min(Math.max(newValue, 0), sliderRef.current.scrollWidth - sliderRef.current.clientWidth);
    }

    const onPrev = () => {
        setCurrentScrollSize(prev => getValidScrollSize(prev, prev - pagingWidth));
    };

    const onNext = () => {
        setCurrentScrollSize(prev => getValidScrollSize(prev, prev + pagingWidth));
    };

    return (
        <div className={cls(cl.sliderWrapper, classNameWrapper)}>
            <ButtonArrowWLine isSecondary={false} onClick={onPrev} sizes={{ width: 20, height: 20 }}
                className={cls(cl.prevButton, canScrollPrev ? cl.visible : '')} />
            <div ref={sliderRef} className={cls(cl.slider)}>
                <List listRef={listRef} items={items} direction={direction}
                      activeIndex={activeIndex}
                      gap={gap}
                      className={cls(cl.slideContainer, className)}
                      {...rest} />
            </div>
            <ButtonArrowWLine isSecondary={false} axis={Axis.Top} onClick={onNext} sizes={{ width: 20, height: 20 }}
                className={cls(cl.nextButton, canScrollNext ? cl.visible : '')} />
        </div>
    )
}
