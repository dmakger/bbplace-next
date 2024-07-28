'use client'

import { cls } from "@/shared/lib/classes.lib"
import cl from './_UserProfileBadge.module.scss'
import { User } from "@/entities/User"
import { EUserVariants } from "@/entities/User/model/user.model"
import { EUserProfileBadgeVariants } from "../model/userProfileBadge.model"
import { useAppSelector } from "@/storage/hooks"
import { getRoleName } from "@/shared/lib/roles.lib"

interface IUserProfileBadge {
    className?: string,
    variant?: EUserProfileBadgeVariants,
    showProfileMenu?: boolean,
    setShowProfileMenu?: Function

}

export const UserProfileBadge = ({
    className,
    variant = EUserProfileBadgeVariants.DESKTOP,
    showProfileMenu,
    setShowProfileMenu
}: IUserProfileBadge) => {


    //RTK
    const { role, fullName } = useAppSelector(state => state.user)

    //VARIABLE
    const userRole = getRoleName(role);

    return (
        <button className={cls(
            cl.UserProfileBadge,
            cl[variant],
            showProfileMenu ? cl.activeBadge : '',
            className)}
            onClick={() => setShowProfileMenu && setShowProfileMenu((prevState: boolean) => !prevState)}>

            <div className={cl.infoContainer}>
                <span className={cl.role}>{userRole}</span>
                <h4 className={cl.userName}>{fullName}</h4>
            </div>
            <User variant={EUserVariants.AUTH} classNameArrowContainer={cls(cl.arrowContainer, showProfileMenu ? cl.activeArrow : '')} />
        </button>
    )
}
