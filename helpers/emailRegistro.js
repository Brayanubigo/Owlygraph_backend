import { appendFile } from "fs";
import nodemailer from "nodemailer";



const emailRegistro = async (datos) =>{

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
 
const {nombre , email, asunto} = datos;

const info = await transporter.sendMail({
    from: email,
    to: 'brayan.ubigo@gmail.com',
    subject: 'Prueba',
    text: asunto,
    html: `<p> Nuevo mensaje de ${nombre} :  ${asunto} <p>`

})
console.log("mensaje enviado", info.messageId)
}
export default emailRegistro