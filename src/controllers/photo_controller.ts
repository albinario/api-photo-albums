import { prisma } from '@prisma/client'
import Debug from 'debug'
import { Request, Response } from 'express'
import { validationResult, matchedData } from 'express-validator'
import { getPhotos, getPhotoById, findPhoto, createPhoto, updatePhoto, deletePhoto } from '../services/photo_service'

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
		return res.status(500).send({
			status: 'error',
			message: "Something wrong when trying to get photos"
		})
	}
}

export const show = async (req: Request, res: Response) => {
	try {
		const photo = await getPhotoById(Number(req.params.photoId))
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
	const photo = await findPhoto(Number(req.params.photoId))
	if (!photo) {
		return res.status(404).send({
			status: 'fail',
			message: "Photo not found"
		})
	}
	const validData = matchedData(req)
	try {
		const updatedPhoto = await updatePhoto(photo.id, validData)
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
	const photo = await findPhoto(Number(req.params.photoId))
	if (!photo) {
		return res.status(404).send({
			status: 'fail',
			message: "Photo not found"
		})
	}
	try {
		await deletePhoto(photo.id)
		res.send({
			status: 'success',
			data: null
		})
	} catch (err) {
		return res.status(500).send({
			status: 'error',
			message: "Something wrong when trying to delete photo"
		})
	}
}