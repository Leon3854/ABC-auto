import { IsOptional, IsString, Length } from 'class-validator'

export class CreateCarouselDto {
	@Length(1, 255)
	@IsString()
	title: string

	@IsOptional()
	@IsString()
	text?: string

	@IsString()
	@IsOptional()
	url?: string
}

export class UpdateCarouselDto {
	@Length(1, 255)
	@IsString()
	@IsOptional()
	title: string

	@IsString()
	@IsOptional()
	text?: string

	@IsString()
	@IsOptional()
	url?: string
}
