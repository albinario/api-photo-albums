import prisma from '../prisma'
import { CreatePhotoData, UpdatePhotoData } from '../types'

export const getPhotos = async (userId: number) => {
	return await prisma.photo.findMany({
		where: {
			user_id: userId
		}
	})
}

export const checkOwnershipPhoto = async (userId: number, photoId: number) => {
	const photo = await prisma.photo.findUnique({
		where: {
			id: photoId
		}
	})
	if (photo && userId === photo.user_id) {
		return true
	} else {
		return false
	}
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

export const isPhotoInAlbum = async (photoId: number, albumId: number) => {
	const album = await prisma.album.findUnique({
		where: {
			id: albumId
		},
		include: {
			photos: true
		}
	})
	return album?.photos.some(photo => photo.id === photoId)
}