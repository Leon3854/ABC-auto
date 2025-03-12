import {
	BadRequestException,
	ConflictException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CreateManufacturerDto } from './dto/create-manufacturer.dto'
import { join } from 'path'
import { writeFile } from 'fs/promises'

@Injectable()
export class ManufacturerService {
	constructor(private prisma: PrismaService) {}

	async getAll() {
		return await this.prisma.manufacturer.findMany()
	}

	async findByName(name: string) {
		const existingName = await this.prisma.manufacturer.findUnique({
			where: {
				name
			}
		})
		if (!existingName) throw new NotFoundException('Not found name')
		return existingName
	}

	// async create(dto: CreateManufacturerDto, file: Express.Multer.File) {
	// 	const validMimeTypes = [
	// 		'image/jpeg',
	// 		'image/png',
	// 		'image/gif',
	// 		'image/webp',
	// 		'image/svg+xml'
	// 	]

	// 	// проверим тип файла
	// 	if (!validMimeTypes.includes(file.mimetype)) {
	// 		throw new BadRequestException(
	// 			'Invalid file type. Only JPEG, PNG, GIF, WEBP and SVG are allowed.'
	// 		)
	// 	}

	// 	// Создание и проверка файла на существование
	// 	const existingManufacturer = await this.prisma.manufacturer.findUnique({
	// 		where: { name: dto.name }
	// 	})

	// 	if (existingManufacturer) {
	// 		throw new ConflictException('Image with this poster already exists')
	// 	}

	// 	// Здесь сохраняем файл на сервере
	// 	const uploadPath = join(
	// 		__dirname,
	// 		'..',
	// 		'..',
	// 		'uploads/manufacturer',
	// 		file.originalname
	// 	)
	// 	try {
	// 		await writeFile(uploadPath, file.buffer)
	// 	} catch (error) {
	// 		throw new BadRequestException('Error saving file: ' + error.message)
	// 	}

	// 	// Формируем URL для доступа к файлу
	// 	const fileUrl = `${process.env.CORS_ORIGIN}/uploads/manufacturer/${file.originalname}`

	// 	// Создание записи в БД
	// 	return this.prisma.manufacturer.create({
	// 		data: {
	// 			name: dto.name,
	// 			logotype: fileUrl, // Используем поле logo для URL логотипа
	// 			url: uploadPath // Или вы можете сохранить путь к файлу
	// 		}
	// 	})
	// }

	async create(dto: CreateManufacturerDto, file: Express.Multer.File) {
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

		// Создание и проверка файла на существование
		const existingManufacturer = await this.prisma.manufacturer.findUnique({
			where: { name: dto.name }
		})

		if (existingManufacturer) {
			throw new ConflictException(
				'Manufacturer with this logotype already existing'
			)
		}

		let fileUrl: string | undefined
		let relativePath: string | undefined

		// Если файл загружен то сохраняем его на сервере
		if (file) {
			// Сохраняем файл на сервере
			const fileName = file.originalname.replace(/\s+/g, '_') // Заменяем пробелы на подчеркивания
			const uploadPath = join(
				__dirname,
				'..',
				'..',
				'uploads/manufacturer',
				fileName
			)
			try {
				await writeFile(uploadPath, file.buffer)
			} catch (error) {
				throw new BadRequestException('Error saving file:' + error.message)
			}

			// Формируем относительный путь к файлу
			relativePath = `uploads/manufacturer/${fileName}`
			// Формируем URL для доступа к файлу
			const baseUrl = process.env.VITE_SERVER_URL || 'http://localhost:3200' // Используем переменную окружения
			// Формируем URL для доступа к файлу
			fileUrl = `${baseUrl}/${relativePath}`
		}

		return this.prisma.manufacturer.create({
			data: {
				name: dto.name,
				logotype: fileUrl, // Используем поле logo для URL логотипа
				url: relativePath // Или вы можете сохранить путь к файлу
			}
		})
	}

	async update(
		id: string,
		dto: CreateManufacturerDto,
		file?: Express.Multer.File
	) {
		const validMimeTypes = [
			'image/jpeg',
			'image/png',
			'image/gif',
			'image/webp',
			'image/svg+xml'
		]

		// Преобразуем id из строки в число
		const manufacturerId = parseInt(id, 10)

		// Проверяем, существует ли производитель
		const existingManufacturer = await this.prisma.manufacturer.findUnique({
			where: { id: manufacturerId }
		})

		if (!existingManufacturer) {
			throw new NotFoundException('Manufacturer not found')
		}

		// Если файл был загружен, проверяем тип файла
		let fileUrl: string | undefined
		if (file) {
			if (!validMimeTypes.includes(file.mimetype)) {
				throw new BadRequestException(
					'Invalid file type. Only JPEG, PNG, GIF, WEBP and SVG are allowed.'
				)
			}

			let relativePath: string | undefined

			// Сохраняем файл на сервере
			const fileName = file.originalname.replace(/\s+/g, '_') // Заменяем пробелы на подчеркивания
			const uploadPath = join(
				__dirname,
				'..',
				'..',
				'uploads/manufacturer',
				fileName
			)
			await writeFile(uploadPath, file.buffer)

			// Формируем URL для доступа к файлу
			// fileUrl = `${process.env.CORS_ORIGIN}/uploads/manufacturer/${file.originalname}`

			// Формируем относительный путь к файлу
			relativePath = `uploads/manufacturer/${fileName}`
			// Формируем URL для доступа к файлу
			const baseUrl = process.env.VITE_SERVER_URL || 'http://localhost:3200' // Используем переменную окружения
			// Формируем URL для доступа к файлу
			fileUrl = `${baseUrl}/${relativePath}`
		}

		// Обновляем запись в БД
		return this.prisma.manufacturer.update({
			where: { id: manufacturerId },
			data: {
				name: dto.name,
				logotype: fileUrl ? fileUrl : existingManufacturer.logotype // Обновляем логотип только если файл был загружен
			}
		})
	}

	async delete(id: number) {
		const existingManufacturer = await this.prisma.manufacturer.findUnique({
			where: {
				id
			}
		})
		if (!existingManufacturer)
			throw new NotFoundException('Manufacturer not found')

		try {
			// Удаляем производителя
			const deletedManufacturer = await this.prisma.manufacturer.delete({
				where: { id }
			})

			// Логируем успешное удаление (можно использовать ваш механизм логирования)
			console.log(`Manufacturer with id ${id} deleted successfully`)

			// Возвращаем информацию о удаленном производителе
			return deletedManufacturer
		} catch (error) {
			// Обрабатываем возможные ошибки при удалении
			console.error(`Error deleting manufacturer with id ${id}:`, error)
			throw new Error('An error occurred while deleting the manufacturer')
		}
	}
}
