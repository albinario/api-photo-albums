export type CreateUserData = {
	email: string,
	password: string,
	first_name: string,
	last_name: string
}

export type JwtPayload = {
	sub: number,
	email: string,
	iat?: number,
	exp?: number
}

export type CreatePhotoData = {
	title: string,
	url: string,
	comment?: string,
	user_id: number
}

export type UpdatePhotoData = {
	title?: string,
	url?: string,
	comment?: string
}