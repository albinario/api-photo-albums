import Debug from 'debug'
import { Request, Response } from 'express'
import { validationResult, matchedData } from 'express-validator'
import { getAlbums, getAlbumById, createPhoto, updatePhoto, deletePhoto } from '../services/album_service'

const debug = Debug('api: 📔 album_controller')

export const index = async (req: Request, res: Response) => {
	try {
		const albums = await getAlbums()
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
	try {
		const album = await getAlbumById(Number(req.params.albumId))
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
		const album = await createPhoto({
			title: validData.title,
			url: validData.url,
			comment: validData.comment,
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
	const validData = matchedData(req)
	try {
		const album = await updatePhoto(Number(req.params.albumId), validData)
		res.send({
			status: 'success',
			data: album
		})
	} catch (err) {
		return res.status(500).send({
			status: 'error',
			message: "Something wrong when trying to update album"
		})
	}
}

export const destroy = async (req: Request, res: Response) => {
	try {
		try {
			await deletePhoto(Number(req.params.albumId))
			res.send({
				status: 'success',
				data: null
			})
		}
		catch (err: unknown) {
			return res.status(404).send({
				status: 'fail',
				message: (err instanceof Error) ? err.message : `Unknown error: ${err}`
			})
		}
	} catch (err) {
		return res.status(500).send({
			status: 'error',
			message: "Something wrong when trying to delete album"
		})
	}
}