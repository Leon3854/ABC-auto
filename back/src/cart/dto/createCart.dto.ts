import { IsOptional, IsString } from 'class-validator'

export class createCartDto {
	@IsString()
	@IsOptional()
	nameModel: string

	@IsString()
	offer: string

	@IsString()
	benefit: string

	@IsString()
	benefitPrice: string

	@IsString()
	present: string

	@IsString()
	startPrice: string

	@IsString()
	startCredit: string

	@IsString()
	motorPower: string

	@IsString()
	gasoline: string

	@IsString()
	speed: string

	@IsString()
	acceleration: string

	@IsString()
	image: string

	@IsString()
	reserve: string

	@IsString()
	buy: string

	@IsString()
	details: string
}
