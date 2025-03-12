import { Transform } from 'class-transformer'
import { IsInt, IsOptional, IsString, IsUrl } from 'class-validator'

export class CreateSlideDto {
	@IsString()
	@IsOptional()
	title?: string

	@IsString()
	@IsOptional()
	text?: string

	@IsString()
	@IsUrl()
	@IsOptional()
	filePath?: string

	@IsOptional()
	file?: Express.Multer.File // Если вы передаете файл

	// @Type(() => Number)
	@Transform(({ value }) => parseInt(value, 10)) // Преобразование в целое число
	@IsInt({ message: 'sliderId must be an integer number' }) // Убедись, что здесь используется IsInt
	sliderId: number
}

export class UpdateSlideDto {
	@IsString()
	@IsOptional()
	title?: string

	@IsString()
	@IsOptional()
	text?: string

	@IsUrl()
	@IsOptional()
	filePath?: string

	@IsOptional()
	file?: Express.Multer.File // Если вы передаете файл

	// @Type(() => Number)
	@Transform(({ value }) => parseInt(value, 10)) // Преобразование в целое число
	@IsInt({ message: 'sliderId must be an integer number' }) // Убедись, что здесь используется IsInt
	sliderId: number
}
