import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { SlideService } from './slide.service'
import { SlideController } from './slide.controller'

@Module({
	providers: [PrismaService, SlideService],
	controllers: [SlideController],
	exports: [SlideService]
})
export class SlideModule {}
