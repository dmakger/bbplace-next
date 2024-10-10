import { cls } from "@/shared/lib/classes.lib"
import cl from './_ProfileMainSupplier.module.scss'
import { IProfileMain } from "../../model/profileMain.model"
import { BlockCabinetProfile } from "@/features/Block/Cabinet"

interface IProfileMainSupplier extends IProfileMain {}


export const ProfileMainSupplier = ({
    className,
    currentLK,
    fullName,
    email,
    phoneNumber,
    profileMessageArray
}: IProfileMainSupplier) => {
    return (
        <div className={cls(cl.ProfileMainSupplier, className)}>
            <BlockCabinetProfile currentLK={currentLK}
                fullName={fullName}
                email={email}
                phoneNumber={phoneNumber}
                textMessage={profileMessageArray}
            />
        </div>
    )
}
