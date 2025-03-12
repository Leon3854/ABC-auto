import {
	BadRequestException,
	ConflictException,
	Injectable
} from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { createCartDto } from './dto/createCart.dto'
import { join } from 'path'
import { writeFile } from 'fs/promises'

@Injectable()
export class CartService {
	constructor(private prisma: PrismaService) {}

	async getAll() {
		return await this.prisma.cart.findMany()
	}

	async getById(id: number) {
		const cartContent = await this.prisma.cart.findUnique({ where: { id } })
		if (!cartContent) throw new BadRequestException('Cart already existing')
		return cartContent
	}

	async create(dto: createCartDto, file: Express.Multer.File) {
		const validMimeTypes = [
			'image/jpeg',
			'image/png',
			'image/gif',
			'image/webp',
			'image/svg+xml'
		]

		// const existingModel = await this.prisma.cart.findFirst({
		// 	where: { title: dto.title }
		// })

		// if (!existingModel) throw new ConflictException('Model already existing')

		// проверим тип файла
		if (file && !validMimeTypes.includes(file.mimetype)) {
			throw new BadRequestException(
				'Invalid file type. Only JPEG, PNG, GIF, WEBP and SVG are allowed.'
			)
		}
		let fileUrl: string | undefined
		let relativePath: string | undefined

		// Если файл был загружен, сохраняем его на сервере
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

		return this.prisma.cart.create({
			data: {
				nameModel: dto.nameModel,
				offer: dto.offer,
				benefit: dto.benefit,
				benefitPrice: dto.benefitPrice,
				present: dto.present,
				startPrice: dto.startPrice,
				startCredit: dto.startCredit,
				motorPower: dto.motorPower,
				gasoline: dto.gasoline,
				speed: dto.speed,
				acceleration: dto.acceleration,
				image: fileUrl,
				reserve: dto.reserve,
				buy: dto.buy,
				details: dto.details
			}
		})
	}

	async update(id: number, dto: createCartDto, file: Express.Multer.File) {
		const existingModelId = await this.prisma.cart.findUnique({
			where: { id }
		})
		if (existingModelId) throw new ConflictException('Model already existing')

		let fileUrl: string | undefined
		let relativePath: string | undefined

		// Если файл был загружен, сохраняем его на сервере
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

		return this.prisma.cart.update({
			where: { id },
			data: {
				nameModel: dto.nameModel,
				offer: dto.offer,
				benefit: dto.benefit,
				benefitPrice: dto.benefitPrice,
				present: dto.present,
				startPrice: dto.startPrice,
				startCredit: dto.startCredit,
				motorPower: dto.motorPower,
				gasoline: dto.gasoline,
				speed: dto.speed,
				acceleration: dto.acceleration,
				image: fileUrl,
				reserve: dto.reserve,
				buy: dto.buy,
				details: dto.details
			}
		})
	}

	async delete(id: number) {
		const cartId = await this.prisma.cart.findUnique({ where: { id } })
		if (!cartId)
			throw new BadRequestException('Cart with this ID do not existing')
		return this.prisma.cart.delete({ where: { id } })
	}
}
