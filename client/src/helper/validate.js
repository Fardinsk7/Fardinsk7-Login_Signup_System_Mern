import toast from 'react-hot-toast'
import { authenticate } from './helper';

//Main Function to Export 

//Username Validation
export async function usernameValidate(value){
    const errors = usernameVerify({},value)
    if(value.username){
        const {status} = await authenticate(value.username)
        if(status !== 200){
            errors.poperr = toast.error("User Not exist!!!")
        }
    }
    
    return errors;
}

//Password Validation
export async function passwordValidate(value){
    const errors = passwordVerify({},value);
    return errors;
}

//Reset Password Validation
export async function resetpasswordValidate(value){
    const errors = passwordVerify({},value)
    if(value.password !== value.confirm_pwd){
        errors.notSame = toast.error("Both the password must be same!")
    }
    return errors;
}

//Signup Validation
export async function SignupValidate(value){
    const errors = usernameVerify({},value)
    passwordVerify(errors,value)
    emailVerify(errors,value)

    return errors
}

export async function profileValidation(values){
    const errors = emailVerify({}, values);
    return errors;
}


//************************************************* */

// Validate username
const usernameVerify = (error={},value)=>{
    
    if(!value.username){
        error.username = toast.error("UserName Required!!!")
    }
    else if(value.username.includes(" ")){
        error.username = toast.error("Invalid Username!!!")
    }
    
    return error
}


//Validate Password
const passwordVerify = (error={},value)=>{
    const specialchars = /[-’/`~!#*$@_%+=.,^&(){}[\]|;:”<>?\\]/g
    if(!value.password){
        error.password = toast.error("Password Required")
    }
    else if(value.password.includes(" ")){
        error.password = toast.error("Invalid Password!")
    }
    else if(value.password.length <= 4){
        error.password = toast.error("Password must be more than 4 characters")
    }
    else if(!specialchars.test(value.password)){
        error.password = toast.error("Password must have atleast one special character")
    }
}

//Validate Email
const emailVerify = (error={},value)=>{
    if(!value.email){
        error.email = toast.error("Email Required!")
    }
    else if(value.email.includes(" ")){
        error.email = toast.error("Invalid Email!")
    }
    else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value.email)){
        error.email = toast.error("Please Enter Correct Email!")
    }
}
