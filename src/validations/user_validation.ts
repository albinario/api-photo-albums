import { body } from 'express-validator'
import { getUserByEmail } from '../services/user_service'

export const registerValidation = [
	body('email')
		.exists().withMessage("Missing").bail()
		.isEmail().withMessage("Incorrect email address format").bail()
		.custom(async (value: string) => {
			if (await getUserByEmail(value)) {
				return Promise.reject("Email already exists")
			}
		}),
	body('password')
		.exists().withMessage("Missing").bail()
		.isString().withMessage("Has to be a string").bail()
		.isLength({ min: 6 }).withMessage("Has to be at least 6 characters"),
	body('first_name')
		.exists().withMessage("Missing").bail()
		.isString().withMessage("Has to be a string").bail()
		.isLength({ min: 3 }).withMessage("Has to be at least 3 characters"),
	body('last_name')
		.exists().withMessage("Missing").bail()
		.isString().withMessage("Has to be a string").bail()
		.isLength({ min: 3 }).withMessage("Has to be at least 3 characters")
]

export const loginValidation = [
	body('email')
		.exists().withMessage("Missing").bail()
		.isEmail().withMessage("Incorrect email address format").bail(),
	body('password')
		.exists().withMessage("Missing").bail()
		.isString().withMessage("Has to be a string").bail()
		.isLength({ min: 6 }).withMessage("Has to be at least 6 characters")
]