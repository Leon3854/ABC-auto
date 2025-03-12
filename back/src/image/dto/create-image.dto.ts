import { IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateImageDto {
	@IsString()
	imageId: string

	@IsString()
	@IsOptional()
	title?: string

	@IsNumber()
	@IsOptional()
	carId?: number

	@IsString()
	@IsOptional()
	filename: string // Добавьте поле filename, если оно нужно

	@IsNumber()
	@IsOptional()
	categoryId?: number
}
