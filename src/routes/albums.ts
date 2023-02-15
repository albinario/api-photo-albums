import express from 'express'
import { index, show, store, update, destroy } from '../controllers/album_controller'
import { storeValidation, updateValidation } from '../validations/album_validation'

const router = express.Router()

router.get('/', index)

router.get('/:albumId', show)

router.post('/', storeValidation, store)

router.patch('/:albumId', updateValidation, update)

router.delete('/:albumId', destroy)

export default router