import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { PrismaService } from './prisma.service'
import { CarModule } from './car/car.module'
import { PaginationService } from './pagination/pagination.service'
import { PaginationModule } from './pagination/pagination.module'
import { CategoryModule } from './category/category.module'

import { ImageController } from './image/image.controller'
import { ImagesService } from './image/image.service'
import { ImageModule } from './image/image.module'
import { ContentModule } from './content/content.module'
import { ManufacturerController } from './manufacturer/manufacturer.controller'
import { ManufacturerService } from './manufacturer/manufacturer.service'
import { ManufacturerModule } from './manufacturer/manufacturer.module'
import { CarouselService } from './carousel/carousel.service'
import { CarouselModule } from './carousel/carousel.module'
import { SliderController } from './slider/slider.controller'
import { SliderService } from './slider/slider.service'
import { SliderModule } from './slider/slider.module'
import { SlideController } from './slide/slide.controller'
import { SlideService } from './slide/slide.service'
import { SlideModule } from './slide/slide.module'
import { CartService } from './cart/cart.service'
import { CartController } from './cart/cart.controller'
import { CartModule } from './cart/cart.module'
import { ClientCallModule } from './client-call/client-call.module'
import { ClientCallService } from './client-call/client-call.service'
import { ClientCallController } from './client-call/client-call.controller'

@Module({
	imports: [
		AuthModule,
		UserModule,
		CarModule,
		PaginationModule,
		CategoryModule,
		ImageModule,
		ContentModule,
		ManufacturerModule,
		CarouselModule,
		SliderModule,
		SlideModule,
		CartModule,
		ClientCallModule
	],
	controllers: [
		AppController,
		ImageController,
		ManufacturerController,
		SliderController,
		SlideController,
		CartController,
		ClientCallController
	],
	providers: [
		AppService,
		PrismaService,
		PaginationService,
		ImagesService,
		ManufacturerService,
		CarouselService,
		SliderService,
		SlideService,
		CartService,
		ClientCallService
	]
})
export class AppModule {}
