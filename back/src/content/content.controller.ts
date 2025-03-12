import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	UploadedFile,
	UseInterceptors,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { ContentService } from './content.service'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CreateContentDto } from './dto/create-content.dto'
import { FileInterceptor } from '@nestjs/platform-express'

@Controller('contents')
export class ContentController {
	constructor(private readonly contentService: ContentService) {}

	@Get()
	// @Auth()
	async getAll() {
		return this.contentService.getAll()
	}

	@Get(':key')
	// @Auth()
	async getByKey(@Param('key') key: string) {
		const content = await this.contentService.findByKey(key)
		const baseUrl = 'http://localhost:3200'
		// Используйте BASE_URL из переменных окружения

		if (content.icons) {
			// Удаляем /api из URL, если он есть
			content.icons = content.icons.replace('/api', '') // Убираем api, чтобы получить доступ к статике
			if (
				!content.icons.startsWith('http://') &&
				!content.icons.startsWith('https://')
			) {
				content.icons = `${baseUrl}${content.icons}` // Создаем полный путь только если он не начался с протокола
			}
		}
		if (content.url) {
			content.url = content.url.replace(/\/api/g, '')
			if (
				!content.url.startsWith('http://') &&
				!content.url.startsWith('https://')
			) {
				content.url = `${baseUrl}/${content.url}` // Добавляем слеш перед относительным путем
			}
		}

		// console.log('content controller: ', content)
		return content
	}

	@Post()
	@HttpCode(200)
	@UseInterceptors(FileInterceptor('file'))
	@UsePipes(new ValidationPipe({ transform: true }))
	async create(
		@UploadedFile() file: Express.Multer.File,
		@Body() dto: CreateContentDto
	) {
		return await this.contentService.create(dto, file || null)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put(':id')
	// @Auth()
	async update(@Param('id') id: string, @Body() dto: CreateContentDto) {
		return this.contentService.update(+id, dto)
	}

	@HttpCode(200)
	// @Auth('admin')
	@Delete(':id')
	async delete(@Param('id') id: string) {
		return this.contentService.delete(+id)
	}
}
