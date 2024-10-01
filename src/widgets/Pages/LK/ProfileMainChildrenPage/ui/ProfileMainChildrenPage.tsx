'use client'

import { useAppSelector } from "@/storage/hooks"
import { ECurrentLK } from "@/entities/User/model/user.model"
import { ProfileMainBuyer } from "../components/ProfileMainBuyer/ProfileMainBuyer"
import { ProfileMainSeller } from "../components/ProfileMainSeller/ProfileMainSeller"

export const ProfileMainChildrenPage = () => {

    const { currentLK, fullName, email, phoneNumber } = useAppSelector(state => state.user)
    return (
        <>
            {currentLK === ECurrentLK.BUYER ?
                <ProfileMainBuyer currentLK={currentLK}
                    fullName={fullName}
                    email={email}
                    phoneNumber={phoneNumber}
                /> :
                <ProfileMainSeller currentLK={currentLK!}
                    fullName={fullName}
                    email={email}
                    phoneNumber={phoneNumber} 
                    />}
        </>
    )
}
