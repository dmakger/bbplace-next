import { cls } from "@/shared/lib/classes.lib"
import cl from './_ProfileEditForm.module.scss'
import { Dispatch, MutableRefObject, RefObject, SetStateAction } from "react";
import { IEditProfileCompanyFormValues, IEditProfilePersonalFormValues } from "@/features/Form/EditProfile/model/editProfile.model";
import { CompanyInfoEditProfileForm, PersonalInfoEditProfileForm } from "@/features/Form/EditProfile/ui";
import { ISupplierAPI } from "@/entities/Supplier/model/supplier.model";

interface IProfileEditForm {
    className?: string,
    personalFormSubmit: MutableRefObject<() => void>,
    companyFormSubmitRef: MutableRefObject<() => void>,
    setPersonalInfoData: Dispatch<SetStateAction<IEditProfilePersonalFormValues | undefined>>,
    setCompanyInfoData: Dispatch<SetStateAction<IEditProfileCompanyFormValues | undefined>>,
    userData: ISupplierAPI
}

export const ProfileEditForm = ({
    className,
    personalFormSubmit,
    companyFormSubmitRef,
    setPersonalInfoData,
    setCompanyInfoData,
    userData
}: IProfileEditForm) => {
    return (
        <div className={cls(cl.ProfileEditForm, className)}>
            <PersonalInfoEditProfileForm setData={setPersonalInfoData} triggerSubmit={(submitFn) => { personalFormSubmit.current = submitFn }}
                userData={userData} />
            <CompanyInfoEditProfileForm setData={setCompanyInfoData} triggerSubmit={(submitFn) => { companyFormSubmitRef.current = submitFn }}
                userData={userData} />
        </div>
    )
}
