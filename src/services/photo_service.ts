import prisma from '../prisma'
import { CreatePhotoData } from '../types'

export const getPhotos = async () => {
	return await prisma.photo.findMany()
}

export const getPhotoById = async (id: number) => {
	return await prisma.photo.findUniqueOrThrow({
		where: {
			id: id
		}
	})
}

export const createPhoto = async (data: CreatePhotoData) => {	
	return await prisma.photo.create({
		data: data
	})
}