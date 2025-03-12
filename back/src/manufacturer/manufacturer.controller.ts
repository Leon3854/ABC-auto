import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	NotFoundException,
	Param,
	Post,
	Put,
	UploadedFile,
	UseInterceptors,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { ManufacturerService } from './manufacturer.service'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CreateManufacturerDto } from './dto/create-manufacturer.dto'
import { FileInterceptor } from '@nestjs/platform-express'
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'

@Controller('manufacturers')
export class ManufacturerController {
	constructor(private readonly manufacturerService: ManufacturerService) {}

	@Get()
	@Auth()
	async getAll() {
		return this.manufacturerService.getAll()
	}

	@Auth()
	@Get(':name')
	@UsePipes(new ValidationPipe({ transform: true }))
	async getByName(@Param('name') name: string) {
		const param = plainToClass(CreateManufacturerDto, { name })
		const errors = await validate(param)
		if (errors.length > 0) {
			throw new NotFoundException('Invalid parameter Name')
		}
		console.log(`Fetching manufacturer with name: ${name}`)
		return this.manufacturerService.findByName(name)
	}

	@Post()
	// @Auth()
	@HttpCode(200)
	@UseInterceptors(FileInterceptor('file'))
	@UsePipes(new ValidationPipe({ transform: true }))
	async create(
		@UploadedFile() file: Express.Multer.File,
		@Body() dto: CreateManufacturerDto
	) {
		return await this.manufacturerService.create(dto, file)
	}

	// @Auth()
	@Put(':id')
	@UsePipes(new ValidationPipe())
	@UseInterceptors(FileInterceptor('file'))
	async update(
		@Param('id') id: string,
		@UploadedFile() file: Express.Multer.File, // Загружаемый файл
		@Body() dto: CreateManufacturerDto // DTO с данными обновления
	) {
		return await this.manufacturerService.update(id, dto, file)
	}

	// @Auth()
	@Delete(':id')
	@HttpCode(200)
	async delete(@Param('id') id: string) {
		const manufacturerId = +id // Преобразуем id в число
		try {
			return await this.manufacturerService.delete(manufacturerId)
		} catch (error) {
			// Обработка ошибок, если производитель не найден
			if (error instanceof NotFoundException) {
				throw new NotFoundException(error.message)
			}
			// Обработка других ошибок
			throw new Error('An error occurred while deleting the manufacturer')
		}
	}
}
