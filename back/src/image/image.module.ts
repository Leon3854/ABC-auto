import { Module } from '@nestjs/common'
import { ImagesService } from './image.service'
import { PrismaService } from 'src/prisma.service'
import { ImageController } from './image.controller'
import { MulterModule } from '@nestjs/platform-express'

@Module({
	imports: [
		MulterModule.register({
			dest: './uploads'
		})
	],
	providers: [ImagesService, PrismaService],
	controllers: [ImageController],
	exports: [ImagesService]
})
export class ImageModule {}
