'use client'

import { cls } from "@/shared/lib/classes.lib"
import cl from './_BlockCabinetProfile.module.scss'
import Image from "next/image"
import { ECurrentLK } from "@/entities/User/model/user.model"
import { Button } from "@/shared/ui/Button"
import { ButtonColor, ButtonSize, ButtonVariant } from "@/shared/ui/Button/model/button.model"
import { getCurrentLKRoleName } from "@/shared/lib/roles.lib"
import { ButtonEdit } from "@/shared/ui/Button/data/Edit/ButtonEdit"
import { BUYER_DEFAULT_ICON } from "@/shared/ui/Icon/data/buyer.data.icon"
import { BUYER_ICON } from "@/shared/ui/Icon/data/buyer.data.icon"
import { SUPPLIER_DEFAULT_ICON } from "@/shared/ui/Icon/data/supplier.data.icon"
import { SUPPLIER_ICON } from "@/shared/ui/Icon/data/supplier.data.icon"
import { useRouter } from "next/navigation"
import { DASHBOARD_PAGES } from "@/config/pages-url.config"
import { useActionCreators, useAppSelector } from "@/storage/hooks"
import { handleSwitchLK } from "@/widgets/HeaderLK/lib/headerLK.lib"
import { TextWIcon } from "@/shared/ui/TextWIcon"
import { AT_SIGN_CAPTION_ICON } from "@/shared/ui/Icon/data/atSign.data"
import { ITextWIcon } from "@/shared/ui/TextWIcon/ui/TextWIcon"
import { PHONE_CAPTION_ICON } from "@/shared/ui/Icon/data/phone.data.icon"
import { CabinetProfileMessage } from "../components/Message/CabinetProfileMessage"

interface IBlockCabinetProfile {
    className?: string,
    currentLK: ECurrentLK,
    fullName: string,
    email: string,
    phoneNumber?: string,
    textMessage?: string[]
}

export const BlockCabinetProfile = ({
    className,
    currentLK,
    fullName,
    email,
    phoneNumber,
    textMessage
}: IBlockCabinetProfile) => {

    //ROUTER
    const router = useRouter();

    //RTK
    const { photoId } = useAppSelector(state => state.user)
    const actionCreators = useActionCreators()

    //VARIABLE
    const CABINET_REST_INFO_ARRAY: ITextWIcon[] = [
        {
            icon: PHONE_CAPTION_ICON,
            text: phoneNumber ?? '',
            className: cl.restInfo
        },
        {
            icon: AT_SIGN_CAPTION_ICON,
            text: email,
            className: cl.restInfo
        }
    ]

    return (
        <>
            <div className={cls(cl.BlockCabinetProfile, textMessage ? cl.noBorderBottom : '', className)}>
                <div className={cl.leftContainer}>
                    <Image src={currentLK === ECurrentLK.SUPPLIER ?
                        SUPPLIER_DEFAULT_ICON.default :
                        BUYER_DEFAULT_ICON.default}
                        alt={currentLK} />
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
                    {CABINET_REST_INFO_ARRAY.map(it => (
                        <TextWIcon key={it.text}
                            icon={it.icon}
                            text={it.text}
                            className={it.className}
                        />
                    ))}
                    <ButtonEdit
                        variant={ButtonVariant.BLANK}
                        title={'Редактировать'}
                        classNameButton={cl.editMobileButton}
                        handleEdit={() => router.push(DASHBOARD_PAGES.PROFILE_EDIT.path)}
                    />
                    <Button
                        variant={ButtonVariant.BLANK}
                        color={ButtonColor.Secondary}
                        size={ButtonSize.Medium}
                        title={currentLK === ECurrentLK.SUPPLIER ?
                            "В профиль покупателя" :
                            "В профиль поставщика"}
                        beforeImage={currentLK === ECurrentLK.SUPPLIER ?
                            BUYER_ICON :
                            SUPPLIER_ICON
                        }
                        className={cl.switchLKButton}
                        onClick={() => handleSwitchLK(actionCreators.setAuthOptional, currentLK, photoId)}
                    />
                </div>
                <ButtonEdit
                    classNameButton={cl.editButton}
                    handleEdit={() => router.push(DASHBOARD_PAGES.PROFILE_EDIT.path)}
                />
            </div>
            {textMessage?.map((it, idx) => (
                <CabinetProfileMessage
                    key={idx}
                    className={idx === textMessage.length - 1 ? cl.noBorderTop : ''}
                    text={it} />
            ))}
        </>

    )
}
