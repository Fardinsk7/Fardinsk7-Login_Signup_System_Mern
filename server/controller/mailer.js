import nodemailer from "nodemailer"
import Mailgen from "mailgen";
import ENV from "../config.js";

let nodeConfig ={
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: ENV.email, // generated ethereal user
      pass: ENV.password // generated ethereal password
    }
}

let transporter = nodemailer.createTransport(nodeConfig)


//Initializing Mailgen
let MailGen = new Mailgen({
    theme:"default",
    product:{
        name:"Mailgen",
        link:"https://mailgen.js/"
    }
})



//Creating Route Controller

// export const registerMail = async (req, res) => {
//     const { username, userEmail, text, subject } = req.body;
//     res.status(200).send("success")
    // body of the email
    // var email = {
    //     body : {
    //         name: username,
    //         intro : text || 'Welcome to Daily Tuition! We\'re very excited to have you on board.',
    //         outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
    //     }
    // }

    // var emailBody = MailGen.generate(email);

    // let message = {
    //     from : ENV.email,
    //     to: userEmail,
    //     subject : subject || "Signup Successful",
    //     html : emailBody
    // }

    // // send mail
    // transporter.sendMail(message)
    //     .then(() => {
    //         return res.status(200).send({ msg: "You should receive an email from us."})
    //     })
    //     .catch(error => res.status(500).send({ error }))

// }



export  const registerMail = async (req,res)=>{
    const {username,userEmail,text,subject}= req.body;
    
    //body of email
    const email = {
        body:{
            name: username,
            intro: text || "This is default intro",
            outro : "Reserved by Fsk"
        }
    }

    var emailBody = MailGen.generate(email)

    let messgae  ={
        from: ENV.email,
        to: userEmail,
        subject: subject || "Signup Successfull",
        html: emailBody
    }

    //sending email
    transporter.sendMail(messgae)
    .then(()=>{
        return res.status(201).send({msg:"You should receive an email!!!"})
    })
    .catch(err => res.status(500).send(err))


}