import express from 'express'
import {verifyUserAuth } from '../middleware/userAuth.js'
import { getUserDetails, loginUser, logout, registerUser, requestPasswordReset, resetPassword, updatePassword, updateProfile } from '../controller/userController.js'
const router = express.Router()


router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route("/logout").post(logout)
router.route('/password/forgot').post(requestPasswordReset);
router.route('/reset/:token').post(resetPassword);
router.route('/profile').post( verifyUserAuth,getUserDetails);
router.route('/password/update').post( verifyUserAuth,updatePassword);
router.route('/profile/update').post( verifyUserAuth,updateProfile);



export default router