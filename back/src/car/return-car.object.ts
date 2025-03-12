import { Prisma } from '@prisma/client'
import { returnCategoryObject } from 'src/category/return-category.object'

export const carReturnObject: Prisma.CarSelect = {
	images: true,
	description: true,
	id: true,
	model: true,
	price: true,
	createdAt: true,
	slug: true,
	category: { select: returnCategoryObject }
}

export const carReturnObjectFullest: Prisma.CarSelect = {
	images: true,
	category: { select: returnCategoryObject }
}
