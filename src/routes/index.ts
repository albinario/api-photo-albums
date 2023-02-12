import express from 'express'
import { register, login, refresh } from '../controllers/user_controller'
import { validateToken } from '../middlewares/auth/jwt'
import { registerValidation, loginValidation } from '../validations/user_validation'
import photos from './photos'

const router = express.Router()

router.get('/', (req, res) => {
	res.send({
		message: "I AM ALBIN'S PHOTO ALBUM API, BEEP BOOP 🫶"
	})
})

router.post('/register', registerValidation, register)

router.post('/login', loginValidation, login)

router.post('/refresh', refresh)

router.use('/photos', validateToken, photos)

/**
 * [EXAMPLE] /resource
 */
// router.use('/resource', resource)

export default router