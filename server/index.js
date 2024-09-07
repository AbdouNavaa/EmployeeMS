import express from 'express'
import cors from 'cors'
import { adminRouter } from './Routes/AdminRoute.js'

const  app = express()
app.use(cors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials:true
}))//pour connect avec frontend
app.use(express.json())//pour transferer les donnees comme json

app.use('/auth', adminRouter)
app.use(express.static('Public'))

app.listen(3000, () =>{
    console.log("Server is runinig");
    
})