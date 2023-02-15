import Debug from 'debug'
import { Request, Response } from 'express'
import { validationResult, matchedData } from 'express-validator'
import { getPhotos, getPhotoById, createPhoto, updatePhoto } from '../services/photo_service'

const debug = Debug('api: 📸 photo_controller')

export const index = async (req: Request, res: Response) => {
	try {
		const photos = await getPhotos()
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
		res.status(500).send({
			status: 'error',
			message: "Something went wrong when trying to get photos"
		})
	}
}

export const show = async (req: Request, res: Response) => {
	const photoId = Number(req.params.photoId)
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
		res.status(404).send({
			status: 'fail',
			message: "Photo not found"
		})
	}
}

export const store = async (req: Request, res: Response) => {
	const validationErrors = validationResult(req)
	if (!validationErrors.isEmpty()) {
		res.status(400).send({
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
		res.status(500).send({
			status: 'error',
			message: "Something went wrong when trying to store photo"
		})
	}
}

export const update = async (req: Request, res: Response) => {
	const validationErrors = validationResult(req)
	if (!validationErrors.isEmpty()) {
		res.status(400).send({
			status: 'fail',
			data: validationErrors.array()
		})
	}
	const validData = matchedData(req)
	const photoId = Number(req.params.photoId)
	try {
		const photo = await updatePhoto(photoId, validData)
		res.send({
			status: 'success',
			data: photo
		})
	} catch (err) {
		res.status(500).send({
			status: 'error',
			message: "Something went wrong when trying to update photo"
		})
	}
}

export const destroy = async (req: Request, res: Response) => {
}