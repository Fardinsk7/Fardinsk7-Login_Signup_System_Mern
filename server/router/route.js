import {Router} from 'express'
import * as controller from "../controller/controller.js"
import { localVariable } from '../middleware/auth.js'
import Auth from "../middleware/auth.js"
// import {registerMail} from '../controller/mailer.js'
import { registerMail } from '../controller/mailer.js'

const router = Router();


//*****POST METHOD */
router.route('/signup').post(controller.signup) //Sign up route
router.route('/registerMail').post(registerMail) //send the email route
router.route('/authenticate').post(controller.verifyUser,(req,res)=> res.end()) // authenticate user route
router.route('/login').post(controller.verifyUser,controller.login) //login route

//*****GET METHOD */
router.route('/user/:username').get(controller.getuser) // get user with  username route
router.route('/generateOTP').get(controller.verifyUser,controller.generateOTP,localVariable) // generate random otp route
router.route('/verifyOTP').get(controller.verifyUser,controller.verifyOTP,localVariable) // verify generated otp route
router.route('/createresetsession').get(controller.createresetsession,localVariable) // reset all the variables 

//*****PUT METHOD */
router.route('/updateuser').put(Auth,controller.updateuser) // update user profile route
router.route('/resetpassword').put(controller.verifyUser,controller.resetpassword,localVariable) // use to reset password route

export default router;