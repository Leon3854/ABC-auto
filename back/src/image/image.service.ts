import {
	BadRequestException,
	ConflictException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CreateImageDto } from './dto/create-image.dto'
import { join } from 'path'
import { writeFile } from 'fs/promises'

@Injectable()
export class ImagesService {
	constructor(private prisma: PrismaService) {}

	async getAll() {
		return this.prisma.image.findMany()
	}

	async getById(id: number) {
		const image = await this.prisma.image.findMany({
			where: {
				category: { id }
			}
		})
		if (!image) {
			throw new Error('Image not found')
		}
		return image
	}

	async getByCategory(categorySlug: string) {
		try {
			// Сначала найдем категорию по slug
			const category = await this.prisma.category.findUnique({
				where: { slug: categorySlug }
			})

			// Если категория не найдена, выбрасываем исключение
			if (!category) {
				throw new NotFoundException('Category not found')
			}
			return await this.prisma.image.findMany({
				where: {
					categoryId: category.id // Используем id категории для поиска изображений
				}
			})
		} catch (error) {
			throw new Error('Ошибка полученя изображения' + error.message)
		}
	}

	async bySlug(slug: string) {
		// Сначала найдем категорию по slug
		const category = await this.prisma.category.findUnique({
			where: { slug: slug }
		})

		// Если категория не найдена, выбрасываем исключение
		if (!category) {
			throw new NotFoundException('Category not found')
		}
		const images = await this.prisma.image.findMany({
			where: {
				categoryId: category.id // Используем id категории для поиска изображений
			},
			include: { category: true }
		})
		if (!images) {
			throw new NotFoundException('Image not found')
		}

		// Если изображения не найдены, можно выбросить исключение или вернуть пустой массив
		if (!images.length) {
			throw new NotFoundException('Images not found for this category')
		}
		return images
	}

	async create(dto: CreateImageDto, file: Express.Multer.File) {
		const validMimeTypes = [
			'image/jpeg',
			'image/png',
			'image/gif',
			'image/webp',
			'image/svg+xml'
		]
		// проверим тип файла
		if (file && !validMimeTypes.includes(file.mimetype)) {
			throw new BadRequestException(
				'Invalid file type. Only JPEG, PNG, GIF, WEBP and SVG are allowed.'
			)
		}

		let fileUrl: string | undefined
		let relativePath: string | undefined

		if (file) {
			// Сохраняем файл на сервере
			const fileName = file.originalname.replace(/\s+/g, '_') // Заменяем пробелы на подчеркивания
			const uploadPath = join(__dirname, '..', '..', 'uploads/cars', fileName)
			try {
				await writeFile(uploadPath, file.buffer)
			} catch (error) {
				throw new BadRequestException('Error saving file: ' + error.message)
			}

			// Формируем относительный путь к файлу
			relativePath = `uploads/cars/${fileName}`
			// Формируем URL для доступа к файлу
			const baseUrl = process.env.VITE_SERVER_URL || 'http://localhost:3200' // Используем переменную окружения
			// Формируем URL для доступа к файлу
			fileUrl = `${baseUrl}/${relativePath}`
		}

		return this.prisma.image.create({
			data: {
				imageId: dto.imageId,
				title: dto.title,
				filename: fileUrl
			}
		})
	}

	// async update(id: number, dto: CreateImageDto, file?: Express.Multer.File) {
	// 	// поиск изображение по его айди есть или нет
	// 	const existingImage = await this.prisma.image.findUnique({
	// 		where: { id }
	// 	})
	// 	if (!existingImage) {
	// 		throw new NotFoundException('Image not found!')
	// 	}

	// 	// Переменная для хранения обновленных данных
	// 	const updatedData: any = {
	// 		imageId: dto.imageId || existingImage.imageId, // Используем существующий imageId, если новый не передан
	// 		title: dto.title || existingImage.title, // Если title не передан, используем существующий
	// 		carId: dto.carId || existingImage.carId, // Если carId не передан, используем существующий
	// 		categoryId: dto.categoryId || existingImage.categoryId // Если categoryId не передан, используем существующий
	// 	}

	// 	let fileUrl: string | undefined
	// 	let relativePath: string | undefined
	// 	// Если файл загружен, обновляем его

	// 	if (file) {
	// 		const validMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']

	// 		if (!validMimeTypes.includes(file.mimetype)) {
	// 			throw new BadRequestException(
	// 				'Invalid file type. Only JPEG, PNG, WEBP and GIF are allowed.'
	// 			)
	// 		}

	// 		// Сохранение нового файла на сервере
	// 		const fileName = file.originalname.replace(/\s+/g, '_') // Заменяем пробелы на подчеркивания
	// 		const uploadPath = join(__dirname, '..', '..', 'uploads/cars', fileName)
	// 		await writeFile(uploadPath, file.buffer)

	// 		// Формируем относительный путь к файлу
	// 		relativePath = `uploads/icons/${fileName}`
	// 		// Формируем URL для доступа к файлу
	// 		const baseUrl = process.env.VITE_SERVER_URL || 'http://localhost:3200' // Используем переменную окружения
	// 		// Формируем URL для доступа к файлу
	// 		fileUrl = `${baseUrl}/${relativePath}`

	// 		// Обновляем URL и имя файла на новый
	// 		updatedData.url = fileUrl
	// 		updatedData.filename = fileName // Обновляем имя файла
	// 	} else {
	// 		// Если файл не передан, используем существующие значения
	// 		updatedData.url = existingImage.url
	// 		updatedData.filename = existingImage.filename
	// 	}

	// 	// Обновляем запись в БД
	// 	return this.prisma.image.update({
	// 		where: {
	// 			id
	// 		},
	// 		data: updatedData
	// 	})
	// }

	async delete(id: number) {
		const image = await this.prisma.image.findUnique({
			where: { id }
		})

		if (!image) {
			throw new NotFoundException('Image not found')
		}

		return this.prisma.image.delete({
			where: { id }
		})
	}
}
