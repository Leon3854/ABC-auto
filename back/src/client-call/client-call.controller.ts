import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { ClientCallService } from './client-call.service'
import { clientCallDto } from './dto/clientCallDto.dto'

@Controller('clients-calls')
export class ClientCallController {
	constructor(private readonly clientCallService: ClientCallService) {}

	@Get()
	@HttpCode(200)
	async getAll() {
		return this.clientCallService.getAll()
	}

	@Get(':id')
	async getById(@Param('id') id: string) {
		return this.clientCallService.getById(+id)
	}

	@Post()
	@HttpCode(200)
	async create(@Body() dto: clientCallDto) {
		return this.clientCallService.create(dto)
	}

	@Put(':id')
	@UsePipes(new ValidationPipe())
	async update(@Param('id') id: string, @Body() dto: clientCallDto) {
		return this.clientCallService.update(+id, dto)
	}

	@Delete(':id')
	@HttpCode(200)
	async delete(@Param('id') id: string) {
		return this.clientCallService.delete(+id)
	}
}
