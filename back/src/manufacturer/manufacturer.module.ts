import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { ManufacturerService } from './manufacturer.service'
import { ManufacturerController } from './manufacturer.controller'

@Module({
	providers: [PrismaService, ManufacturerService],
	controllers: [ManufacturerController],
	exports: [ManufacturerService]
})
export class ManufacturerModule {}
