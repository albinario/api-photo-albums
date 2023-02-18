import { body } from 'express-validator'

export const storeValidation = [
	body('title')
		.exists().withMessage("Missing").bail()
		.isString().withMessage("Must be a string").bail()
		.isLength({ min: 3 }).withMessage("Must be at least 3 characters")
]

export const updateValidation = [
	body('title')
		.optional()
		.isString().withMessage("Must be a string").bail()
		.isLength({ min: 3 }).withMessage("Must be at least 3 characters")
]

export const connectPhotosValidation = [
	body('photo_id')
		.exists().withMessage("Missing")
		.custom(value => {
			if (typeof value === 'number' || (Array.isArray(value) && value.every(item => typeof item === 'number'))) {
				return true
			}
		}).withMessage("Must be either a number or an array of numbers")
]