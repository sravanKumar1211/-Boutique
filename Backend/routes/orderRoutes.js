import express from 'express'
import { roleBasedAccess, verifyUserAuth } from '../middleware/userAuth.js'
import { createNewOrder } from '../controller/orderController.js'
const router = express.Router()


router.route('/new/order').post(verifyUserAuth,createNewOrder)

export default router