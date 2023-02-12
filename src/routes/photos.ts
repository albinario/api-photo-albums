import express from 'express'
import { body } from 'express-validator'
import { index, show, store, update, destroy } from '../controllers/photo_controller'

const router = express.Router()

router.get('/', index)

router.get('/:photoId', show)

router.post('/', [], store)

router.patch('/:photoId', [], update)

router.delete('/:photoId', destroy)

export default router