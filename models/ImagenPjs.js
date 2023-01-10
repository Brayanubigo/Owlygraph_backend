import mongoose from "mongoose";
const imagenSchema = mongoose.Schema({
    imageURL:String,
    public_id: String
});
const ImagePjs = mongoose.model('ImagenPjs', imagenSchema);
export default ImagePjs