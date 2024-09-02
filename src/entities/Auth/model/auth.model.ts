import { ECurrentLK } from "@/entities/User/model/user.model"
import { IImage } from "@/shared/model/image.model"

export interface IAuthForm {
	username: string
	password: string
}

export interface IAuthResponse {
	accessToken: string
	refreshToken: string
	expiration?: string
}

export interface IUser extends IUserOptionalProps {
    id: string
    fullName: string
    isAuth: boolean
    legalName: string
    brandName: string
    role: string
    phoneNumber: string
    country: string
    unreadMessages: number
    email: string
}

/**
 * Необязательные поля пользователя.  
 * Например поля которые получаем не из `JWT токена` (`photoId`)
 */
export interface IUserOptionalProps  {
    photoId?: IImage
    prevPath?: string,
    currentLK?: ECurrentLK
}

export interface ILoginResponseDecoded {
    UserId: string
    UserName: string
    FullName: string
    LegalName: string
    BrandName: string
    Role: string
    MobilePhone: string,
    Country: string
}

export interface IUpdateUserInfo {
    email: string
    phoneNumber: string
    category: string
    shortDescription: string
    description: string
    legalName: string
    brandName: string,
    fullName: string,
    photoId: string
}

export interface ICheckEmailExists{
    exists: boolean
}

export interface ISendResetPassword{
    email: string
}

export interface IRegistrationRequest {
    country: string
    role: string
    email: string
    password: string
    legalName?: string
    brandName?: string
    fullName: string
    phoneNumber?: string,
    emailSubscription: boolean
}

export interface IResetPassword {
    email: string
    token: string
    password: string
}


// export type TypeUserForm = Omit<IUser, 'id'> & { password?: string }
