import {
	BadRequestException,
	ConflictException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CreateCarouselDto, UpdateCarouselDto } from './dto/create-carousel.dto'
import { join } from 'path'
import { writeFile } from 'fs/promises'

@Injectable()
export class CarouselService {
	constructor(private prisma: PrismaService) {}

	async getAll() {
		return await this.prisma.carousel.findMany()
	}

	async getById(id: number) {
		const carouselById = await this.prisma.carousel.findUnique({
			where: { id }
		})
		if (!carouselById) throw new NotFoundException('Carousel id not found')

		return carouselById
	}

	async create(dto: CreateCarouselDto, file: Express.Multer.File) {
		const validMimeTypes = [
			'image/jpeg',
			'image/png',
			'image/gif',
			'image/webp',
			'image/svg+xml'
		]

		if (!validMimeTypes.includes(file.mimetype)) {
			throw new BadRequestException(
				'Invalid file type. Only JPEG, PNG, GIF, WEBP and SVG are allowed.'
			)
		}

		const existingCarouselTitle = await this.prisma.carousel.findMany({
			where: { title: dto.title }
		})

		if (existingCarouselTitle.length > 0) {
			throw new ConflictException('Carousel with the title existing')
		}

		let fileUrl: string | undefined
		let relativePath: string | undefined

		// Если файл был загружен, сохраняем его на сервере
		if (file) {
			// Сохраняем файл на сервере
			const fileName = file.originalname.replace(/\s+/g, '_') // Заменяем пробелы на подчеркивания
			const uploadPath = join(__dirname, '..', '..', 'uploads/sliders', fileName)
			try {
				await writeFile(uploadPath, file.buffer)
			} catch (error) {
				throw new BadRequestException('Error saving file: ' + error.message)
			}

			// Формируем относительный путь к файлу
			relativePath = `uploads/sliders/${fileName}`
			// Формируем URL для доступа к файлу
			const baseUrl = process.env.VITE_SERVER_URL || 'http://localhost:3200/api' // Используем переменную окружения
			// Формируем URL для доступа к файлу
			fileUrl = `${baseUrl}/${relativePath}`
		}

		return this.prisma.carousel.create({
			data: {
				title: dto.title,
				text: dto.text,
				url: fileUrl
			}
		})
	}

	async update(id: number, dto: UpdateCarouselDto) {
		const existingCarousel = await this.prisma.carousel.findUnique({
			where: { id } // Поиск по уникальному идентификатору
		})

		if (!existingCarousel) {
			throw new NotFoundException('Carousel not found')
		}

		// Проверка на уникальность заголовка только если заголовок изменился
		if (dto.title && dto.title !== existingCarousel.title) {
			const titleExists = await this.prisma.carousel.findFirst({
				where: { title: dto.title } // Проверка по заголовку
			})
			if (titleExists) {
				throw new ConflictException(
					'Carousel element with this title already exists'
				)
			}
		}

		// Обновление данных
		return this.prisma.carousel.update({
			where: { id }, // Обновление по уникальному идентификатору
			data: {
				title: dto.title,
				text: dto.text,
				url: dto.url
			}
		})
	}

	/*
	async update(title: string, dto: UpdateCarouselDto) {
		const existingCarousel = await this.prisma.carousel.findUnique({
			where: { title }
		})
		if (!existingCarousel) {
			throw new NotFoundException('Carousel not found')
		}

		if (existingCarousel.length > 0) {
			throw new ConflictException(
				'Carousel element with this title already exists'
			)
		}
		return this.prisma.carousel.update({
			where: {
				title
			},
			data: {
				title: dto.title,
				text: dto.text,
				url: dto.url
			}
		})
	}
	*/
	async delete(id: number) {
		const existingCarousel = await this.prisma.carousel.findUnique({
			where: { id }
		})

		if (!existingCarousel) {
			throw new NotFoundException('Slider not found')
		}

		try {
			const deleteCarousel = await this.prisma.carousel.delete({
				where: { id }
			})

			if (!deleteCarousel) {
				throw new NotFoundException('')
			}
			console.log(`Carousel with id ${id} deleted successfully`)
			return deleteCarousel
		} catch (error) {
			console.error(`Error deleting carousel with id ${id}:`, error)
			return new Error('An error occurred while deleting the carousel')
		}
	}
}
