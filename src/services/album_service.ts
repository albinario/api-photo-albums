import prisma from '../prisma'
import { CreateAlbumData, UpdateAlbumData } from '../types'

export const getAlbums = async (userId: number) => {
	return await prisma.album.findMany({
		where: {
			user_id: userId
		}
	})
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

export const connectPhotosToAlbum = async (photos: number[], albumId: number) => {
	return await prisma.album.update({
		where: {
			id: albumId
		},
		data: {
			photos: {
				connect: photos.map(photo => ({
					id: photo
				}))
			}
		}
	})
}

export const checkOwnershipAlbum = async (userId: number, albumId: number) => {
	const album = await prisma.album.findUnique({
		where: {
			id: albumId
		}
	})
	if (album && userId === album.user_id) {
		return true
	} else {
		return false
	}
}