import prisma from '../prisma'
import { CreatePhotoData, UpdatePhotoData } from '../types'

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

export const findPhoto = async (id: number) => {
	return await prisma.photo.findUnique({
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

export const updatePhoto = async (id: number, data: UpdatePhotoData) => {
	return await prisma.photo.update({
		where: {
			id: id
		},
		data: data
	})
}

export const deletePhoto = async (id: number) => {
	await prisma.photo.delete({
		where: {
			id: id
		}
	})
}