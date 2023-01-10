import express, { application } from "express";

import conectarDB from "./config/db.js";
import dotenv from "dotenv";
import AdminRoutes from './routes/AdminRoutes.js'
import ImageRoutes from './routes/ImageRoutes.js'

import multer from "multer";
import cors from 'cors';
const app = express();

app.use(express.json());

dotenv.config();

conectarDB();
const dominiosPermitidos = [process.env.FRONTEND_URL]
const corsOption = {
    origin:function(origin,callback){
        if(dominiosPermitidos.indexOf(origin) !== -1){
            callback(null,true)
        }else{
            callback(new Error('No permitido por CORS'))
        }
    }
}

app.use(cors(corsOption))




app.use('/admin', AdminRoutes);
app.use('/image', ImageRoutes)

const PORT = process.env.PORT || 4000

app.listen(PORT, () =>{
    console.log(`servidor funcion ${PORT}`)
});