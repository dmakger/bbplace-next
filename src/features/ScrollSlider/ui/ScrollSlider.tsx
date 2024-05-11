import { cls } from "@/shared/lib/classes.lib"
import cl from './_ScrollSlider.module.scss'

interface IScrollSlider<T>{
    slides?: T[];
    style?: object
    component: React.FC<{
        slide: T,
        className?: string,
        style?: object,
        width: number,
        height: number
    }>;
    className?: string,
    classNameSlides?: string
}

export const ScrollSlider = <T extends (object | string)>({
    slides=[], 
    component: SlideComponent, 
    className, classNameSlides, 
}: IScrollSlider<T>) => {
    return (
        <div className={cls(cl.ScrollSlider, className)}>
            <div className={cls(cl.slidesContainer)}>
                {slides.map((slide, index) => (
                    <SlideComponent slide={slide} 
                                    className={classNameSlides}
                                    key={index}
                                    width={150}
                                    height={150}/>
                ))}
            </div>
        </div>
    )
}
