import { cls } from "@/shared/lib/classes.lib"
import cl from './_Rating.module.scss'
import Image from "next/image"
import { ERatingColor } from "../model/rating.model"
import { ImageSmart } from "../../Image/Smart/ImageSmart"
import { STAR__LOW__ICON } from "../../Icon/data/star.data.icon"

interface IRating {
    className?: string,
    classNameMainContainer?: string,
    classNameScore?: string,
    classNameNumberOfReviews?: string,
    rating: number,
    numberOfReviews: number,
    ratingOutOf?: number
    hasStar?: boolean,
    color?: ERatingColor
}

export const Rating = ({
    className,
    classNameMainContainer,
    classNameScore,
    classNameNumberOfReviews,
    numberOfReviews = 0,
    rating,
    ratingOutOf = 5,
    hasStar = false,
    color = ERatingColor.YELLOW
}: IRating) => {
    return (
        <div className={cls(cl.Rating, className)}>
            {hasStar ? (
                <ImageSmart icon={STAR__LOW__ICON} alt={'star'} 
                    width={20} height={20} />
            ) : null}
            <p className={cls(cl.mainContainer, classNameMainContainer, color === ERatingColor.DEFAULT ? cl.defaultColor : '')}>
                <span className={cls(cl.score, classNameScore)}>
                    {`${rating}/${ratingOutOf}`}
                </span>
                &nbsp;
                <span className={cls(cl.numberOfReviews, classNameNumberOfReviews)}>
                    ({numberOfReviews})
                </span>
            </p>
        </div>

    )
}
