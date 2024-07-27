import { cls } from "@/shared/lib/classes.lib"
import cl from './_UserProfileBadge.module.scss'
import { User } from "@/entities/User"
import { EUserVariants } from "@/entities/User/model/user.model"
import { useState } from "react"
import { EUserProfileBadgeVariants } from "../model/userProfileBadge.model"

interface IUserProfileBadge {
    className?: string,
    variant?: EUserProfileBadgeVariants

}

export const UserProfileBadge = ({
    className,
    variant = EUserProfileBadgeVariants.DESKTOP
}: IUserProfileBadge) => {

    //STATE
    const [showProfileModal, setShowProfileModal] = useState<boolean>(false)

    //FUNCTION
    const showProfile = () => setShowProfileModal(prevState => !prevState)


    return (
        <button className={cls(
            cl.UserProfileBadge,
            cl[variant],
            showProfileModal ? cl.activeBadge : '',
            className)}
            onClick={showProfile}>

            <div className={cl.infoContainer}>
                <span className={cl.role}>Продавец</span>
                <h4 className={cl.userName}>Соленые кабачки</h4>
            </div>
            <User variant={EUserVariants.AUTH} classNameArrowContainer={cls(cl.arrowContainer, showProfileModal ? cl.activeArrow : '')} />
        </button>
    )
}
