export interface IAuthForm {
	username: string
	password: string
}

export interface IAuthResponse {
	accessToken: string
	refreshToken: string
	expiration?: string
}

// export type TypeUserForm = Omit<IUser, 'id'> & { password?: string }
