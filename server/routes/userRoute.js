import express from 'express'
import * as User from '../controllers/userController.js'
import asyncWrapper from '../middleware/asyncWrapper.js'
import { validateData } from '../middleware/validateMiddleware.js'
// import { userValidationSchema } from '../validators/userValidator.js'

const router = express.Router()

router.post('/register', validateData,asyncWrapper(User.Register))
router.post('/login', validateData,asyncWrapper(User.Login))


export default router