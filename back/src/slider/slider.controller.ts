import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	ParseIntPipe,
	Post,
	Put,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { SliderService } from './slider.service'
import { CreateSlidersDto } from './dto/sliders.dto'

@Controller('sliders')
export class SliderController {
	constructor(private readonly sliderService: SliderService) {}

	@Get()
	async getAll() {
		return await this.sliderService.getAll()
	}

	@Get(':id')
	@UsePipes(new ValidationPipe())
	async getById(@Param('id') id: string) {
		return await this.sliderService.getById(+id)
	}

	@Post()
	async createSlider(@Body() createSlidersDto: CreateSlidersDto) {
		// console.log('Received DTO:', createSlidersDto) // Логирование входящих данных
		// console.log(createSlidersDto) // Проверьте, что данные приходят корректно
		if (!createSlidersDto.slides) {
			// console.error('Slides are undefined')
			throw new Error('Slides are undefined')
		}
		return this.sliderService.create(createSlidersDto.slides)
	}

	@Put(':id') // Используем PUT для обновления
	async updateSlider(
		@Param('id', ParseIntPipe) sliderId: number, // Применяем ParseIntPipe для автоматического преобразования
		@Body() slides: CreateSlidersDto // Получаем новые слайды из тела запроса
	) {
		return this.sliderService.updateSlider(sliderId, slides.slides)
	}

	@Delete(':id')
	@HttpCode(200)
	async remove(@Param('id', ParseIntPipe) id: number) {
		return this.sliderService.delete(id)
	}
}
