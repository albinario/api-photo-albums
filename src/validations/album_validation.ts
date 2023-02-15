import { body } from 'express-validator'

export const storeValidation = [
	body('title')
		.exists().withMessage("Missing").bail()
		.isString().withMessage("Has to be a string").bail()
		.isLength({ min: 3 }).withMessage("Has to be at least 3 characters")
]

export const updateValidation = [
	body('title')
		.optional()
		.isString().withMessage("Has to be a string").bail()
		.isLength({ min: 3 }).withMessage("Has to be at least 3 characters")
]