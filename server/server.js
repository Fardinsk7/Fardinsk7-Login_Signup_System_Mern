import express from 'express';
import cors from 'cors'
import morgan from 'morgan';
import connect from './database/connect.js'
import router from "./router/route.js"

const app = express();
const port = 5000

//****Middle wares */
app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))
app.disable('x-powered-by')// because of this less hacker will know about stack





//****Http requests */
app.get("/",(req,res)=>{
    res.status(201).json("Hello World")
})

//****api routes */
app.use('/api',router)




//Start the server only if we connected to the database
connect().then(()=>{
    try {
        //****listening to server */
        app.listen(port,()=>{
            console.log(`Server listening to http://localhost:${port}`);
        })    
    } catch (error) {
        console.log("Cannot connect to Server")
    }
}

).catch(err =>{
    console.log("Invalid database connection...")
})




