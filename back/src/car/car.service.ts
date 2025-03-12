import {
	BadRequestException,
	Injectable,
	InternalServerErrorException,
	NotFoundException
} from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CreateCarDto } from './dto/create-car.dto'
import { writeFile } from 'fs/promises'
import { join } from 'path'
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class CarService {
	constructor(private prisma: PrismaService) {}

	async getAll() {
		return await this.prisma.car.findMany()
	}

	async getById(id: number) {
		const existingCarId = await this.prisma.car.findUnique({
			where: { id: id }
		})
		if (!existingCarId) throw new NotFoundException('Car not found to by id')

		return existingCarId
	}

	async byMake(make: string) {
		try {
			const existingMake = await this.prisma.car.findMany({
				where: { make: make }
			})
			if (existingMake.length === 0)
				throw new NotFoundException('Car not found to by make')
			return existingMake
		} catch (error) {
			console.error('Error fetching cars by make:', error)
			throw new InternalServerErrorException(
				'An error occurred while fetching cars'
			)
		}
	}

	async byModel(model: string) {
		try {
			const existingModel = await this.prisma.car.findMany({
				where: { model: model }
			})
			if (existingModel.length === 0) {
				throw new NotFoundException('Model not found')
			}
			return existingModel
		} catch (error) {
			console.error('Error fetching cars by make:', error)
			throw new InternalServerErrorException(
				'An error occurred while fetching cars'
			)
		}
	}

	async byYear(year: number) {
		try {
			const existingYear = await this.prisma.car.findMany({
				where: { year: year }
			})
			if (existingYear.length === 0) {
				throw new NotFoundException('Model with this years not found')
			}
			return existingYear
		} catch (error) {
			console.error('Error fetching cars by make:', error)
			throw new InternalServerErrorException(
				'An error occurred while fetching cars'
			)
		}
	}

	async byPrice(price: number) {
		try {
			const existingPrice = await this.prisma.car.findMany({
				where: { price: price }
			})
			if (existingPrice.length === 0) {
				throw new NotFoundException('Model with this years not found')
			}
			return existingPrice
		} catch (error) {
			console.error('Error fetching cars by make:', error)
			throw new InternalServerErrorException(
				'An error occurred while fetching cars'
			)
		}
	}

	async byColor(color: string) {
		try {
			const existingColor = await this.prisma.car.findMany({
				where: { color: color }
			})
			if (existingColor.length === 0) {
				throw new NotFoundException('Model with this years not found')
			}
			return existingColor
		} catch (error) {
			console.error('Error fetching cars by make:', error)
			throw new InternalServerErrorException(
				'An error occurred while fetching cars'
			)
		}
	}

	async bySlug(slug: string) {
		try {
			const existingColor = await this.prisma.car.findMany({
				where: { slug: slug }
			})
			if (existingColor.length === 0) {
				throw new NotFoundException('Model with this years not found')
			}
			return existingColor
		} catch (error) {
			console.error('Error fetching cars by make:', error)
			throw new InternalServerErrorException(
				'An error occurred while fetching cars'
			)
		}
	}

	async create(dto: CreateCarDto) {
		const car = await this.prisma.car.create({
			data: {
				make: dto.make,
				model: dto.model,
				year: dto.year,
				price: dto.price,
				description: dto.description,
				mileage: dto.mileage,
				color: dto.color,
				slug: dto.slug,
				fuelType: dto.fuelType,
				bodyType: dto.bodyType,
				images: {
					create: dto.images.map(img => ({
						imageId: img.imageId, // Обязательно
						title: img.title, // Может быть необязательным
						filename: img.filename // Обязательно
					}))
				}
			},
			include: { images: true }
		})

		// Формируем ответ в нужном формате
		const response: CreateCarDto = {
			make: car.make,
			model: car.model,
			year: car.year,
			price: car.price,
			description: car.description,
			mileage: car.mileage,
			color: car.color,
			slug: car.slug,
			fuelType: car.fuelType,
			bodyType: car.bodyType,
			images: car.images.map(img => ({
				imageId: img.imageId, // Добавляем imageId
				filename: img.filename, // Добавляем filename
				carId: img.carId, // Если необходимо, добавьте carId
				title: img.title // Если необходимо, добавьте title
			})) // Теперь возвращаем все необходимые поля
		}

		return response
	}

	// async create(dto: CreateCarDto) {
	// 	const car = await this.prisma.car.create({
	// 		data: {
	// 			make: dto.make,
	// 			model: dto.model,
	// 			year: dto.year,
	// 			price: dto.price,
	// 			description: dto.description,
	// 			mileage: dto.mileage,
	// 			color: dto.color,
	// 			slug: dto.slug,
	// 			fuelType: dto.fuelType,
	// 			bodyType: dto.bodyType,
	// 			images: {
	// 				create: dto.images.map(img => ({
	// 					imageId: img.imageId, // Обязательно
	// 					title: img.title, // Может быть необязательным
	// 					filename: img.filename // Обязательно
	// 				}))
	// 			}
	// 		},
	// 		include: { images: true }
	// 	})

	// 	// Формируем ответ в нужном формате
	// 	const response: CreateCarDto = {
	// 		make: car.make,
	// 		model: car.model,
	// 		year: car.year,
	// 		price: car.price,
	// 		description: car.description,
	// 		mileage: car.mileage,
	// 		color: car.color,
	// 		slug: car.slug,
	// 		fuelType: car.fuelType,
	// 		bodyType: car.bodyType,
	// 		images: car.images.map(img => ({ carId: img.carId })) // Извлекаем только carId
	// 	}

	// 	return response
	// }

	// async create(dto: CreateCarDto) {
	// 	const images = [] // Массив для хранения объектов изображений

	// 	// Создание записи в БД с массивом изображений
	// 	const car = await this.prisma.car.create({
	// 		data: {
	// 			make: dto.make,
	// 			model: dto.model,
	// 			year: dto.year,
	// 			price: dto.price,
	// 			description: dto.description,
	// 			mileage: dto.mileage,
	// 			color: dto.color,
	// 			slug: dto.slug,
	// 			fuelType: dto.fuelType,
	// 			bodyType: dto.bodyType,
	// 			image: {
	// 				create: images // Создаем записи для всех изображений
	// 			}
	// 		}
	// 	})

	// 	return car.id // Возвращаем ID созданного автомобиля
	// }

	// async create(createCarDto: CreateCarDto, files: Express.Multer.File[]) {

	// 	const images = [] // Массив для хранения объектов изображений

	// 	for (const file of files) {
	// 		// Проверяем тип файла
	// 		if (!validMimeTypes.includes(file.mimetype)) {
	// 			throw new BadRequestException(
	// 				'Invalid file type. Only JPEG, PNG, GIF, WEBP and SVG are allowed.'
	// 			)
	// 		}

	// 		const fileName = file.originalname.replace(/\s+/g, '_') // Заменяем пробелы на подчеркивания
	// 		const uploadPath = join(__dirname, '..', '..', 'uploads/cars', fileName)

	// 		try {
	// 			await writeFile(uploadPath, file.buffer)
	// 		} catch (error) {
	// 			throw new BadRequestException('Error saving file: ' + error.message)
	// 		}

	// 		// Формируем относительный путь к файлу
	// 		const relativePath = `uploads/cars/${fileName}`
	// 		// Формируем URL для доступа к файлу
	// 		const baseUrl = process.env.CORS_ORIGIN || 'http://localhost:3200' // Используем переменную окружения
	// 		const fileUrl = `${baseUrl}/${relativePath}`

	// 		// Создаем объект для изображения с необходимыми полями
	// 		images.push({
	// 			url: fileUrl, // Поле URL
	// 			filename: fileName // Имя файла
	// 		})
	// 	}

	// 	// Создание записи в БД с массивом изображений
	// 	const car = await this.prisma.car.create({
	// 		data: {
	// 			make: createCarDto.make,
	// 			model: createCarDto.model,
	// 			year: createCarDto.year,
	// 			price: createCarDto.price,
	// 			description: createCarDto.description,
	// 			mileage: createCarDto.mileage,
	// 			color: createCarDto.color,
	// 			slug: createCarDto.slug,
	// 			fuelType: createCarDto.fuelType,
	// 			bodyType: createCarDto.bodyType,
	// 			image: {
	// 				// Изменено на images, чтобы соответствовать модели
	// 				create: images.map(image => ({
	// 					url: image.url,
	// 					filename: image.filename
	// 					// carId: createCarDto.carId, // Убедитесь, что carId не добавляется, если не нужен
	// 				}))
	// 			}
	// 		},
	// 		include: { image: true } // Включаем изображения в ответ
	// 	})

	// 	return car // Возвращаем автомобиль с изображениями
	// }

	// async create(createCarDto: CreateCarDto) {
	// 	const newCar = await this.prisma.car.create({
	// 		data: {
	// 			make: createCarDto.make,
	// 			model: createCarDto.model,
	// 			year: createCarDto.year,
	// 			price: createCarDto.price,
	// 			description: createCarDto.description,
	// 			mileage: createCarDto.mileage,
	// 			color: createCarDto.color,
	// 			slug: createCarDto.slug,
	// 			fuelType: createCarDto.fuelType,
	// 			bodyType: createCarDto.bodyType,
	// 			image: {
	// 				// Используйте image вместо images
	// 				create: createCarDto.image.map(image => ({
	// 					imageId: image.imageId,
	// 					url: image.url,
	// 					filename: image.filename // Убедитесь, что это поле есть
	// 				}))
	// 			}
	// 		}
	// 	})
	// 	return newCar
	// }

	// async update(id: number, updateCarDto: CreateCarDto) {
	// 	try {
	// 		const existingCar = await this.prisma.car.findUnique({
	// 			where: { id },
	// 			include: { image: true }
	// 		})

	// 		if (!existingCar) throw new NotFoundException('Car not found')

	// 		// Подготовка данных для обновления
	// 		const updatedData = {
	// 			make: updateCarDto.make ?? existingCar.make,
	// 			model: updateCarDto.model ?? existingCar.model,
	// 			year: updateCarDto.year ?? existingCar.year,
	// 			price: updateCarDto.price ?? existingCar.price,
	// 			description: updateCarDto.description ?? existingCar.description,
	// 			mileage: updateCarDto.mileage ?? existingCar.mileage,
	// 			color: updateCarDto.color ?? existingCar.color,
	// 			slug: updateCarDto.slug ?? existingCar.slug,
	// 			fuelType: updateCarDto.fuelType ?? existingCar.fuelType,
	// 			bodyType: updateCarDto.bodyType ?? existingCar.bodyType
	// 		}

	// 		// Обновление основных данных автомобиля
	// 		await this.prisma.car.update({
	// 			where: { id },
	// 			data: updatedData
	// 		})

	// 		// Обработка изображений
	// 		// if (updateCarDto.image) {
	// 		// 	// Удаляем изображения, которые больше не нужны
	// 		// 	const imagesToDelete = existingCar.image
	// 		// 		.filter(img => !updateCarDto.image.includes(img.url))
	// 		// 		.map(img => img.imageId)

	// 		// 	await this.prisma.image.deleteMany({
	// 		// 		where: { imageId: { in: imagesToDelete } }
	// 		// 	})

	// 		// 	// Добавляем новые изображения
	// 		// 	for (const [index, imageUrl] of updateCarDto.image.entries()) {
	// 		// 		const existingImage = existingCar.image.find(img => img.url === imageUrl)

	// 		// 		if (!existingImage) {
	// 		// 			await this.prisma.image.create({
	// 		// 				data: {
	// 		// 					imageId: `img-${Date.now()}-${index}`, // Генерация уникального идентификатора
	// 		// 					filename: `image-${index}`, // Пример имени файла
	// 		// 					url: imageUrl,
	// 		// 					carId: id // Убедитесь, что указываете carId
	// 		// 				}
	// 		// 			})
	// 		// 		}
	// 		// 	}
	// 		// }

	// 		if (updateCarDto.image) {
	// 			const existingImages = await this.prisma.image.findMany({
	// 				where: { carId: carId } // Предположим, что carId — это ID автомобиля, который вы обновляете
	// 			})

	// 			// Фильтруем существующие изображения, оставляя только те, которые не входят в обновленный список
	// 			const imagesToRemove = existingImages.filter(
	// 				existingImg =>
	// 					!updateCarDto.image.some(updatedImg => updatedImg.url === existingImg.url)
	// 			)

	// 			// Теперь вы можете удалить изображения, которые больше не нужны
	// 			await Promise.all(
	// 				imagesToRemove.map(img =>
	// 					this.prisma.image.delete({ where: { id: img.id } })
	// 				)
	// 			)
	// 		}

	// 		return id // Возвращаем идентификатор обновленного автомобиля
	// 	} catch (error) {
	// 		throw new Error(`Error updating car: ${error.message}`)
	// 	}
	// }

	// async delete(id: number) {
	// 	const existingCar = await this.prisma.car.findUnique({
	// 		where: { id }
	// 	})

	// 	if (!existingCar) throw new NotFoundException('Car not found')

	// 	return this.prisma.car.delete({
	// 		where: { id }
	// 	})
	// }
}
