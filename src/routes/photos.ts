import express from 'express'
import { index, show, store, update, destroy } from '../controllers/photo_controller'
import { storeValidation, updateValidation } from '../validations/photo_validation'

const router = express.Router()

router.get('/', index)

router.get('/:photoId', show)

router.post('/', storeValidation, store)

router.patch('/:photoId', updateValidation, update)

router.delete('/:photoId', destroy)

export default router