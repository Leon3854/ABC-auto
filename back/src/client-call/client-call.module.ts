import { Module } from '@nestjs/common'
import { ClientCallService } from './client-call.service'
import { ClientCallController } from './client-call.controller'
import { PrismaService } from 'src/prisma.service'

@Module({
	controllers: [ClientCallController],
	providers: [PrismaService, ClientCallService],
	exports: [ClientCallService]
})
export class ClientCallModule {}
