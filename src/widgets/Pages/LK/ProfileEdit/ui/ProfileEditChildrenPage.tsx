'use client'

import { IProfileEditTab } from "@/features/DetailedPageInfo/model/detailedPageInfo.model"
import { SWITCH_SELECTOR_PROFILE_EDIT } from "@/shared/ui/SwitchSelector/data/switchSelector.data"
import Wrapper1280 from "@/shared/ui/Wrapper/1280/Wrapper1280"
import { WrapperLKPT } from "@/shared/ui/Wrapper/LKPT"
import { ProfileEditForm } from "../components/ProfileEditForm/ProfileEditForm"
import { useEffect, useRef, useState } from "react"
import { TinAPI, UserAPI } from "@/entities/Auth/api/auth.api"
import { IEditProfileCompanyFormValues, IEditProfilePersonalFormValues } from "@/features/Form/EditProfile/model/editProfile.model"
import { useAppSelector } from "@/storage/hooks"
import { ISupplierAPI } from "@/entities/Supplier/model/supplier.model"



export const ProfileEditChildrenPage = () => {

    //RTK
    const { id } = useAppSelector(state => state.user)

    //API
    const [updateInfo] = UserAPI.useUpdateUserInfoMutation()
    const [updateTIN] = TinAPI.useUpdateTINMutation()
    const { data: userDataValues } = UserAPI.useGetUserDataQuery(id)

    //STATE
    const [personalInfoData, setPersonalInfoData] = useState<IEditProfilePersonalFormValues | undefined>()
    const [companyInfoData, setCompanyInfoData] = useState<IEditProfileCompanyFormValues | undefined>()
    const [userData, setUserData] = useState<ISupplierAPI>()


    //EFFECT
    useEffect(() => {
        if (userDataValues)
            setUserData(userDataValues)        
    }, [userDataValues])

    //REF
    const personalFormSubmit = useRef<() => void>(() => { });
    const companyFormSubmitRef = useRef<() => void>(() => { });

    const PROFILE_EDIT_TAB: IProfileEditTab = {
        profileEdit: {
            optionTab: userData ? ( 
                <ProfileEditForm
                    personalFormSubmit={personalFormSubmit}
                    companyFormSubmitRef={companyFormSubmitRef}
                    setPersonalInfoData={setPersonalInfoData}
                    setCompanyInfoData={setCompanyInfoData}
                    userData={userData} 
                />
            ) : <div>Loading...</div>, 
            optionValue: String(SWITCH_SELECTOR_PROFILE_EDIT.value)
        }
    }

    // HANDLE
    const handleOnClick = async () => {
        if (personalFormSubmit.current) {
            personalFormSubmit.current();
        }
        if (companyFormSubmitRef.current) {
            companyFormSubmitRef.current();
        }
        if(personalInfoData )
        try {
            await updateInfo({
                email: personalInfoData.email ?? '',
                phoneNumber: personalInfoData.phoneNumber ?? '',
                fullName: personalInfoData?.fullName ?? '',
                photoId: personalInfoData?.photoId ?? '',
                category: companyInfoData?.categories ?? '',
                shortDescription: companyInfoData?.shortDesc ?? '',
                description: companyInfoData?.fullDesc ?? '',
                legalName: companyInfoData?.legalName ?? '',
                brandName: companyInfoData?.brandName ?? '',
            })
            companyInfoData?.tin && await updateTIN(Number(companyInfoData?.tin))
        } catch (e) {
            console.log(e);
        }
    }


    return (
        <Wrapper1280>
            <WrapperLKPT
                startPage={SWITCH_SELECTOR_PROFILE_EDIT}
                pageTitle="Профиль"
                optionsTab={PROFILE_EDIT_TAB}
                options={[SWITCH_SELECTOR_PROFILE_EDIT]}
                buttonRightTitle="Сохранить"
                buttonRightProps={{ onClick: handleOnClick }}
            />
        </Wrapper1280>
    )
}