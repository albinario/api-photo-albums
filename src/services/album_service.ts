import prisma from '../prisma'
import { CreatePhotoData, UpdatePhotoData } from '../types'

export const getAlbums = async () => {
	return await prisma.album.findMany()
}

export const getAlbumById = async (id: number) => {
	return await prisma.album.findUniqueOrThrow({
		where: {
			id: id
		},
		include: {
			photos: true
		}
	})
}

export const createPhoto = async (data: CreatePhotoData) => {	
	return await prisma.album.create({
		data: data
	})
}

export const updatePhoto = async (id: number, data: UpdatePhotoData) => {
	return await prisma.album.update({
		where: {
			id: id
		},
		data: data
	})
}

export const deletePhoto = async (id: number) => {
	const album = await prisma.album.findUnique({
		where: {
			id: id
		}
	})
	if (!album) {
		throw new Error("Photo not found")
	}
	await prisma.album.delete({
		where: {
			id: id
		}
	})

}