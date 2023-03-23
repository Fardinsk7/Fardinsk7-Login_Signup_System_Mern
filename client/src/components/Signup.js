import React, { useState } from 'react'
import '../style/username.css'
import avatar from '../asset/emptyProfile.png'
import toast,{Toaster} from 'react-hot-toast'
import {useFormik} from 'formik'
import { SignupValidate} from '../helper/validate'
import converttoBase64 from '../helper/convertImage'
import { signUp } from '../helper/helper'
import {useNavigate} from "react-router-dom"

export default function Username() {
  const navigate = useNavigate()
  const [file,setFile] = useState()
  
  const formik = useFormik({
    initialValues:{
      email:"",
      username : "",
      password:""
    },
    validate: SignupValidate,
    validateOnBlur:false,
    validateOnChange:false,
    onSubmit: async value =>{
      value = await Object.assign(value, {profile: file || ""})
      let signUpPromise = signUp(value)
      toast.promise(signUpPromise,{
        loading: "Creating Account...",
        success: <b>Signup Successfull😁🎉</b>,
        error:<b>Could not Signup</b>
      })
      signUpPromise.then(function(){navigate("/")})
    }

  })

  const onUpload = async e =>{
    //We are converting image to base64 file to store the image in mongodb database
    const base64 = await converttoBase64(e.target.files[0])
    setFile(base64)
  }

  return (
    <>
    <div className="main">
      <Toaster reverseOrder={false}></Toaster>
      <div className="login-box" style={{height:""}}>

        {/* Head of login */}
        <div className="head">
          <h1 className='headtext1'>Create Account!</h1>
          <span className="headtext2">Join us and connect the world</span>
        </div>

        {/* login form */}
        <form action="" className="login-form" onSubmit={formik.handleSubmit} >
          <div className='imgBox'>
            <label htmlFor="profile">
            <img className="profileImg" src={file || avatar} alt="" />
            </label>
            <input type="file" id="profile" name="profile" style={{display:"none"}} onChange={onUpload} />
          </div>

          <div className='formBox' style={{height:"auto"}} >
            <input type="text" className='textInput' {...formik.getFieldProps('email')} placeholder='Enter Email' />
            <input type="text" className='textInput' {...formik.getFieldProps('username')} placeholder='Enter Username' />
            <input type="text" className='textInput' {...formik.getFieldProps('password')} placeholder='Enter Password' />
            <button className="signupBtn" type="submit">Sign up</button>
          </div>



        </form>
          <div className='footer' style={{marginTop:"20px"}}>
            <span className="footerLine">Already have an Account? <a href="/">Login</a></span>
          </div>
      </div>
    </div>
    </>
  )
}
