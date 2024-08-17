import { cls } from "@/shared/lib/classes.lib"
import cl from './_GalleryCounter.module.scss'

interface IGalleryCounter{
    className?: string,
    activeIndex?: number,
    listLength?: number

}

export const GalleryCounter = ({
    className,
    activeIndex,
    listLength
}: IGalleryCounter) => {
    return (
        <div className={cls(cl.GalleryCounter, className)}>
            <span className={cl.activeItem}>{activeIndex}</span>
            /
            <span className={cl.outOfNumber}>{listLength}</span>
        </div>
    )
}
