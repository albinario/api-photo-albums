import Debug from 'debug'
import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import prisma from '../prisma'

const debug = Debug('api: 📸 photo_controller')

export const index = async (req: Request, res: Response) => {
	try {
		const photos = await prisma.photo.findMany()
		res.send({
			status: 'success',
			data: photos
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
		const photo = await prisma.photo.findUniqueOrThrow({
			where: {
				id: photoId
			}
		})
		res.send({
			status: 'success',
			data: photo
		})
	} catch (err) {
		return res.status(404).send({
			status: 'fail',
			message: "Photo not found"
		})
	}
}

export const store = async (req: Request, res: Response) => {
}

export const update = async (req: Request, res: Response) => {
}

export const destroy = async (req: Request, res: Response) => {
}