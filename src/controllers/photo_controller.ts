import Debug from 'debug'
import { Request, Response } from 'express'
import { validationResult, matchedData } from 'express-validator'
import { getPhotos, getPhotoById, createPhoto, updatePhoto, deletePhoto, checkOwnershipPhoto } from '../services/photo_service'

const debug = Debug('api: 📸 photo_controller')

export const index = async (req: Request, res: Response) => {
	try {
		const photos = await getPhotos(req.token!.sub)
		res.send({
			status: 'success',
			data: photos.map(photo => {
				return {
					id: photo.id,
					title: photo.title,
					url: photo.url,
					comment: photo.comment
				}
			})
		})
	} catch (err) {
		return res.status(500).send({
			status: 'error',
			message: "Something wrong when trying to get photos"
		})
	}
}

export const show = async (req: Request, res: Response) => {
	const photoId = Number(req.params.photoId)
	if (!await checkOwnershipPhoto(req.token!.sub, photoId)) {
		return res.status(403).send({
			status: 'fail',
			message: "You don't have access to this photo"
		})
	}
	try {
		const photo = await getPhotoById(photoId)
		res.send({
			status: 'success',
			data: {
				id: photo.id,
				title: photo.title,
				url: photo.url,
				comment: photo.comment
			}
		})
	} catch (err) {
		return res.status(404).send({
			status: 'fail',
			message: "Photo not found"
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
		const photo = await createPhoto({
			title: validData.title,
			url: validData.url,
			comment: validData.comment,
			user_id: req.token!.sub
		})
		res.send({
			status: 'success',
			data: photo
		})
	} catch (err) {
		return res.status(500).send({
			status: 'error',
			message: "Something wrong when trying to store photo"
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
	const photoId = Number(req.params.photoId)
	if (!await checkOwnershipPhoto(req.token!.sub, photoId)) {
		return res.status(403).send({
			status: 'fail',
			message: "You don't have access to this photo"
		})
	}
	const validData = matchedData(req)
	try {
		const updatedPhoto = await updatePhoto(photoId, validData)
		res.send({
			status: 'success',
			data: updatedPhoto
		})
	} catch (err) {
		return res.status(500).send({
			status: 'error',
			message: "Something wrong when trying to update photo"
		})
	}
}

export const destroy = async (req: Request, res: Response) => {
	const photoId = Number(req.params.photoId)
	if (!await checkOwnershipPhoto(req.token!.sub, photoId)) {
		return res.status(403).send({
			status: 'fail',
			message: "You don't have access to this photo"
		})
	}
	try {
		await deletePhoto(photoId)
		res.send({
			status: 'success',
			message: `Photo ${photoId} deleted`,
			data: null
		})
	} catch (err) {
		return res.status(500).send({
			status: 'error',
			message: "Something wrong when trying to delete photo"
		})
	}
}