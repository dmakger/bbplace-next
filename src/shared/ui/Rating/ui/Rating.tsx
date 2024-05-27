import { cls } from "@/shared/lib/classes.lib"
import cl from './_Rating.module.scss'
import Image from "next/image"

interface IRating {
    className?: string,
    classNameMainContainer?: string,
    classNameScore?: string,
    classNameNumberOfReviews?: string,
    rating: number,
    numberOfReviews: number,
    ratingOutOf?: number
    hasStar?: boolean,
}

export const Rating = ({
    className,
    classNameMainContainer,
    classNameScore,
    classNameNumberOfReviews,
    numberOfReviews,
    rating,
    ratingOutOf = 5,
    hasStar = false
}: IRating) => {
    return (
        <div className={cls(cl.Rating, className)}>
            {
                hasStar ? <Image src={'/star.svg'} alt={'star'} width={20} height={20}/> : null
            }
            <p className={cls(cl.mainContainer, classNameMainContainer)}>
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
