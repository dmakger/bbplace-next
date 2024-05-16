import { cls } from "@/shared/lib/classes.lib"
import cl from './_UserAuth.module.scss'
import { User } from "@/entities/User"
import WrapperClickOutside from "@/shared/ui/Wrapper/ClickOutside/WrapperClickOutside"
import { useRef, useState } from "react"
import UserProfileModal from "../UserProfileModal/UserProfileModal"

interface IUserAuth {
    className?: string,
}

export const UserAuth = ({ className }: IUserAuth) => {
    //STATE
    const [isShowProfileModal, setIsShowProfileModal] = useState<boolean>(false)

    //REF
    const userRef = useRef<HTMLDivElement>(null)

    const showProfileModal = () => setIsShowProfileModal(prevState => !prevState);
    

    return (
        <WrapperClickOutside _ref={userRef} isShow={isShowProfileModal} handle={showProfileModal} className={cls(cl.UserAuth, className)}>
                <User className={cl.image} onClick={showProfileModal} />
                <UserProfileModal isShowProfileModal={isShowProfileModal} />
        </WrapperClickOutside>

    )
}
