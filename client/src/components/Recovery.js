import React, { useEffect, useState } from 'react'
import '../style/username.css'
import { generateOTP,verifyOTP } from '../helper/helper'
import toast,{Toaster} from "react-hot-toast"
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from './store/store'

export default function Recovery() {
  const {username}=useAuthStore(state=> state.auth)

  const [OTP,setOTP] = useState()
  const navigate = useNavigate()
  useEffect(()=>{
    generateOTP(username).then((OTP)=>{
      if(OTP) return toast.success("OTP has been send to your email")
      return toast.error("Problem while Generating OTP")
    })
  },[username])

  async function onSubmit(e){
    e.preventDefault()
    try {
      let {status} = await verifyOTP({username,code:OTP})
      if(status === 200){
        navigate("/reset")
        return toast.success("OTP Verified")
      }
      
    } catch (error) {
      
      return toast.error("Wrong OTP")
    }
  }

  function resendOTP(){
    let sendPromise = generateOTP(username);
    toast.promise(sendPromise,{
      loading:"OTP sending again",
      success:"OTP resended",
      error:"Could not send OTP"
    })
    // sendPromise.then(OTP =>{
    //   console.log(OTP)
    // })
  }

  return (
    <>
    <div className="main">
    <Toaster reverseOrder={false}></Toaster>

      <div className="login-box">

        {/* Head of login */}
        <div className="head">
          <h1 className='headtext1'>Recovery</h1>
          <span className="headtext2" style={{color:"grey"}}>Enter 6 digit OTP to reset password</span>
        </div>

        {/* login form */}
        <form action="" className="login-form" onSubmit={onSubmit} >
          

          <div className='formBox'>
            <input onChange={(e)=>setOTP(e.target.value)} type="text" className='textInput'  placeholder='Enter OTP' />
            <button className="signupBtn" type="submit"  >Reset</button>
            {/* <button style={{backgroundColor:"transparent",border:"none",padding:"5px",color:"grey"}} onClick={resendOTP}>Click Here to Send OTP</button> */}
          </div>



        </form>
          <div className='footer'>
            <span className="footerLine">Can't get OTP? <button style={{fontSize:"10px",background:"transparent",border:"none",color:"red",padding:"0",cursor:"pointer"}} onClick={resendOTP} >Resend</button></span>
          </div>
      </div>
    </div>
    </>
  )
}
