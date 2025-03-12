import { IsArray, IsOptional, IsString } from 'class-validator'
import { CreateSlideDto } from 'src/slide/dto/slide.dto'

export class CreateSliderDto {
	@IsString()
	title: string
	@IsString()
	text: string
	@IsArray()
	slides: CreateSlideDto[]
}

export class UpdateSliderDto {
	@IsString()
	title?: string // Заголовок может быть обновлен

	@IsString()
	@IsOptional()
	text?: string

	@IsArray()
	slides?: CreateSlideDto[] // Новый массив слайдов, если нужно обновить
}
