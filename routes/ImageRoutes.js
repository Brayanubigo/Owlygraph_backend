import express from "express";
import Image from "../models/Imagen.js";
import ImagePer from '../models/ImagenPer.js';
import cloudinary from 'cloudinary';
import fs from 'fs'
import {storage ,upload} from '../controllers/imageController.js'
import dotenv from "dotenv";

const router = express.Router();
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

router.post('/upload', upload.single('file'), async (req,res) =>{
   
    try {
      const file = req.file
      // Upload the image
       const result = await cloudinary.uploader.upload(req.file.path)
        
     const newImage = new Image({
        imageURL: result.url,
        public_id: result.public_id
     });
     
     await newImage.save();
    
     fs.unlinkSync(file.path)
     
     res.status(200).json ('recibido')
        
      } catch (error) {
        console.log(error)
        res.status(400).json({msg:"No hay fotos"})  
      }
});

router.post('/uploadPer', upload.single('file'), async (req,res) =>{
   
  try {
    const file = req.file
    // Upload the image
     const result = await cloudinary.uploader.upload(req.file.path)
      
   const newImagePer = new ImagePer({
      imageURL: result.url,
      public_id: result.public_id
   });
   
   await newImagePer.save();
  
   fs.unlinkSync(file.path)
   
   res.status(200).json ('recibido')
      
    } catch (error) {
      console.log(error)
      res.status(400).json({msg:"No hay fotos"})  
    }
});

router.get('/showPer', async (req,res) =>{
    const images = await ImagePer.find()
   
    res.json( images);
});

router.get('/showtable', async (req,res) =>{
  const images = await Image.find();

  res.json( images);
});

router.get('/delete/:image_id', async (req,res) =>{
  const {image_id} = req.params;
  
  const images = await Image.findByIdAndDelete(image_id);
  const result = cloudinary.v2.uploader.destroy(images.public_id);
  console.log(result)

  res.json( images);
});

router.get('/deleteper/:image_id', async (req,res) =>{
  const {image_id} = req.params;
  
  const images = await ImagePer.findByIdAndDelete(image_id);
  const result = cloudinary.v2.uploader.destroy(images.public_id);
  console.log(result)

  res.json( images);
});



router.get('/api/images/:id', async (req,res) =>{})
router.delete('/api/delete', async (req,res) =>{})

export default router