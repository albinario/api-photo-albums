import Debug from 'debug'
import { Request, Response } from 'express'
import { validationResult, matchedData } from 'express-validator'
import { getAlbums, getAlbumById, createAlbum, updateAlbum, deleteAlbum, connectPhotosToAlbum, checkOwnershipAlbum, removePhotoFromAlbum } from '../services/album_service'
import { checkOwnershipPhoto } from '../services/photo_service'

const debug = Debug('api: 📔 album_controller')

export const index = async (req: Request, res: Response) => {
	try {
		const albums = await getAlbums(req.token!.sub)
		res.send({
			status: 'success',
			data: albums
		})
	} catch (err) {
		return res.status(500).send({
			status: 'error',
			message: "Something wrong when trying to get albums"
		})
	}
}

export const show = async (req: Request, res: Response) => {
	const albumId = Number(req.params.albumId)
	if (!await checkOwnershipAlbum(req.token!.sub, albumId)) {
		return res.status(403).send({
			status: 'fail',
			message: "You don't have access to this album"
		})
	}
	try {
		const album = await getAlbumById(albumId)
		res.send({
			status: 'success',
			data: album
		})
	} catch (err) {
		return res.status(404).send({
			status: 'fail',
			message: "Album not found"
		})
	}
}

export const store = async (req: Request, res: Response) => {
	const validationErrors = validationResult(req)
	if (!validationErrors.isEmpty()) {
		return res.status(400).send({
			status: 'fail',
			data: validationErrors.array()
		})
	}
	const validData = matchedData(req)
	try {
		const album = await createAlbum({
			title: validData.title,
			user_id: req.token!.sub
		})
		res.send({
			status: 'success',
			data: album
		})
	} catch (err) {
		return res.status(500).send({
			status: 'error',
			message: "Something wrong when trying to store album"
		})
	}
}

export const update = async (req: Request, res: Response) => {
	const validationErrors = validationResult(req)
	if (!validationErrors.isEmpty()) {
		return res.status(400).send({
			status: 'fail',
			data: validationErrors.array()
		})
	}
	const albumId = Number(req.params.albumId)
	if (!await checkOwnershipAlbum(req.token!.sub, albumId)) {
		return res.status(403).send({
			status: 'fail',
			message: "You don't have access to this album"
		})
	}
	const validData = matchedData(req)
	try {
		const updatedAlbum = await updateAlbum(albumId, validData)
		res.send({
			status: 'success',
			data: updatedAlbum
		})
	} catch (err) {
		return res.status(500).send({
			status: 'error',
			message: "Something wrong when trying to update album"
		})
	}
}

export const destroy = async (req: Request, res: Response) => {
	const albumId = Number(req.params.albumId)
	if (!await checkOwnershipAlbum(req.token!.sub, albumId)) {
		return res.status(403).send({
			status: 'fail',
			message: "You don't have access to this album"
		})
	}
	try {
		await deleteAlbum(albumId)
		res.send({
			status: 'success',
			message: `Album ${albumId} deleted`,
			data: null
		})	
	} catch (err) {
		return res.status(500).send({
			status: 'error',
			message: "Something wrong when trying to delete album"
		})
	}
}

export const connectPhotos = async (req: Request, res: Response) => {
	const validationErrors = validationResult(req)
	if (!validationErrors.isEmpty()) {
		return res.status(400).send({
			status: 'fail',
			data: validationErrors.array()
		})
	}
	const userId = req.token!.sub
	const albumId = Number(req.params.albumId)
	if (!await checkOwnershipAlbum(userId, albumId)) {
		return res.status(403).send({
			status: 'fail',
			message: "You don't have access to this album"
		})
	}
	const validData = matchedData(req)
	const photosToConnect: number[] = []
	if (typeof validData.photo_id === 'number') {
		photosToConnect.push(validData.photo_id)
	} else if (Array.isArray(validData.photo_id)) {
		validData.photo_id.forEach(async photoId => {
			if (!photosToConnect.includes(photoId)) { // clean out duplicates
				photosToConnect.push(photoId)
			}
		})
	}
	for (const photo of photosToConnect) {
		if (!await checkOwnershipPhoto(userId, photo)) {
			return res.status(403).send({
				status: 'fail',
				message: "You don't have access to one or more photos"
			})
		}
	}
	try {
		await connectPhotosToAlbum(photosToConnect, albumId)
		const album = await getAlbumById(albumId)
		res.send({
			status: 'success',
			data: album
		})
	} catch (err) {
		return res.status(500).send({
			status: 'error',
			message: "Something wrong when trying to connect a photo"
		})
	}
}

export const removePhoto = async (req: Request, res: Response) => {
	const userId = req.token!.sub
	const albumId = Number(req.params.albumId)
	if (!await checkOwnershipAlbum(userId, albumId)) {
		return res.status(403).send({
			status: 'fail',
			message: "You don't have access to this album"
		})
	}
	const photoId = Number(req.params.photoId)
	if (!await checkOwnershipPhoto(userId, photoId)) {
		return res.status(403).send({
			status: 'fail',
			message: "You don't have access to one or more photos"
		})
	}
	try {
		await removePhotoFromAlbum(albumId, photoId)
		const album = await getAlbumById(albumId)
		res.send({
			status: 'success',
			message: `Photo ${photoId} removed from Album ${albumId}`,
			data: album
		})
	} catch (err) {
		return res.status(500).send({
			status: 'error',
			message: "Something wrong when trying to remove a photo from an album"
		})
	}
}