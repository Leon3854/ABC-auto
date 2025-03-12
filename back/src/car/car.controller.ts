import {
	Body,
	Delete,
	Controller,
	Get,
	HttpCode,
	NotFoundException,
	Param,
	Post,
	Put,
	UsePipes,
	ValidationPipe,
	InternalServerErrorException,
	UseInterceptors,
	UploadedFiles,
	BadRequestException
} from '@nestjs/common'
import { CarService } from './car.service'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CreateCarDto } from './dto/create-car.dto'
import {
	FileFieldsInterceptor,
	FilesInterceptor
} from '@nestjs/platform-express'

@Controller('cars')
export class CarController {
	constructor(private readonly carService: CarService) {}

	@Get()
	// @Auth()
	async getAll() {
		return await this.carService.getAll()
	}

	@Get(':id')
	// @Auth()
	@UsePipes(new ValidationPipe())
	async getById(@Param('id') id: string) {
		const car = await this.carService.getById(+id)
		return car
	}

	@Get('make/:make')
	// @Auth()
	@UsePipes(new ValidationPipe())
	async getByMake(@Param('make') make: string) {
		try {
			const cars = await this.carService.byMake(make)
			return cars
		} catch (error) {
			// Логируем ошибку для диагностики
			console.error('Error fetching cars by make:', error)
			// Обрабатываем ошибки
			if (error instanceof NotFoundException) {
				throw error // Пробрасываем NotFoundException дальше
			}
			throw new InternalServerErrorException(
				'An error occurred while fetching cars'
			)
		}
	}

	@Get('model/:model')
	// @Auth()
	@UsePipes(new ValidationPipe())
	async getByModel(@Param('model') model: string) {
		try {
			const cars = await this.carService.byModel(model)
			return cars
		} catch (error) {
			console.error('Error fetching cars by make:', error)
			if (error instanceof NotFoundException) {
				throw error // Пробрасываем NotFoundException дальше
			}
			throw new InternalServerErrorException(
				'An error occurred while fetching cars'
			)
		}
	}

	@Get('year/:year')
	// @Auth()
	@UsePipes(new ValidationPipe())
	async getByYear(@Param('year') year: string) {
		try {
			const cars = await this.carService.byYear(+year)
			return cars
		} catch (error) {
			console.error('Error fetching cars by make:', error)
			if (error instanceof NotFoundException) {
				throw error // Пробрасываем NotFoundException дальше
			}
			throw new InternalServerErrorException(
				'An error occurred while fetching cars'
			)
		}
	}

	@Get('price/:price')
	// @Auth()
	@UsePipes(new ValidationPipe())
	async getByPrice(@Param('price') price: string) {
		try {
			const cars = await this.carService.byPrice(+price)
			return cars
		} catch (error) {
			console.error('Error fetching cars by make:', error)
			if (error instanceof NotFoundException) {
				throw error // Пробрасываем NotFoundException дальше
			}
			throw new InternalServerErrorException(
				'An error occurred while fetching cars'
			)
		}
	}

	@Get('color/:color')
	// @Auth()
	@UsePipes(new ValidationPipe())
	async getByColor(@Param('color') color: string) {
		try {
			const cars = await this.carService.byColor(color)
			return cars
		} catch (error) {
			console.error('Error fetching cars by make:', error)
			if (error instanceof NotFoundException) {
				throw error // Пробрасываем NotFoundException дальше
			}
			throw new InternalServerErrorException(
				'An error occurred while fetching cars'
			)
		}
	}

	@Get('slug/:slug')
	// @Auth()
	@UsePipes(new ValidationPipe())
	async getBySlug(@Param('slug') slug: string) {
		try {
			const cars = await this.carService.bySlug(slug)
			return cars
		} catch (error) {
			console.error('Error fetching cars by make:', error)
			if (error instanceof NotFoundException) {
				throw error // Пробрасываем NotFoundException дальше
			}
			throw new InternalServerErrorException(
				'An error occurred while fetching cars'
			)
		}
	}

	@Post()
	async create(@Body() dto: CreateCarDto) {
		return this.carService.create(dto)
	}

	// 	// Вызываем метод создания автомобиля
	// 	return this.carService.create(carData, files.images)
	// }

	// @Auth()
	// @Put(':id')
	// @HttpCode(200)
	// @UsePipes(new ValidationPipe())
	// async update(@Param('id') id: number, @Body() dto: CreateCarDto) {
	// 	try {
	// 		const updatedCar = await this.carService.update(+id, dto)
	// 		return {
	// 			status: 'success',
	// 			data: updatedCar
	// 		}
	// 	} catch (error) {
	// 		if (error instanceof NotFoundException) {
	// 			throw new NotFoundException('Car not found')
	// 		}
	// 		throw error // Пробрасываем другие ошибки
	// 	}
	// }

	// @Auth()
	// @Delete(':id')
	// @HttpCode(200)
	// async delete(@Param('id') id: string) {
	// 	return this.carService.delete(+id)
	// }
}
