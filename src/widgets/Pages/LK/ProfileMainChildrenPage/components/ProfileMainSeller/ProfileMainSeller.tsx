import { cls } from "@/shared/lib/classes.lib"
import cl from './_ProfileMainSeller.module.scss'
import { BlockCabinetProfile } from "@/features/Block/CabinetProfile"
import { IProfileMain } from "../../model/profileMain.model"

interface IProfileMainSeller extends IProfileMain{}



export const ProfileMainSeller = ({
    className,
    currentLK,
    fullName,
    email,
    phoneNumber
}: IProfileMainSeller) => {
    return (
        <div className={cls(cl.ProfileMainSeller, className)}>
            <BlockCabinetProfile currentLK={currentLK}
            fullName={fullName}
            email={email}
            phoneNumber={phoneNumber}
            />
        </div>
    )
}
