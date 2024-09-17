'use client'

import { IProfileEditTab } from "@/features/DetailedPageInfo/model/detailedPageInfo.model";
import { SWITCH_SELECTOR_PROFILE_EDIT } from "@/shared/ui/SwitchSelector/data/switchSelector.data";
import Wrapper1280 from "@/shared/ui/Wrapper/1280/Wrapper1280";
import { WrapperLKPT } from "@/shared/ui/Wrapper/LKPT";
import { ProfileEditForm } from "../components/ProfileEditForm/ProfileEditForm";
import { useEffect, useRef, useState } from "react";
import { TinAPI, UserAPI } from "@/entities/Auth/api/auth.api";
import { IEditProfileCompanyFormValues, IEditProfilePersonalFormValues } from "@/features/Form/EditProfile/model/editProfile.model";
import { useActionCreators, useAppSelector } from "@/storage/hooks";
import { ISupplier } from "@/entities/Supplier/model/supplier.model";
import { useRouter } from "next/navigation";
import { DASHBOARD_PAGES } from "@/config/pages-url.config";
import { ILoginResponseDecoded, IUser } from "@/entities/Auth/model/auth.model";
import { ECurrentLK } from "@/entities/User/model/user.model";
import { Loader } from "@/shared/ui/Loader";

export const ProfileEditChildrenPage = () => {
    //RTK
    const { id, currentLK } = useAppSelector(state => state.user);
    const actionCreators = useActionCreators()
    const currentAuthData: ILoginResponseDecoded | IUser = useAppSelector(state => state.user);


    //API
    const [updateInfo, { isLoading: isLoadingInfo }] = UserAPI.useUpdateUserInfoMutation();
    const [updateTIN, { isLoading: isLoadingTIN }] = TinAPI.useUpdateTINMutation();
    const { data: userDataValues } = UserAPI.useGetUserDataQuery(id, {refetchOnMountOrArgChange: true});

    //ROUTER
    const router = useRouter()

    //STATE
    const [personalInfoData, setPersonalInfoData] = useState<IEditProfilePersonalFormValues | undefined>();
    const [companyInfoData, setCompanyInfoData] = useState<IEditProfileCompanyFormValues | undefined>();
    const [userData, setUserData] = useState<ISupplier>();
    const [formUpdated, setFormUpdated] = useState(false);

    //EFFECT
    useEffect(() => {
        if (userDataValues)
            setUserData(userDataValues);
    }, [userDataValues]);

    useEffect(() => {
        if (formUpdated && userData) {
            handleSubmit();
        }
    }, [formUpdated, userData]);

    // REF
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
            ) : <Loader />,
            optionValue: String(SWITCH_SELECTOR_PROFILE_EDIT.value)
        }
    }

    // HANDLE SUBMISSION
    const handleSubmit = async () => {
        try {
            if (personalInfoData && companyInfoData) {
                await updateInfo({
                    email: personalInfoData.email ?? '',
                    phoneNumber: personalInfoData.phoneNumber ?? '',
                    fullName: personalInfoData.fullName ?? '',
                    photoId: personalInfoData.photoId ?? '',
                    category: companyInfoData.categories ?? '',
                    shortDescription: companyInfoData.shortDesc ?? '',
                    description: companyInfoData.fullDesc ?? '',
                    legalName: companyInfoData.legalName ?? '',
                    brandName: companyInfoData.brandName ?? '',
                });

                if (companyInfoData.tin !== userData?.inn) {
                    await updateTIN(companyInfoData.tin);
                }
                actionCreators.setAuth({
                    ...currentAuthData,
                    BrandName: companyInfoData.brandName ?? '',
                    FullName: personalInfoData.fullName ?? '',
                    LegalName: companyInfoData.legalName ?? '',
                    MobilePhone: personalInfoData.phoneNumber ?? '',
                })
                const redirectPath = currentLK === ECurrentLK.SELLER ? DASHBOARD_PAGES.PRODUCTS(false).path : DASHBOARD_PAGES.CHATS('').path;
                router.push(redirectPath);

            }
        } catch (e) {
            console.error(e);
        }
    }

    const handleOnClick = () => {
        if (personalFormSubmit.current) {
            personalFormSubmit.current();
        }
        if (companyFormSubmitRef.current) {
            companyFormSubmitRef.current();
        }
        setFormUpdated(true);
    }

    return (
        <Wrapper1280>
            <WrapperLKPT
                startPage={SWITCH_SELECTOR_PROFILE_EDIT}
                pageTitle="Профиль"
                optionsTab={PROFILE_EDIT_TAB}
                options={[SWITCH_SELECTOR_PROFILE_EDIT]}
                buttonRightTitle="Сохранить"
                buttonRightProps={{ onClick: handleOnClick, loading: isLoadingInfo || isLoadingTIN, disabled: isLoadingInfo || isLoadingTIN }}
            />
        </Wrapper1280>
    )
}