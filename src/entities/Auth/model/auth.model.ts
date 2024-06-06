export interface IAuthForm {
	username: string
	password: string
}

export interface IAuthResponse {
	accessToken: string
	refreshToken: string
	expiration?: string
}

export interface IUser {
    fullName: string
    isAuth: boolean
    legalName: string
    brandName: string
    role: string
    phoneNumber: string
    country: string
    unreadMessages: number
    email: string
    id: string
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


// export type TypeUserForm = Omit<IUser, 'id'> & { password?: string }
