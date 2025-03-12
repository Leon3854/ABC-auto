import {
	ConflictException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { returnCategoryObject } from './return-category.object'
import { CategoryDto } from './dto/category.dto'
import { generateSlug } from 'src/utils/generate-slug'

@Injectable()
export class CategoryService {
	constructor(private prisma: PrismaService) {}

	async byId(id: number) {
		const category = await this.prisma.category.findUnique({
			where: { id },
			select: returnCategoryObject
		})
		if (!category) {
			throw new Error('Category not found')
		}
		return category
	}

	async bySlug(slug: string) {
		const category = await this.prisma.category.findUnique({
			where: {
				slug
			},
			select: returnCategoryObject
		})

		if (!category) {
			throw new NotFoundException('Category not found')
		}

		return category
	}

	async getall() {
		return this.prisma.category.findMany({
			select: returnCategoryObject
		})
	}

	async create(dto: CategoryDto) {
		const existingCategory = await this.prisma.category.findUnique({
			where: { name: dto.name }
		})

		if (existingCategory) {
			throw new ConflictException('Category with this name already exists')
		}

		return this.prisma.category.create({
			data: {
				name: dto.name,
				slug: generateSlug(dto.name)
			}
		})
	}

	async update(id: number, dto: CategoryDto) {
		return this.prisma.category.update({
			where: {
				id
			},
			data: {
				name: dto.name,
				slug: generateSlug(dto.name)
			}
		})
	}

	async delete(id: number) {
		return this.prisma.category.delete({
			where: {
				id
			}
		})
	}
}
