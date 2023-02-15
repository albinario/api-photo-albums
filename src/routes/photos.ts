import express from 'express'
// import { body } from 'express-validator'
import { index, show, store, update, destroy } from '../controllers/photo_controller'
import { storeValidation } from '../validations/photo_validation'

const router = express.Router()

router.get('/', index)

router.get('/:photoId', show)

router.post('/', storeValidation, store)

router.patch('/:photoId', [], update)

router.delete('/:photoId', destroy)

export default router