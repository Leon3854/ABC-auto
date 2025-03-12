import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as dotenv from 'dotenv'
import { NestExpressApplication } from '@nestjs/platform-express'
import { join } from 'path'

// Загружаем переменные окружения
dotenv.config()
async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule)
	// доступ к папке с файлами
	app.useStaticAssets(join(__dirname, '..', 'uploads'), { prefix: '/uploads/' })
	app.setGlobalPrefix('api')
	app.enableCors() // для взаимодействия с клиентской стороной
	await app.listen(3200)
}
bootstrap()
