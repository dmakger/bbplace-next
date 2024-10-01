'use client'

import { cls } from "@/shared/lib/classes.lib"
import cl from './_BlockCabinetProfile.module.scss'
import Image from "next/image"
import { ECurrentLK } from "@/entities/User/model/user.model"
import { ButtonDelete } from "@/shared/ui/Button/data/Delete/ButtonDelete"
import { Button } from "@/shared/ui/Button"
import { ButtonColor, ButtonSize, ButtonVariant } from "@/shared/ui/Button/model/button.model"
import { getCurrentLKRoleName } from "@/shared/lib/roles.lib"
import { ButtonEdit } from "@/shared/ui/Button/data/Edit/ButtonEdit"

interface IBlockCabinetProfile {
    className?: string,
    currentLK: ECurrentLK,
    fullName: string,
    email: string,
    phoneNumber?: string
}

export const BlockCabinetProfile = ({
    className,
    currentLK,
    fullName,
    email,
    phoneNumber,
}: IBlockCabinetProfile) => {
    return (
        <div className={cls(cl.BlockCabinetProfile, className)}>
            <div className={cl.leftContainer}>
                <Image src='' alt="" />
                <div className={cl.supplierInfo}>
                    <span className={cl.role}>
                        {getCurrentLKRoleName(currentLK)}
                    </span>
                    <h3 className={cl.fullName}>
                        {fullName}
                    </h3>
                </div>
            </div>
            <div className={cl.rightContainer}>
                <div className={cl.restInfo}>
                    {phoneNumber && <p>{phoneNumber}</p>}
                    <p>{email}</p>
                    <Button
                        variant={ButtonVariant.BLANK}
                        color={ButtonColor.Secondary}
                        size={ButtonSize.Medium}
                        title={currentLK === ECurrentLK.SELLER ?
                            "В профиль покупателя" :
                            "В профиль продавца"}
                    />
                </div>
                <ButtonEdit handleEdit={() => { }} />
            </div>
        </div>
    )
}
