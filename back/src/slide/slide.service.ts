import {
	BadRequestException,
	ConflictException,
	Injectable,
	InternalServerErrorException,
	NotFoundException
} from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CreateSlideDto, UpdateSlideDto } from './dto/slide.dto'
import { writeFile } from 'fs/promises'
import { join } from 'path'

@Injectable()
export class SlideService {
	constructor(private readonly prisma: PrismaService) {}

	async getAll() {
		return this.prisma.slide.findMany()
	}

	async getById(id: number) {
		const slideId = await this.prisma.slide.findUnique({
			where: { id }
		})
		if (!slideId) {
			throw new NotFoundException('Slide is not found')
		}
		return slideId
	}

	async getSlidesBySliderId(sliderId: number) {
		// Получаем слайды из базы данных, фильтруя по sliderId
		const slides = await this.prisma.slide.findMany({
			where: {
				sliderId: sliderId // Фильтруем по sliderId
			}
		})

		return slides // Возвращаем найденные слайды
	}

	// async getSlidesBySliderId(sliderId: number) {
	// 	const slides = await this.prisma.slide.findMany()

	// 	const sliderIds = [
	// 		...new Set(
	// 			slides
	// 				.filter(slide => slide.sliderId === sliderId)
	// 				.map(slide => slide.sliderId)
	// 		)
	// 	]
	// 	return sliderIds
	// }

	async create(
		dto: CreateSlideDto,
		file: Express.Multer.File,
		sliderId: number
	) {
		const validMimeTypes = [
			'image/jpeg',
			'image/png',
			'image/gif',
			'image/webp',
			'image/svg+xml'
		]

		// Проверяем тип файла
		if (file && !validMimeTypes.includes(file.mimetype)) {
			throw new BadRequestException(
				'Invalid file type. Only JPEG, PNG, GIF, WEBP and SVG are allowed.'
			)
		}

		const existingSlide = await this.prisma.slide.findUnique({
			where: { title: dto.title }
		})

		if (existingSlide) {
			throw new BadRequestException('Content with this title already exists')
		}

		let fileUrl: string | undefined

		// Если файл был загружен, сохраняем его на сервере
		if (file) {
			// Сохраняем файл на сервере
			const fileName = file.originalname.replace(/\s+/g, '_') // Заменяем пробелы на подчеркивания
			const uploadPath = join(__dirname, '..', '..', 'uploads/sliders/', fileName)
			await writeFile(uploadPath, file.buffer)

			// Формируем URL для доступа к файлу
			const baseUrl = process.env.VITE_SERVER_URL || 'http://localhost:3200/api'
			fileUrl = `${baseUrl}/uploads/sliders/${fileName}`
		}

		// Перобразуем в число
		// const sliderId = parseInt(dto.sliderId, 10)
		// const sliderId = +dto.sliderId

		try {
			return await this.prisma.slide.create({
				data: {
					title: dto.title || null,
					text: dto.text || null,
					filePath: fileUrl || null, // Используем filePath вместо file
					sliderId: +dto.sliderId // Убедитесь, что здесь используется sliderId из DTO
				}
			})
		} catch (error) {
			throw new BadRequestException('Error creating slide: ' + error.message)
		}
	}

	async update(id: number, dto: UpdateSlideDto) {
		const existingSlide = await this.prisma.slide.findUnique({
			where: { id }
		})
		if (!existingSlide) {
			throw new NotFoundException('Slide not found')
		}

		if (dto.title !== existingSlide.title) {
			const titleExists = await this.prisma.slide.findUnique({
				where: { title: dto.title }
			})
			if (titleExists) {
				throw new ConflictException('Slide with title already exists')
			}
		}
		return this.prisma.slide.update({
			where: { id },
			data: {
				title: dto.title,
				text: dto.text,
				filePath: dto.filePath,
				sliderId: dto.sliderId
			}
		})
	}

	async delete(id: number) {
		const slideId = await this.prisma.slide.findUnique({
			where: { id }
		})
		if (!slideId) {
			throw new NotFoundException('Slide not found')
		}

		try {
			const deleteSlide = await this.prisma.slide.delete({
				where: { id }
			})
			if (!deleteSlide) {
				throw new NotFoundException(`Slide with id ${id} deleted successfully`)
			}
			return deleteSlide
		} catch (error) {
			console.error(`Error deleting slide with id ${id}:`, error)
			throw new Error('An error occurred while deleting the slide')
		}
	}
}
