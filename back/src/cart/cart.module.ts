import { Module } from '@nestjs/common'
import { CartController } from './cart.controller'
import { PrismaService } from 'src/prisma.service'
import { CartService } from './cart.service'

@Module({
	controllers: [CartController],
	providers: [PrismaService, CartService],
	exports: [CartService]
})
export class CartModule {}
