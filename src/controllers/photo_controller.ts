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
	debug('hej')
	const photoId = Number(req.params.photoId)
	return
}

/**
 * Create a resource
 */
export const store = async (req: Request, res: Response) => {
}

/**
 * Update a resource
 */
export const update = async (req: Request, res: Response) => {
}

/**
 * Delete a resource
 */
export const destroy = async (req: Request, res: Response) => {
}
