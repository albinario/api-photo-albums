import bcrypt from 'bcrypt'
import Debug from 'debug'
import { Request, Response } from 'express'
import { validationResult, matchedData } from 'express-validator'
import { createUser } from '../services/user_service'

const debug = Debug('prisma-boilerplate:user_controller')

export const register = async (req: Request, res: Response) => {
	const validationErrors = validationResult(req)
	if (!validationErrors.isEmpty()) {
		return res.status(400).send({
			status: "fail",
			data: validationErrors.array()
		})
	}
	const validData = matchedData(req)
	
	const hashedPassword = await bcrypt.hash(validData.password, Number(process.env.SALT_ROUNDS) || 10)
	validData.password = hashedPassword

	try {
		const user = await createUser({
			email: validData.email,
			password: validData.password,
			first_name: validData.first_name,
			last_name: validData.last_name
		})
		res.status(201).send({
			status: 'success',
			data: {
				email: user.email,
				first_name: user.first_name,
				last_name: user.last_name
			}
		})
	} catch (err) {
		return res.status(500).send({
			status: 'error',
			message: "Couldn't create user in database"
		})
	}
}