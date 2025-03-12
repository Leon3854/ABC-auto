import { BodyType, FuelType } from '@prisma/client'
import { IsEnum, IsOptional, IsString } from 'class-validator'
import { PaginationDto } from 'src/pagination/dto/pagination.dto'

export enum EnumCarSort {
	HIGH_PRICE = 'high-price',
	LOW_PRICE = 'low-price',
	NEWEST = 'newest',
	OLDEST = 'oldest'
}

export class GetAllCarDto extends PaginationDto {
	@IsOptional()
	@IsEnum(EnumCarSort)
	sort?: EnumCarSort

	@IsOptional()
	@IsString()
	searchTerm?: string

	@IsOptional()
	@IsString()
	ratings?: string

	@IsOptional()
	@IsString()
	minPrice?: string

	@IsOptional()
	@IsString()
	maxPrice?: string

	@IsOptional()
	@IsString()
	categoryId?: string

	@IsOptional()
	@IsEnum(BodyType)
	bodyType?: BodyType

	@IsOptional()
	@IsEnum(FuelType)
	fuelType?: FuelType
}
