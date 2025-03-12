import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	InternalServerErrorException,
	NotFoundException,
	Param,
	Post,
	Put,
	UploadedFile,
	UseInterceptors,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { SlideService } from './slide.service'
import { FileInterceptor } from '@nestjs/platform-express'
import { CreateSlideDto, UpdateSlideDto } from './dto/slide.dto'

@Controller('slides')
export class SlideController {
	constructor(private readonly slideService: SlideService) {}

	@Get()
	@HttpCode(200)
	async getAll() {
		return await this.slideService.getAll()
	}

	@Get(':id')
	@UsePipes(new ValidationPipe())
	async getById(@Param('id') id: string) {
		return await this.slideService.getById(+id)
	}

	@Get('sliderId/:id') // Обработка GET-запросов по маршруту /slides/sliderId/:id
	async getSlidesBySliderId(@Param('id') sliderId: string) {
		const id = parseInt(sliderId, 10) // Преобразуем строку в число

		// Проверка на валидность id
		if (isNaN(id)) {
			throw new NotFoundException('Неверный идентификатор слайдера')
		}

		const slides = await this.slideService.getSlidesBySliderId(id)

		// Проверка, если слайды не найдены
		if (!slides || slides.length === 0) {
			throw new NotFoundException(
				'Слайды не найдены для данного идентификатора слайдера'
			)
		}

		// Возвращаем найденные слайды
		return slides
	}

	@Post()
	@UseInterceptors(FileInterceptor('file')) // Предполагаем, что файл передается с именем 'file'
	async create(
		@Body() dto: CreateSlideDto,
		@UploadedFile() file: Express.Multer.File
	) {
		// const sliderId = dto.sliderId // Предполагаем, что sliderId передается в DTO
		return await this.slideService.create(dto, file || null, dto.sliderId) // Передаем sliderId
	}

	// @Post()
	// @HttpCode(200)
	// @UseInterceptors(FileInterceptor('file'))
	// @UsePipes(new ValidationPipe({ transform: true }))
	// async create(
	// 	@UploadedFile() file: Express.Multer.File,
	// 	@Body() dto: CreateSlideDto
	// ) {
	// 	console.log('Received DTO:', dto) // Логирование входящих данных
	// 	return await this.slideService.create(dto, file || null)
	// }

	// @Put(':id')
	// @HttpCode(200)
	// @UsePipes(new ValidationPipe())
	// async update(@Param('id') id: string, @Body() dto: UpdateSlideDto) {
	// 	console.log('sliderId:', dto.sliderId)
	// 	return await this.slideService.update(+id, dto)
	// }

	@Delete(':id')
	@HttpCode(200)
	async deleteSlide(@Param('id') id: string) {
		try {
			return this.slideService.delete(+id)
		} catch (error) {
			// Обработка ошибок, если производитель не найден
			if (error instanceof NotFoundException) {
				throw new NotFoundException(error.message)
			}
			throw new Error('An error occurred while deleting the slide')
		}
	}
}
