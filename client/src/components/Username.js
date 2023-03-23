import React, { useEffect } from 'react'
import '../style/username.css'
import avatar from '../asset/emptyProfile.png'
import {Toaster} from 'react-hot-toast'
import {useFormik} from 'formik'
import { usernameValidate } from '../helper/validate'
import { Link,useNavigate } from 'react-router-dom'
import {useAuthStore} from "./store/store"

export default function Username() {

  const navigate = useNavigate()
  const setUsername = useAuthStore(state => state.setUsername)
  const username = useAuthStore(state => state.auth.username)

 

  const formik = useFormik({
    initialValues:{
      username : ""
    },
    validate: usernameValidate,
    validateOnBlur:false,
    validateOnChange:false,
    onSubmit: async value =>{
      setUsername(value.username)
      navigate("/password")
    }

  })

  return (
    <>
    <div className="main">
      <Toaster reverseOrder={false}></Toaster>
      <div className="login-box">

        {/* Head of login */}
        <div className="head">
          <h1 className='headtext1'>Login Here</h1>
          <span className="headtext2">Join us and connect the world</span>
        </div>

        {/* login form */}
        <form action="" className="login-form" onSubmit={formik.handleSubmit} >
          <div className='imgBox'>
            <img className="profileImg" src={avatar} alt="" />
          </div>

          <div className='formBox'>
            <input type="text" className='textInput' {...formik.getFieldProps('username')} placeholder='Enter Username' />
            <button className="signupBtn" type="submit">Login</button>
          </div>

          <div className='footer'>
            <span className="footerLine">Don't Have Account <Link to="/signup">Signup</Link></span>
          </div>


        </form>
      </div>
    </div>
    </>
  )
}
