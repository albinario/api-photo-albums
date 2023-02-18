import prisma from '../prisma'
import { Photo } from '@prisma/client'
import { CreateAlbumData, UpdateAlbumData } from '../types'

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

export const findAlbum = async (id: number) => {
	return await prisma.album.findUnique({
		where: {
			id: id
		}
	})
}

export const createAlbum = async (data: CreateAlbumData) => {
	return await prisma.album.create({
		data: data
	})
}


export const updateAlbum = async (id: number, data: UpdateAlbumData) => {
	return await prisma.album.update({
		where: {
			id: id
		},
		data: data
	})
}

export const deleteAlbum = async (id: number) => {
	return await prisma.album.delete({
		where: {
			id: id
		}
	})
}

export const connectPhotosToAlbum = async (photos: Photo[], albumId: number) => {
	return await prisma.album.update({
		where: {
			id: albumId
		},
		data: {
			photos: {
				connect: photos.map(photo => ({
					id: photo.id
				}))
			}
		}
	})
}