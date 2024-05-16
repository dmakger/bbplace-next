import { cls } from "@/shared/lib/classes.lib"
import cl from './_ScrollSlider.module.scss'
import { ReactNode } from "react";

interface IScrollSlider<T> {
    slides?: T[];
    component: React.FC<{
        slide: T,
        className?: string,
        width: number,
        height: number
    }>;
    className?: string,
    classNameSlides?: string,
    classNameSlidesContainer?: string,
    width?: number,
    height?: number,
    children?: ReactNode

}

export const ScrollSlider = <T extends (object | string)>({
    slides = [],
    component: SlideComponent,
    className,
    classNameSlides,
    classNameSlidesContainer,
    width = 150,
    height = 150,
    children

}: IScrollSlider<T>) => {
    return (
        <div className={cls(cl.ScrollSlider, className)}>
            <div className={cls(cl.slidesContainer, classNameSlidesContainer)}>
                {slides.map((slide, index) => (
                    <SlideComponent slide={slide}
                        className={classNameSlides}
                        key={index}
                        width={width}
                        height={height} />
                ))}
                {children}
            </div>
        </div>
    )
}
