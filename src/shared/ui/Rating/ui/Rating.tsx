import { cls } from "@/shared/lib/classes.lib"
import cl from './_Rating.module.scss'
import Link from "next/link"
import Image from "next/image"

interface IRating {
    className?: string,
    classNameMainContainer?: string,
    classNameScore?: string,
    classNameLink?: string,
    rating: number,
    numberOfReviews: number,
    ratingOutOf?: number
    linkHref: string,
    hasStar?: boolean,
}

export const Rating = ({
    className,
    classNameMainContainer,
    classNameScore,
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
                hasStar ? <Image src={'/star.svg'} alt={'star'} width={20} height={20}/> : null
            }
            <p className={cls(cl.mainContainer, classNameMainContainer)}>
                <span className={cls(cl.score, classNameScore)}>
                    {`${rating}/${ratingOutOf}`}
                </span>
                &nbsp;
                <Link className={cls(cl.link, classNameLink)} href={linkHref}>
                    ({numberOfReviews})
                </Link>
            </p>
        </div>

    )
}
