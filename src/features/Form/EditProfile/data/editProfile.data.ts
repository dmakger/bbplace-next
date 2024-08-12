import { IEditProfileCompanyFormValues, IEditProfilePersonalFormValues } from "../model/editProfile.model";

export const INITIAL_PERSONAL_ERRORS: IEditProfilePersonalFormValues = {
    phoneNumber: '',
    fullName: '',
    email: '',
    photoId: ''
};

export const INITIAL_COMPANY_ERRORS: IEditProfileCompanyFormValues = {
    categories: '',
    shortDesc: '',
    fullDesc: '',
    legalName: '',
    brandName: '',
    tin: ''
};