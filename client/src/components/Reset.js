import React from 'react'
import '../style/username.css'
import toast,{Toaster} from 'react-hot-toast'
import {useFormik} from 'formik'
import { resetpasswordValidate } from '../helper/validate'
import { resetpassword } from '../helper/helper'
import { useAuthStore } from './store/store'
import { useNavigate,Navigate } from 'react-router-dom'
import useFetch from '../CustomHooks/customhooks'

export default function Reset() {
  const [{isLoading,apiData,status,serverError}] = useFetch("createresetsession")
  const navigate = useNavigate()
  const {username} = useAuthStore(state =>state.auth)
  const formik = useFormik({
    initialValues:{
      password : "",
      confirm_pwd:""
    },
    validate: resetpasswordValidate,
    validateOnBlur:false,
    validateOnChange:false,
    onSubmit: async value =>{
      let resetPromise = resetpassword({username,password:value.password})
      toast.promise(resetPromise,{
        loading:"Updating Password...",
        success:"Password Update Successfully",
        error:"Unable to Update Password"
      })
      resetPromise.then(()=>{
        navigate("/password")
      })
    }

  })

  if(isLoading)return <h1>Loading</h1>
  if(serverError)return <h1>{serverError.error}</h1>
  if(status && status !== 201)return <Navigate to={'/password'} replace={true}></Navigate>

  return (
    <>
    <div className="main">
      <Toaster reverseOrder={false}></Toaster>
      <div className="login-box">

        {/* Head of Password */}
        <div className="head">
          <h1 className='headtext1'>Reset Password</h1>
          <span className="headtext2" style={{color:"grey"}}>Enter new Password</span>
        </div>

        {/* Password form */}
        <form action="" className="login-form" onSubmit={formik.handleSubmit} >
          

          <div className='formBox'style={{height:"auto"}}>
            <input type="text" className='textInput' {...formik.getFieldProps('password')} placeholder='Enter Password' />
            <input type="text" className='textInput' {...formik.getFieldProps('confirm_pwd')} placeholder='Confirm Password' />
            <button className="signupBtn" type="submit">Reset</button>
          </div>

       


        </form>
      </div>
    </div>
    </>
  )
}
