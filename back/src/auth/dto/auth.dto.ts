import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator'

export class AuthDto {
	@IsEmail()
	email: string

	@MinLength(6, {
		message: 'Password cannot them six characters'
	})
	@IsString()
	password: string

	@IsString()
	@IsOptional()
	phone: string
}
