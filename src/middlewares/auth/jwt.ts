import Debug from 'debug'
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { JwtPayload } from '../../types'

const debug = Debug('api: 🔐 jwt')

export const tokenValidation = (req: Request, res: Response, next: NextFunction) => {
	if (!req.headers.authorization) {
		debug("Authorization header missing")
		return res.status(401).send({
			status: 'fail',
			data: "Authorization required"
		})
	}

	const [authSchema, token] = req.headers.authorization.split(' ')
	if (authSchema.toLowerCase() !== 'bearer') {
		debug("Authorization schema isn't bearer")
		return res.status(401).send({
			status: 'fail',
			data: "Authorization required"
		})
	}

	try {
		const payload = (jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || "") as unknown) as JwtPayload
		req.token = payload

	} catch (err) {
		debug("Authorization failed on the finish line 🏁")
		return res.status(401).send({
			status: 'fail',
			data: "Authorization required"
		})
	}

	next()
}