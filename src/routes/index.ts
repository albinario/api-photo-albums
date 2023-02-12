import express from 'express'
import { register, login } from '../controllers/user_controller'
import { registerValidation, loginValidation } from '../validations/user_validation'

const router = express.Router()

router.get('/', (req, res) => {
	res.send({
		message: "I AM ALBIN'S PHOTOALBUM API, BEEP BOOP 🫶"
	})
})

router.post('/register', registerValidation, register)

router.post('/login', loginValidation, login)

/**
 * [EXAMPLE] /resource
 */
// router.use('/resource', resource)

export default router