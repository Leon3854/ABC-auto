import { Module } from '@nestjs/common'
import { CarouselController } from './carousel.controller'
import { CarouselService } from './carousel.service'
import { PrismaService } from 'src/prisma.service'

@Module({
	providers: [PrismaService, CarouselService],
	controllers: [CarouselController],
	exports: [CarouselService]
})
export class CarouselModule {}
