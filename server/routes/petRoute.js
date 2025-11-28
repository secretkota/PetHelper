import express from 'express'
import * as Pet from '../controllers/petController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { validateData } from '../middleware/validateMiddleware.js'


const router = express.Router()

router.get('/categories',Pet.getCategory)
router.get('/', authMiddleware,Pet.getAll)
router.get('/:id', authMiddleware, Pet.getByID)
router.post('/', authMiddleware, Pet.create)
router.put('/:id', authMiddleware ,Pet.update)
router.delete('/:id', authMiddleware, validateData,Pet.deletePet)

export default router