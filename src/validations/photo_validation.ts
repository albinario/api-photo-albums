import { body } from 'express-validator'

export const storeValidation = [
	body('title')
		.exists().withMessage("Missing").bail()
		.isString().withMessage("Must be a string").bail()
		.isLength({ min: 3 }).withMessage("Must be at least 3 characters"),
	body('url')
		.exists().withMessage("Missing").bail()
		.isURL().withMessage("Must be a url"),
	body('comment')
		.optional()
		.isString().withMessage("Must be a string").bail()
		.isLength({ min: 3 }).withMessage("Must be at least 3 characters")
]

export const updateValidation = [
	body('title')
		.optional()
		.isString().withMessage("Must be a string").bail()
		.isLength({ min: 3 }).withMessage("Must be at least 3 characters"),
	body('url')
		.optional()
		.isURL().withMessage("Must be a url"),
	body('comment')
		.optional()
		.isString().withMessage("Must be a string").bail()
		.isLength({ min: 3 }).withMessage("Must be at least 3 characters")
]