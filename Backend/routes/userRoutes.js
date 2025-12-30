import express from 'express'
import {roleBasedAccess,verifyUserAuth } from '../middleware/userAuth.js'
import { deleteUser, getSingleUser, getUserDetails, getUsersList, loginUser, logout, registerUser, requestPasswordReset, resetPassword, updatePassword, updateProfile, updateUserRole } from '../controller/userController.js'
const router = express.Router()


router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route("/logout").post(logout)
router.route('/password/forgot').post(requestPasswordReset);
router.route('/password/reset/:token').post(resetPassword);
router.route('/profile').post( verifyUserAuth,getUserDetails);
router.route('/password/update').put( verifyUserAuth,updatePassword);
router.route('/profile/update').post( verifyUserAuth,updateProfile);
router.route('/admin/users').get( verifyUserAuth,roleBasedAccess("admin"),getUsersList);
router.route('/admin/user/:id').get( verifyUserAuth,roleBasedAccess("admin"),getSingleUser);
router.route('/admin/user/:id').put( verifyUserAuth,roleBasedAccess("admin"),updateUserRole);
router.route('/admin/user/:id').delete( verifyUserAuth,roleBasedAccess("admin"),deleteUser);



export default router