import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtStrategy } from './jwt.strategy'
import { PrismaService } from 'src/prisma.service'
import { UserService } from 'src/user/user.service'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { getJwtConfig } from 'src/config/jwt.config'
import { UserModule } from 'src/user/user.module'

@Module({
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy, PrismaService, UserService],
	imports: [
		ConfigModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJwtConfig
		}),
		UserModule
	]
})
export class AuthModule {}
