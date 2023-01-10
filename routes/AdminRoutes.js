import express from "express";
import { registrar, autenticar, perfil, olvidePassword, comprobarToken,nuevoPassword, confirmar, enviarEmail } from "../controllers/adminController.js";
import checkAuth from "../middleware/authMiddleware.js";
const router = express.Router();


router.post('/',registrar);
router.get('/confirmar/:token', confirmar)
router.post('/login', autenticar);
router.post('/olvide-password',olvidePassword);
router.route("/olvide-password/:token").get(comprobarToken).post(nuevoPassword)
router.post('/send-email', enviarEmail)

//area privada
router.get('/perfil', checkAuth, perfil);


export default router;