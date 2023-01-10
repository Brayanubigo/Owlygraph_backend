import mongoose from "mongoose";
const imagenSchema = mongoose.Schema({
    imageURL:String,
    public_id: String
});
const Image = mongoose.model('Image', imagenSchema);
export default Image