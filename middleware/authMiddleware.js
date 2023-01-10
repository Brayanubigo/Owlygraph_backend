import jwt from "jsonwebtoken"
import Admin from "../models/Admin.js";
const checkAuth = async (req,res,next) => {
   if(req.headers.authorization && 
    req.headers.authorization.startsWith("Bearer")){
    let token;
    try {
        token = req.headers.authorization.split(" ")[1];
        const decoded= jwt.verify(token, process.env.JWT_SECRET);
         req.admin = await Admin.findById(decoded.id).select("-password -token -confirmado");
        return next();

    } 
    catch (error) {
        const e = new Error('Token no Valido o inexistente')
     return res.status(403).json({msg: e.message});
    }
    
   }
   if(!token){
   const error = new Error('Token no Valido o inexistente')
   res.status(403).json({msg: error.message});
}
    next();
};

export default checkAuth;