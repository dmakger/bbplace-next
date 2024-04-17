import { cls } from "@/shared/lib/classes.lib"
import cl from './_Rating.module.scss'
import Link from "next/link"
import { getReviewTextByNumber } from "@/entities/Review/lib/review.lib"

interface IRating {
    className?: string,
    classNameSpan?: string,
    classNameLink?: string,
    rating: number,
    numberOfReviews: number,
    ratingOutOf?: number
    linkHref: string,
    hasStar?: boolean,
}

export const Rating = ({
    className,
    classNameSpan,
    classNameLink,
    numberOfReviews,
    rating,
    ratingOutOf = 5,
    linkHref,
    hasStar = false
}: IRating) => {
    return (
        <div className={cls(cl.Rating, className)}>
            {
                hasStar ? '' : null
            }
            <span className={cls(cl.span, classNameSpan)}>
                {`${rating}/${ratingOutOf}`}
                &nbsp;
                <Link className={cls(cl.link, classNameLink)} href={linkHref}>
                    {`(${numberOfReviews} ${getReviewTextByNumber(numberOfReviews)})`}
                </Link>
            </span>
        </div>

    )
}
