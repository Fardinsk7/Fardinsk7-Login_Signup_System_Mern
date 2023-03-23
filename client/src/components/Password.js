import React from 'react'
import '../style/username.css'
import avatar from '../asset/emptyProfile.png'
import toast,{Toaster} from 'react-hot-toast'
import {useFormik} from 'formik'
import { passwordValidate } from '../helper/validate'
import useFetch from '../CustomHooks/customhooks'
import { useAuthStore } from './store/store'
import { login } from '../helper/helper'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

export default function Password() {
  const navigate = useNavigate()
  const {username}=useAuthStore(state=> state.auth)

  const[{isLoading,apiData,serverError}]= useFetch(`/user/${username}`)


  const formik = useFormik({
    initialValues:{
      password : ""
    },
    validate: passwordValidate,
    validateOnBlur:false,
    validateOnChange:false,
    onSubmit: async value =>{
      let loginPromise = login({username,password:value.password})
      toast.promise(loginPromise,{
        loading:"Checking.....",
        success: <b>Login Successfull🎉🎉🎉</b>,
        error:<b>Password not Match</b>
      })
      loginPromise.then(res =>{
        let {token} = res.data;
        localStorage.setItem("token",token);
        navigate("/profile")
      })
    }

  })

  if(isLoading)return <h1 style={{textAlign:"center"}}>Loading...</h1>
  if(serverError)return <h1>{serverError.error}</h1>

  return (
    <>
    <div className="main">
      <Toaster reverseOrder={false}></Toaster>
      <div className="login-box">

        {/* Head of Password */}
        <div className="head">
          <h1 className='headtext1'>Hello {apiData?.firstName || apiData?.username}</h1>
          <span className="headtext2">Join us and connect the world</span>
        </div>

        {/* Password form */}
        <form action="" className="login-form" onSubmit={formik.handleSubmit} >
          <div className='imgBox'>
            <img className="profileImg" src={apiData?.profile || avatar} alt="" />
          </div>

          <div className='formBox'>
            <input type="text" className='textInput' {...formik.getFieldProps('password')} placeholder='Enter Password' />
            <button className="signupBtn" type="submit">Login</button>
          </div>

          <div className='footer'>
            <span className="footerLine">Forgot Password? <Link to="/recovery">Recover Now</Link></span>
          </div>


        </form>
      </div>
    </div>
    </>
  )
}
