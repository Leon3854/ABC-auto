import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	UploadedFile,
	UseInterceptors,
	UsePipes
} from '@nestjs/common'
import { ImagesService } from './image.service'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CreateImageDto } from './dto/create-image.dto'
import { FileInterceptor } from '@nestjs/platform-express'
import { ValidationPipe } from '@nestjs/common'

@Controller('images')
export class ImageController {
	constructor(private readonly imagesService: ImagesService) {}

	@Get()
	async getAll() {
		return this.imagesService.getAll()
	}

	@Get(':id')
	async getById(@Param('id') id: string) {
		return this.imagesService.getById(+id)
	}

	@Get('by-slug/:slug')
	async getBySlug(@Param('slug') slug: string) {
		return this.imagesService.bySlug(slug)
	}

	@Get('category/:category')
	async getByCategory(@Param('category') category: string) {
		return this.imagesService.getByCategory(category)
	}

	@HttpCode(200)
	@Post()
	@UseInterceptors(FileInterceptor('file'))
	@UsePipes(new ValidationPipe({ transform: true }))
	async create(
		@UploadedFile() file: Express.Multer.File,
		@Body() dto: CreateImageDto
	) {
		return await this.imagesService.create(dto, file || null)
	}

	// @HttpCode(200)
	// @Post()
	// @UseInterceptors(FileInterceptor('file'))
	// @UsePipes(new ValidationPipe({ transform: true }))
	// async create(
	// 	@UploadedFile() file: Express.Multer.File,
	// 	@Body() dto: CreateImageDto
	// ) {
	// 	// console.log('Метод create вызван') // Проверка вызова метода
	// 	// Принудительное преобразование carId и categoryId в числа
	// 	if (dto.carId) {
	// 		return (dto.carId = +dto.carId)
	// 	}
	// 	if (dto.categoryId) {
	// 		return (dto.categoryId = +dto.categoryId)
	// 	}
	// 	console.log('DTO:', dto)

	// 	console.log('Car ID:', dto.carId) // Это уже число
	// 	console.log('Category ID:', dto.categoryId) // Это уже число
	// 	// Теперь вы можете использовать dto с корректными типами
	// 	console.log('Received DTO:', dto)

	// 	// Остальной код для обработки запроса (например, сохранение в базе данных)
	// 	return { message: 'Image created successfully', data: dto }
	// }

	// @UsePipes(new ValidationPipe())
	// @UseInterceptors(FileInterceptor('file')) // Используем FileInterceptor для обработки загружаемого файла
	// @Put(':id')
	// async update(
	// 	@Param('id') id: number,
	// 	@UploadedFile() file: Express.Multer.File, // Загружаемый файл
	// 	@Body() dto: CreateImageDto // DTO с данными обновления
	// ) {
	// 	// Вызываем метод обновления в сервисе, передавая ID, DTO и файл
	// 	return this.imagesService.update(+id, dto, file)
	// }

	// @HttpCode(200)
	// @Delete(':id')
	// async delete(@Param('id') id: string) {
	// 	return this.imagesService.delete(+id)
	// }
}
