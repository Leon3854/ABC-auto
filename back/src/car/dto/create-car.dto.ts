import { BodyType, FuelType } from '@prisma/client'
import { Type } from 'class-transformer'
import {
	ArrayMinSize,
	IsArray,
	IsEnum,
	IsNumber,
	IsOptional,
	IsString,
	ValidateNested
} from 'class-validator'
import { CreateImageDto } from 'src/image/dto/create-image.dto'

export class CreateCarDto {
	@IsString()
	@IsOptional()
	make: string

	@IsString()
	@IsOptional()
	model: string

	@IsNumber()
	@IsOptional()
	year: number

	@IsNumber()
	@IsOptional()
	price: number

	@IsOptional()
	@IsString()
	description?: string

	@IsOptional()
	@IsNumber()
	mileage: number

	@IsOptional()
	@IsString()
	color?: string

	@IsOptional()
	@IsString()
	slug?: string

	@IsEnum(FuelType) // для валидации fuelType
	fuelType: FuelType

	@IsEnum(BodyType) // для валидации bodyType
	bodyType: BodyType

	@IsArray()
	@ArrayMinSize(0)
	@ValidateNested({ each: true }) // Для валидации вложенных объектов
	@Type(() => CreateImageDto) // Убедитесь, что вы используете правильный класс
	images: CreateImageDto[] // Измените на `images`
}
