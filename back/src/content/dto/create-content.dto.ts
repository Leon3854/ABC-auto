import { IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator'

export class CreateContentDto {
	@IsString()
	@IsNotEmpty({ message: 'Key should not be empty' })
	@Matches(/^.*$/, {
		message:
			'Key must be alphanumeric and can include underscores, commas, exclamation marks, question marks, dashes, and Russian letters'
	})
	key: string

	@IsString()
	@IsNotEmpty({ message: 'Content should not be empty' })
	@Matches(/^.*$/, {
		message:
			'Value must be alphanumeric and can include underscores, commas, exclamation marks, question marks, dashes, and Russian letters'
	})
	value: string

	@IsOptional()
	@IsString()
	icons?: string

	@IsOptional()
	@IsString()
	url?: string
}
