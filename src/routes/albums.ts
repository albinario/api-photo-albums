import express from 'express'
import { index, show, store, update, destroy, connectPhotos } from '../controllers/album_controller'
import { storeValidation, updateValidation, connectPhotosValidation } from '../validations/album_validation'

const router = express.Router()

router.get('/', index)

router.get('/:albumId', show)

router.post('/', storeValidation, store)

router.patch('/:albumId', updateValidation, update)

router.delete('/:albumId', destroy)

router.post('/:albumId/photos', connectPhotosValidation, connectPhotos)

export default router