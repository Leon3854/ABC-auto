import { Transform, Type } from 'class-transformer'
import {
	IsArray,
	IsInt,
	IsNotEmpty,
	IsOptional,
	IsString,
	ValidateNested
} from 'class-validator'

class SlideDto {
	@IsOptional() // Теперь это необязательное поле
	@IsString()
	title?: string

	@IsOptional() // Теперь это необязательное поле
	@IsString()
	text?: string

	@IsOptional() // Теперь это необязательное поле
	@IsString()
	filePath?: string
}

export class CreateSlidersDto {
	// @IsString()
	// @IsNotEmpty()
	// title: string

	// @IsOptional() // Теперь это необязательное поле
	// @IsString()
	// text?: string

	@Transform(({ value }) => parseInt(value, 10)) // Преобразование в целое число
	@IsInt({ message: 'sliderId must be an integer number' }) // Убедись, что здесь используется IsInt
	sliderId: number

	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => SlideDto)
	slides: SlideDto[]
}
