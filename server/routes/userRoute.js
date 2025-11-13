import express from 'express'
import * as User from '../controllers/userController.js'
import asyncWrapper from '../middleware/asyncWrapper.js'

const router = express.Router()

router.post('/register', asyncWrapper(User.Register))
router.post('/login', asyncWrapper(User.Login))


export default router