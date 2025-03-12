import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { SliderService } from './slider.service'
import { SliderController } from './slider.controller'
import { SlideService } from 'src/slide/slide.service'

@Module({
	providers: [PrismaService, SliderService, SlideService],
	controllers: [SliderController],
	exports: [SliderService]
})
export class SliderModule {}
