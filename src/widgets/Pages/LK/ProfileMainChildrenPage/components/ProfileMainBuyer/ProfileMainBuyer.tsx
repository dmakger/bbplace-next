import { cls } from "@/shared/lib/classes.lib"
import cl from './_ProfileMainBuyer.module.scss'
import { IProfileMain } from "../../model/profileMain.model"
import { BlockCabinetProfile } from "@/features/Block/Cabinet"

interface IProfileMainBuyer extends IProfileMain { }


export const ProfileMainBuyer = ({
    className,
    currentLK,
    fullName,
    email,
    phoneNumber,
    profileMessageArray
}: IProfileMainBuyer) => {
    return (
        <div className={cls(cl.ProfileMainBuyer, className)}>
            <BlockCabinetProfile currentLK={currentLK}
                fullName={fullName}
                email={email}
                phoneNumber={phoneNumber}
                textMessage={profileMessageArray}
            />
        </div>
    )
}
