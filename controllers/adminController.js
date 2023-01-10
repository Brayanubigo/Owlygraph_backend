import Admin from "../models/Admin.js";
import generarJWT from "../helpers/generarJWT.js"
import generarId from "../helpers/generarid.js";
import sendEmail from "../helpers/emailRegistro.js"


const enviarEmail = async(req,res) =>{
    const {email, nombre , asunto} = req.body
    sendEmail({
        email,
        nombre,
        asunto
    })
}


const registrar = async (req,res) =>{
   
    const {email} = req.body;

    //prevenir usuario duplicados
    const existeUsuario = await Admin.findOne({email})

    if(existeUsuario){
       const error = new Error('Usuario ya registrado');
       return res.status(400).json({msg: error.message});
    }
        
    try {
        //Guardar el usuario
        const admin = new Admin(req.body);
        const adminGuardado = await admin.save();
        res.json(adminGuardado);
    } catch (error) {
        console.log(error);
    }

   
    
};

const perfil = (req,res) =>{
    const {admin} = req;
    res.json( admin)
};

const confirmar =  async (req,res) => {
   const {token} = req.params
    const usuarioConfirmar = await Admin.findOne({token})

    if(!usuarioConfirmar){
        const error = new Error('Token no valido');
        return res.status(404).json ({msg: error.message});
    }

    try {
       usuarioConfirmar.token = null,
       usuarioConfirmar.confirmado = true
       await usuarioConfirmar.save();
       res.json("usuario confirmado correctamente");

    } catch (error) {
        console.log(error)
    }

   
}

const autenticar = async (req,res) =>{
    const {nombre, password} = req.body
    const usuario = await Admin.findOne({nombre})

    if(!usuario){
        const error = new Error('Usuario no existe');
        return res.status(404).json ({msg: error.message});
    }
   
    // si el usuario esta confirmado
    if(!usuario.confirmado){
        const error = new Error('Tu cuenta no ha sido confirmada');
        return res.status(404).json ({msg: error.message});
    }
    
    // revisar el password
    if(await usuario.comprobarPassword(password)){
       
        res.json({
            _id: usuario._id,
            nombre: usuario.nombre,
            email:usuario.email,
            token: generarJWT(usuario.id),
        });

    } else{
        const error = new Error('El password es incorrecto');
        return res.status(404).json ({msg: error.message});
    }
};


const olvidePassword = async (req,res) =>{
   const {email} = req.body;

   const existeAdmin = await Admin.findOne({email})
   if(!existeAdmin){
    const error = new Error('El usuario no existe');
        return res.status(400).json ({msg: error.message});
   }

   try {
        existeAdmin.token= generarId();
        await existeAdmin.save()
        res.json({msg: 'Hemos enviado un email con las instrucciones'})
   } catch (error) {
    console.log(error)
   }

};

const comprobarToken = async (req,res) =>{
   const {token} = req.params;
    const tokenValido = await Admin.findOne({token});
    if(tokenValido){
        res.json({msg: "Token valido y el usuario existe"});
    }else{
        const error = new Error("Token no valido")
        return res.status(400).json({msg: error.message});
    }
   
};

const nuevoPassword = async (req,res) =>{
    const {token} = req.params;
    const {password} = req.body;
    const admin = await Admin.findOne({token});
    if(!admin){
       const error = new Error ('Hubo un error');
       return res.status(400).json({msg: error.message})
    }
   
    try {
        admin.token = null;
        admin.password = password;
        await admin.save();
        res.json({msg: "Password modficado correctamente"})
    } catch (error) {
        console.log(error)
    }
};
export {
    registrar,
    autenticar,
    perfil,
    confirmar,
    olvidePassword,
    comprobarToken,
    nuevoPassword,
    enviarEmail
}