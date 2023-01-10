import multer from "multer";
import Image from '../models/Imagen.js';
import fs from 'fs'
 const storage = multer.diskStorage({
    destination:(req,file,cb) =>{
        if(fs.existsSync("../upload")){
            cb(null,'../api-buffon/upload')
            }else{
                fs.mkdirSync('../api-buffon/upload',{recursive:true});
                cb(null,'../api-buffon/upload')   
            }
       

    },
    filename:(req,file,cb) =>{
        const ext = file.originalname.split('.').pop()
        cb(null,`${Date.now()}.${ext}`)
    }
 });

 const upload = multer({storage})

 
export {
    storage,
    upload
}