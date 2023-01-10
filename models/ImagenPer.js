import mongoose from "mongoose";
const imagenSchema = mongoose.Schema({
    imageURL:String,
    public_id: String
});
const ImagePer = mongoose.model('ImagePer', imagenSchema);
export default ImagePer