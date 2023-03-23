import React, { useState } from 'react'
import '../style/username.css'
import avatar from '../asset/emptyProfile.png'
import toast,{Toaster} from 'react-hot-toast'
import {useFormik} from 'formik'
import { profileValidation } from '../helper/validate'
import converttoBase64 from '../helper/convertImage'
import useFetch from '../CustomHooks/customhooks'
import { updateUser } from '../helper/helper'
import {useNavigate} from "react-router-dom"


export default function Username() {
  const [file,setFile] = useState()
  const[{isLoading,apiData,serverError}]= useFetch()
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues:{
      firstname : apiData?.firstname|| "",
      lastname: apiData?.lastname||"",
      email:apiData?.email||"",
      mobileno:apiData?.mobileno||"",
      address:apiData?.address||""

    },
    enableReinitialize:true,
    validate: profileValidation,
    validateOnBlur:false,
    validateOnChange:false,
    onSubmit: async value =>{
      value = await Object.assign(value,{profile:file ||apiData?.profile||""})
      let updatePromise =  updateUser(value)
      toast.promise(updatePromise,{
        loading:"Updating Details...",
        success:"Update Successfull 🎉🎉🎉",
        error:"Update Profile Fail"
      })
      
    }

  })

  const onUpload = async e =>{
    //We are converting image to base64 file to store the image in mongodb database
    const base64 = await converttoBase64(e.target.files[0])
    setFile(base64)
  }

// Logout Function
 const logout = ()=>{
  localStorage.removeItem("token")
  navigate("/")
 }


  if(isLoading)return <h1 style={{textAlign:"center"}} >Loading...</h1>
  if(serverError)return <h1>{serverError.error}</h1>

  return (
    <>
    <div className="main">
      <Toaster reverseOrder={false}></Toaster>
      <div className="login-box" >

        {/* Head of login */}
        <div className="head">
          <h1 className='headtext1'>Profile</h1>
          <span className="headtext2">Join us and connect the world</span>
        </div>

        {/* login form */}
        <form action="" className="login-form" onSubmit={formik.handleSubmit} style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>

        <div className='imgBox'>
            <label htmlFor="profile">
            <img className="profileImg" src={apiData?.profile ||file || avatar} alt="" />
            </label>
            <input type="file" id="profile" name="profile" style={{display:"none"}} onChange={onUpload} />
          </div>

          <div className='formBox' style={{height:"auto",width:"100%"}}>
            <div style={{display:"flex",width:"100%"}}>
            <input type="text" className='textInput' {...formik.getFieldProps('firstname')} style={{width:"50%",marginRight:"15px"}} placeholder='First Name' />
            <input type="text" className='textInput' {...formik.getFieldProps('lastname')} style={{width:"50%"}} placeholder='Last Name' />

            </div>

            <div style={{display:"flex"}}>
            <input type="text" className='textInput' {...formik.getFieldProps('email')} style={{width:"50%",marginRight:"15px"}} placeholder='Email' />
            <input type="text" className='textInput' {...formik.getFieldProps('mobileno')}style={{width:"50%"}} placeholder='Mobile no.' />
            </div>

            <input type="text" className='textInput' {...formik.getFieldProps('address')} placeholder='Address' />
            <button className="signupBtn" type="submit">Update</button>
          </div>



        </form>
          <div className='footer'>
            <span className="footerLine">come later <button style={{fontSize:"10px",background:"transparent",border:"none",color:"red",padding:"0",cursor:"pointer"}} onClick={()=>{ if(window.confirm("Are you sure you want to logout???")){logout()}}} >Logout</button></span>
          </div>
      </div>
    </div>
    </>
  )
}
