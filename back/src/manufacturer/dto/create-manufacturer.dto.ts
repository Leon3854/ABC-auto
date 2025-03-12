import { IsNotEmpty, IsString, Length } from 'class-validator'

export class CreateManufacturerDto {
	@IsString()
	@IsNotEmpty()
	@Length(1, 255) //Ограничем длину
	name: string
}
