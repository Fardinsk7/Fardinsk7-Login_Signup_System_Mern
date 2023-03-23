import UserModel from "../mongooseModels/User.js"
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"
import Env from "../config.js"
import otpGenerator from "otp-generator"


// Creating middleware to verify user
export async function verifyUser (req,res,next){
    try {
        const {username} = req.method == "GET" ? req.query : req.body;
        const existuser = await UserModel.findOne({username})
        if(!existuser) return res.status(404).send({error:"User Not Found"})
        next()

    } catch (error) {
        res.status(404).send({error:"Authenticate Error"})
    }
}




//***********************Post request 


/*@param :{
    "username":"Fardinsk",
    "password":"1234@jjj",
    "email":"abc@gamil.com",
    "firstName":"Fardin",
    "lastName":"Khan",
    "mobile":"9563214582",
    "address":"Malad west Mumbai"
} data requirement for sign up
 */
export async function signup(req,res){
    try {
        const {username,password,profile,email,firstname,lastname,mobileno,address} = req.body

        //check if user exist 
        const existUser =  await UserModel.findOne({username})
        if(existUser){
            return res.status(400).send({error:"User Name exist please enter the unique name"})
        }

        
        
        //check if email exist
        const existEmail = await UserModel.findOne({email})
        if(existEmail){
            return res.status(400).json({error:"Email already exist"})
        }
       
        

        Promise.all([existUser,existEmail])
        .then(()=>{
            //Hashing the password
            if(password){
                // bcrypt.hash(req.body.password,10)
                bcrypt.hash(password,10)
                .then((hashpassword)=>{
                    const newUser= new UserModel ({
                        username,
                        password:hashpassword,
                        profile:profile||"",
                        email,
                        firstname:firstname||""
                    
                    })

                    //Saving the new user
                    newUser.save()
                    .then(result => res.status(201).send({msg:"User registered successfully"}))
                    .catch(err => res.status(500).send(err))
                }).catch(err=>{
                    return res.status(500).send({error:"Enable to hash passwordss"})
                })
            }

        }).catch( err =>{
            console.log(err)
            return res.status(500).send(err)
        })


        
    } catch (error) {
        console.log(error)
       return res.status(500).send("Server Error")
    }
}

/*@param :{
    "username":"Fardinsk",
    "password":"1234@jjj"
}data requirement for login
*/
export async function login(req,res){
    const {username,password} = req.body;
    try {
        //Check if user exist
        UserModel.findOne({username})
        .then(user=>{
            //Check if password exist
            bcrypt.compare(password,user.password)
            .then(passwordCheck=>{
                //Check if password is there
                if(!passwordCheck) return res.status(404).send({error:"Don't have password"})

                //creating jwt token
                
                const token = jwt.sign({
                    userId:user._id,
                    username:user.username
                },Env.Jwt_token,{expiresIn:"24h"})

                return res.status(200).send({msg:"Login Successfull...!",username: user.username,token})


            }).catch(err=>{
                return res.status(404).send({error:"Password not Match"})
            })

        }).catch(err=>{
            return res.status(404).send({error:"Username not found"})
        })
        
        
    } catch (error) {
        return res.status(500).send("Server Error")
    }

    // res.json("Login")
}


//***********************Get requests


export async function getuser(req,res){

    //Here we will take username form url 
    const {username} = req.params;
    try {
        if(!username) return res.status(501).send({error:"Invalid Username"})

        const User = await UserModel.findOne({username})
        if(!User){
        return res.status(404).send({error:"user Not Found"})
        }
        else if(User){
            //Mongoose return unnecessary data so we create new object 
            const Userinfo = {
                _id : User._id,
                username: User.username,
                firstname: User.firstname,
                email:User.email,
                profile:User.profile,
                lastname:User.lastname,
                address:User.address,
                mobileno: User.mobileno

            }
            return res.status(201).send(Userinfo)
        }
        
        
    } catch (error) {
        return res.status(404).send({error:"Can't find user data"})
    }
    
}

// export async function getUser(req,res){
//     const {username} = req.params;
//     try {
//         if(!username) return res.status(404).send({error:"Not found"})

//         const User = await UserModel.findOne({username})
//         if(!User){
//             return res.status(404).send({error:"User Not Found"})

//         }
//         return res.status(201).send(User)
        
//     } catch (error) {
//         return res.status(404).send({error:"Can't find user data"})
        
//     }
// }


export async function generateOTP(req,res){
    req.app.locals.OTP = await otpGenerator.generate(6,{lowerCaseAlphabets:false,upperCaseAlphabets:false,specialChars:false})
    
    return res.status(201).send({code:req.app.locals.OTP})   
}

export async function verifyOTP(req,res){
    const {code} = req.query;
   
    if(parseInt(req.app.locals.OTP)=== parseInt(code)){

        //Reseting the local variables 
        req.app.locals.OTP = null;
        req.app.locals.resetSession = true;
        return res.status(200).send({msg:"OTP verified"})
    }
   
        return res.status(400).send({error:"Invalid OTP"})


    
}

export async function createresetsession(req,res){
    if(req.app.locals.resetSession){
        return res.status(200).send({flag:req.app.locals.resetSession})
    }
    return res.status(400).send({error:"Session Expired"})
}




//***********************Put requests


export async function updateuser(req,res){
    try {
        const {userId} = req.user;
    

        if(userId){
            // findednote = await Notes.findByIdAndUpdate(req.params.id,{$set: newNote},{new:true})
            const body = req.body 
            
            const updateProfile = await UserModel.updateOne({_id:userId},body)
            if(updateProfile){
                return res.status(200).send({msg:"Update Successfull"})
            }
            else{
                return res.status(401).send({error:"Unable to Update due to some error"})
            }

        }
        else{
            return res.status(401).send({error:"User not defined"})
        }
        
    } catch (error) {
        return res.status(500).send("Server Errorsss")
    }
}

export async function resetpassword(req,res){
    const {username,password} = req.body
    if(!req.app.locals.resetSession) return res.status(500).send("Session Expired")
    try {
        UserModel.findOne({username})
        .then(user =>{
            bcrypt.hash(password,10)
            .then( async (hashpassword) =>{
               const passUpdate = await UserModel.updateOne({username:user.username},{password:hashpassword})
                if(passUpdate){
                    req.app.locals.resetSession = false;
                    return res.status(201).send("Password Updated")
                }
            })
            .catch(err =>{
                return res.status(400).send({error:"Enable ot hash password"})
            })
        })
        .catch(err =>{
            return res.status(404).send({error:"User Not Found"})
        })
        
    } catch (error) {
        return res.status(500).send("Server Error")
    }
}
