import express from 'express'
import {
  createProducts,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct
} from '../controller/productController.js'
import { verifyUserAuth } from '../middleware/userAuth.js'
const router = express.Router()


router.route('/products')
  .post(createProducts)
  .get(verifyUserAuth,getAllProducts)

router.route('/product/:id')
  .put(updateProduct)
  .delete(deleteProduct)
  .get(getSingleProduct)

export default router
