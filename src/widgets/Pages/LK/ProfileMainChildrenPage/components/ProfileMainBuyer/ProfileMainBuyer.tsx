import { cls } from "@/shared/lib/classes.lib"
import cl from './_ProfileMainBuyer.module.scss'
import { BlockCabinetProfile } from "@/features/Block/CabinetProfile"
import { IProfileMain } from "../../model/profileMain.model"

interface IProfileMainBuyer extends IProfileMain { }


export const ProfileMainBuyer = ({
    className,
    currentLK,
    fullName,
    email,
    phoneNumber,
}: IProfileMainBuyer) => {
    return (
        <div className={cls(cl.ProfileMainBuyer, className)}>
            <BlockCabinetProfile currentLK={currentLK}
                fullName={fullName}
                email={email}
                phoneNumber={phoneNumber}
            />
        </div>
    )
}
