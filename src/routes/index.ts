import express from 'express'
import { register } from '../controllers/user_controller'
import { registerValidation } from '../validations/user_validation'

const router = express.Router()

router.get('/', (req, res) => {
	res.send({
		message: "I AM ALBIN'S PHOTOALBUM API, BEEP BOOP 🫶"
	})
})

router.post('/register', registerValidation, register)

/**
 * [EXAMPLE] /resource
 */
// router.use('/resource', resource)

export default router