import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	UploadedFile,
	UseInterceptors,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { CartService } from './cart.service'
import { FileInterceptor } from '@nestjs/platform-express'
import { createCartDto } from './dto/createCart.dto'

@Controller('carts')
export class CartController {
	constructor(private readonly cartService: CartService) {}

	@Get()
	@HttpCode(200)
	async getAllCart() {
		return this.cartService.getAll()
	}

	@Get(':id')
	async getById(@Param('id') id: string) {
		return this.cartService.getById(+id)
	}

	@Post()
	@HttpCode(200)
	@UseInterceptors(FileInterceptor('file'))
	@UsePipes(new ValidationPipe({ transform: true }))
	async create(
		@UploadedFile() file: Express.Multer.File,
		@Body() dto: createCartDto
	) {
		return await this.cartService.create(dto, file || null)
	}

	@Delete(':id')
	@HttpCode(200)
	async delete(@Param('id') id: string) {
		return this.cartService.delete(+id)
	}
}
