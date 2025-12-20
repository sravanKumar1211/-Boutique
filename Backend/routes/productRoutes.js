import express from 'express'
import {
  createProducts,
  deleteProduct,
  getAllProducts,
  updateProduct
} from '../controller/productController.js'

const router = express.Router()


router.route('/products')
  .post(createProducts)
  .get(getAllProducts)

router.route('/product/:id')
  .put(updateProduct)
  .delete(deleteProduct)

export default router
