import {
	BadRequestException,
	ConflictException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CreateContentDto } from './dto/create-content.dto'
import { join } from 'path'
import { writeFile } from 'fs/promises'

@Injectable()
export class ContentService {
	constructor(private prisma: PrismaService) {}

	async findByKey(key: string) {
		const existingContent = await this.prisma.content.findUnique({
			where: {
				key
			},
			select: {
				value: true,
				icons: true,
				url: true // Если нужно
			}
		})
		if (!existingContent) throw new NotFoundException('Not found key')
		return existingContent
	}

	private async findContentById(id: number) {
		const content = await this.prisma.content.findUnique({ where: { id } })
		if (!content) throw new NotFoundException('Content not found')
		return content
	}

	async getAll() {
		return await this.prisma.content.findMany()
	}

	async create(dto: CreateContentDto, file: Express.Multer.File) {
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

		const existingContent = await this.prisma.content.findUnique({
			where: { key: dto.key }
		})

		if (existingContent) {
			throw new ConflictException('Content with this content already exists')
		}

		let fileUrl: string | undefined
		let relativePath: string | undefined

		// Если файл был загружен, сохраняем его на сервере
		if (file) {
			// Сохраняем файл на сервере
			const fileName = file.originalname.replace(/\s+/g, '_') // Заменяем пробелы на подчеркивания
			const uploadPath = join(__dirname, '..', '..', 'uploads/icons', fileName)
			try {
				await writeFile(uploadPath, file.buffer)
			} catch (error) {
				throw new BadRequestException('Error saving file: ' + error.message)
			}

			// Формируем относительный путь к файлу
			relativePath = `uploads/icons/${fileName}`
			// Формируем URL для доступа к файлу
			const baseUrl = process.env.VITE_SERVER_URL || 'http://localhost:3200' // Используем переменную окружения
			// Формируем URL для доступа к файлу
			fileUrl = `${baseUrl}/${relativePath}`
		}

		return this.prisma.content.create({
			data: {
				key: dto.key,
				value: dto.value,
				icons: fileUrl, // Используем поле logo для URL логотипа
				url: relativePath // Или вы можете сохранить путь к файлу
			}
		})
	}

	async update(id: number, dto: CreateContentDto) {
		const existingContent = await this.findContentById(id) // Используем вспомогательный метод

		//  Проверка уникальности ключа
		if (dto.key !== existingContent.key) {
			const keyExists = await this.prisma.content.findUnique({
				where: { key: dto.key }
			})
			if (keyExists) {
				throw new ConflictException('Content with this key already exists')
			}
		}
		return this.prisma.content.update({
			where: {
				id
			},
			data: {
				key: dto.key,
				value: dto.value
			}
		})
	}

	async delete(id: number) {
		await this.findContentById(id) // вспомогательный метод
		return this.prisma.content.delete({
			where: { id }
		})
	}
}
