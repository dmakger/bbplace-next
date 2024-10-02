'use client'

import { useAppSelector } from "@/storage/hooks"
import { ECurrentLK } from "@/entities/User/model/user.model"
import { ProfileMainBuyer } from "../components/ProfileMainBuyer/ProfileMainBuyer"
import { ProfileMainSupplier } from "../components/ProfileMainSupplier/ProfileMainSupplier"
import { PROFILE_CABINET_EMAIL_VERIFICATION_MESSAGE, PROFILE_CABINET_PHONE_NUMBER_VERIFICATION_MESSAGE } from "../data/profileMainChildrenPage.data"

export const ProfileMainChildrenPage = () => {

    //RTK
    const { currentLK, ...userInfo } = useAppSelector(state => state.user)


    //VARIABLES
    const PROFILE_MESSAGE_ARRAY = [
        PROFILE_CABINET_EMAIL_VERIFICATION_MESSAGE,
        PROFILE_CABINET_PHONE_NUMBER_VERIFICATION_MESSAGE
    ]

    const ProfileComponent = currentLK === ECurrentLK.BUYER ? ProfileMainBuyer : ProfileMainSupplier

    return <ProfileComponent
        currentLK={currentLK!}
        profileMessageArray={PROFILE_MESSAGE_ARRAY}
        {...userInfo} />
}
