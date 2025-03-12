import { IsOptional, IsString } from 'class-validator'

export class clientCallDto {
	@IsString()
	callName: string

	@IsString()
	@IsOptional()
	callPhone: string
}
