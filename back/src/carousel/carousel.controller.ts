import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	NotFoundException,
	Param,
	Patch,
	Post,
	Put,
	UploadedFile,
	UseInterceptors,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { CarouselService } from './carousel.service'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { FileInterceptor } from '@nestjs/platform-express'
import { CreateCarouselDto, UpdateCarouselDto } from './dto/create-carousel.dto'

@Controller('carousels')
export class CarouselController {
	constructor(private readonly carouselService: CarouselService) {}

	@Get()
	// @Auth()
	async getAll() {
		return this.carouselService.getAll()
	}

	@Get(':id')
	// @Auth()
	@UsePipes(new ValidationPipe())
	async getById(@Param('id') id: string) {
		const carousel = await this.carouselService.getById(+id)
		return carousel
	}

	@Post()
	@HttpCode(200)
	@UseInterceptors(FileInterceptor('file'))
	@UsePipes(new ValidationPipe({ transform: true }))
	async create(
		@Body() dto: CreateCarouselDto,
		@UploadedFile() file: Express.Multer.File
	) {
		return this.carouselService.create(dto, file)
	}

	@Put(':id')
	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	async update(@Param('id') id: string, @Body() dto: UpdateCarouselDto) {
		// return await this.carouselService.update(+id, dto)
		try {
			return await this.carouselService.update(+id, dto)
		} catch (error) {
			// Обработка ошибок
			throw error // Или вернуть кастомное сообщение
		}
	}

	@Delete(':id')
	@HttpCode(200)
	async delete(@Param('id') id: string) {
		try {
			return this.carouselService.delete(+id)
		} catch (error) {
			// Обработка ошибок, если производитель не найден
			if (error instanceof NotFoundException) {
				throw new NotFoundException(error.message)
			}
			throw new Error('An error occurred while deleting the carousel')
		}
	}
}
