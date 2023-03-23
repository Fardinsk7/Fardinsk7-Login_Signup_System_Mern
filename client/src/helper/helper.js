import axios from "axios"
import jwt_decode from "jwt-decode"


axios.defaults.baseURL = "http://localhost:5000"
//Instead of Using fetch we are using Axios library

//******* Make API Request */

export async function getuserinfo(){
    const token = localStorage.getItem("token")
    if(!token) return Promise.reject("Cann't find token")
    let decode = jwt_decode(token)
    return decode
}


//Authenticate Function
export async function authenticate(username){
    try {
        return await axios.post("/api/authenticate",{username})
    } catch (error) {
        return {error:"Username doesn't existt"}
    }
}

//Getuser Function
export async function getUser({username}){
    try {
        let {data}= await axios.get(`/api/user/${username}`,{username})
        return {data};
    } catch (error) {
        return {error:"Password Not Match"}
    }
}

//Signup Function
export async function signUp(credential){
    try {
        const {data:{msg},status} = await axios.post("/api/signup",credential)
        const {username,email} = credential
        //Signup Success Email
        if(status === 201){
            await axios.post("/api/registerMail",{username,userEmail:email,text:"Thank for selecting welcome to our demo😊❤️ \n You have successfully Registered"})

        }

        return Promise.resolve(msg)
        
    } catch (error) {
        return Promise.reject({error})
    }
}

//Login Function
export async function login({username,password}){
    try {
        if(username){
            const {data} = await axios.post("/api/login",{username,password})
            return Promise.resolve({data})

        }
        
    } catch (error) {
        return Promise.reject({error:"Password doesn't Match"})
    }
}

//update User detail
export async function updateUser(response){
    try {
        
        const token = await localStorage.getItem('token');
        const data = await axios.put('/api/updateuser', response, { headers : { "Authorization" : `Bearer ${token}`}});

        return Promise.resolve({ data })
    } catch (error) {
        return Promise.reject({ error : "Couldn't Update Profile...!"})
    }
}


//generate OTP
export async function generateOTP(username){
    try {
        const {data:{code},status} =await axios.get("/api/generateOTP",{params:{username}})// Since this is get request we are passing username in params

        if(status === 201){
            const {data:{email}} = await getUser({username})
            let text = `You 6 digit OTP verification code is ${code}`
            const response = await axios.post("/api/registerMail",{username,userEmail:email,text,subject:"Password Reset Code"})
        }
        return Promise.resolve(code)
        
    } catch (error) {
        return Promise.reject({error})
    }
}

//Verify OTP
export async function verifyOTP({username,code}){
    try {
        const {data,status} = await axios.get("/api/verifyOTP",{params:{username,code}})
        return {data,status}
        
    } catch (error) {
        return Promise.reject({error:"OTP Invalid"})   
    }
}

//Reset Password
export async function resetpassword({username,password}){
    try {
        const {data,status}= await axios.put("/api/resetpassword",{username,password});
        return Promise.resolve({data,status})
        
    } catch (error) {
        return Promise.reject(error)
    }
}