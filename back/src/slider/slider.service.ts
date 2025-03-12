import {
	Injectable,
	InternalServerErrorException,
	NotFoundException
} from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { SlideService } from 'src/slide/slide.service'

@Injectable()
export class SliderService {
	constructor(
		private prisma: PrismaService,
		private slideService: SlideService
	) {}

	async getAll() {
		return await this.prisma.slider.findMany()
	}

	async getById(id: number) {
		const sliderId = await this.prisma.slider.findUnique({
			where: { id }
		})
		if (!sliderId) {
			throw new NotFoundException('Slider not found')
		}
		return sliderId
	}

	/*
	async create(createSliderDto: CreateSliderDto) {
		return this.prisma.slider.create({
			data: {
				title: createSliderDto.title,
				text: createSliderDto.text
				// другие поля
			}
		})
	}
*/

	// async create(
	// 	sliderDto: CreateSliderDto,
	// 	slideDto: CreateSlideDto[],
	// 	files: Express.Multer.File[]
	// ) {
	// 	// Создание слайдера
	// 	const slider = await this.prisma.slider.create({
	// 		data: {
	// 			title: sliderDto.title,
	// 			text: sliderDto.text
	// 			// другие поля
	// 		}
	// 	})
	// 	// Создание слайдев и связывание их с слайдером
	// 	const createdSlides = await Promise.all(
	// 		slideDto.map(async (dto, index) => {
	// 			const file = files[index] // Предпологаем что файл соответсвует
	// 			return await this.createSlide(dto, file, slider.id)
	// 		})
	// 	)
	// 	return {
	// 		slider,
	// 		slides: createdSlides
	// 	}
	// }

	/*	
	async create(sliderDto: CreateSliderDto) {
		// Создаем слайдер
		const slider = await this.prisma.slider.create({
			data: {
				title: sliderDto.title,
				text: sliderDto.text
			}
		})

		// Создание слайдов и связываем их со слайдером
		if (sliderDto.slides && sliderDto.slides.length > 0) {
			const slidePromises = sliderDto.slides.map(slideDto => {
				return this.slideService.create(slideDto, slideDto.file, slider.id)
			})
			// Ждем, пока все слайды будут созданы
			await Promise.all(slidePromises)
		}
		return slider // Возвращаем созданный слайдер
	}

*/

	async create(
		slides: {
			title?: string
			text?: string
			filePath?: string
		}[]
	) {
		if (!slides || !Array.isArray(slides)) {
			throw new Error('Slides must be an array')
		}
		console.log('Slides to create:', slides)
		try {
			return await this.prisma.slider.create({
				data: {
					slides: {
						create: slides.map(slide => ({
							title: slide.title || null,
							text: slide.text || null,
							filePath: slide.filePath || null
						}))
					}
				}
			})
		} catch (error) {
			console.error('Error updating slider:', error)
			throw new Error('Could not update slider')
		}
	}

	async updateSlider(
		sliderId: number,
		slides: { title?: string; text?: string; filePath?: string }[]
	) {
		if (!slides || !Array.isArray(slides)) {
			throw new Error('Slides must be an array')
		}
		console.log('Slides to update:', slides)

		try {
			return await this.prisma.slider.update({
				where: { id: sliderId }, // Указываем, какой слайдер обновляем
				data: {
					slides: {
						create: slides.map(slide => ({
							title: slide.title || null,
							text: slide.text || null,
							filePath: slide.filePath || null
						}))
					}
				}
			})
		} catch (error) {
			console.error('Error updating slider:', error)
			throw new Error('Could not update slider')
		}
	}

	async delete(id: number) {
		const existingSlider = await this.prisma.slider.findUnique({
			where: { id }
		})

		if (!existingSlider) {
			throw new NotFoundException('Slider not found')
		}

		try {
			const deleteSlider = await this.prisma.slider.delete({
				where: { id }
			})
			return deleteSlider
		} catch (error) {
			console.error(`Error deleting slider with id ${id}:`, error)
			throw new InternalServerErrorException(
				'An error occurred while deleting the slider'
			)
		}
	}
}
