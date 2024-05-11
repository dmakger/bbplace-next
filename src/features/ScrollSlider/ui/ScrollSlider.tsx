import { cls } from "@/shared/lib/classes.lib"
import cl from './_ScrollSlider.module.scss'

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
    width: number,
    height: number

}

export const ScrollSlider = <T extends (object | string)>({
    slides = [],
    component: SlideComponent,
    className,
     classNameSlides,
     width,
     height

}: IScrollSlider<T>) => {
    return (
        <div className={cls(cl.ScrollSlider, className)}>
            <div className={cls(cl.slidesContainer)}>
                {slides.map((slide, index) => (
                    <SlideComponent slide={slide}
                        className={classNameSlides}
                        key={index}
                        width={width}
                        height={height} />
                ))}
            </div>
        </div>
    )
}
