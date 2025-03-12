import {
	BadRequestException,
	ConflictException,
	Injectable
} from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { clientCallDto } from './dto/clientCallDto.dto'

@Injectable()
export class ClientCallService {
	constructor(private prisma: PrismaService) {}

	async getAll() {
		return await this.prisma.clientCall.findMany()
	}

	async getById(id: number) {
		const existingId = await this.prisma.clientCall.findUnique({
			where: { id: id }
		})
		if (!existingId)
			throw new BadRequestException('Client with this ID wos not found')
		return existingId
	}

	async create(dto: clientCallDto) {
		// console.log('Incoming data:', dto)

		return this.prisma.clientCall.create({
			data: {
				callName: dto.callName,
				callPhone: dto.callPhone
			}
		})
	}

	async update(id: number, dto: clientCallDto) {
		return this.prisma.clientCall.update({
			where: { id },
			data: {
				callName: dto.callName,
				callPhone: dto.callPhone
			}
		})
	}

	async delete(id: number) {
		const existingId = await this.prisma.clientCall.findUnique({
			where: { id: id }
		})
		if (!existingId)
			throw new BadRequestException('Client with this ID wos not found')
		return this.prisma.clientCall.delete({ where: { id } })
	}
}
