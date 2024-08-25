"use client"

import { useRef, useState } from "react"

import { cls } from "@/shared/lib/classes.lib"
import cl from './_UserAuth.module.scss'
import { User } from "@/entities/User"
import WrapperClickOutside from "@/shared/ui/Wrapper/ClickOutside/WrapperClickOutside"
import UserProfileModal from "../UserProfileModal/UserProfileModal"
import { useAppSelector } from "@/storage/hooks"
import { getSupplierImage } from "@/entities/Supplier/lib/image.supplier.lib"

interface IUserAuth {
    className?: string,
}

export const UserAuth = ({ className }: IUserAuth) => {
    //STATE
    const [isShowProfileModal, setIsShowProfileModal] = useState<boolean>(false)

    // RTK
    const user = useAppSelector(state => state.user)

    //REF
    const userRef = useRef<HTMLDivElement>(null)

    // HANDLE
    const showProfileModal = () => setIsShowProfileModal(prevState => !prevState);
    
    return (
        <WrapperClickOutside _ref={userRef} isShow={isShowProfileModal} handle={showProfileModal} className={cls(cl.UserAuth, className)}>
            <User image={user.photoId?.key} className={cl.image} onClick={showProfileModal} />
            <UserProfileModal isShowProfileModal={isShowProfileModal} />
        </WrapperClickOutside>

    )
}
