import multer from "multer";
import Image from '../models/Imagen.js';
 const storage = multer.diskStorage({
    destination:(req,file,cb) =>{
        cb(null,'../upload')
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