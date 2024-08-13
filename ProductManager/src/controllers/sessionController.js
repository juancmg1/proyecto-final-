import passport from "passport";
import {sendEmailChangePassword} from '../utils/nodemailer.js'
import jwt from 'jsonwebtoken'
import { userModel } from "../models/user.js";
import { validatePassword , createHash } from "../utils/bcrypt.js";
export const login = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).send("Usuario o contraseña no validos")
        }

        req.session.user = {
            email: req.user.email,
            first_name: req.user.first_name
        }

        res.status(200).send("Usuario logueado correctamente")

    } catch (e) {
        req.logger.error(`Metodo: ${req.method} en ruta ${req.url} - ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
        res.status(500).send("Error al loguear usuario")
    }
}

export const register = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(400).send("Usuario ya existente en la aplicacion")
        }

        res.status(200).send("Usuario creado correctamente")

    } catch (e) {
        req.logger.error(`Metodo: ${req.method} en ruta ${req.url} - ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
        res.status(500).send("Error al registrar usuario")
    }

}

export const logout = async (req, res) => {
    const user = await userModel.findById({email: req.session.user.email})
    user.last_connection = new Date()
    await user.save()
    req.session.destroy(function (e) {
        if (e) {
            req.logger.error(`Metodo: ${req.method} en ruta ${req.url} - ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
            console.log(e)
        } else {
            res.status(200).redirect("/")
        }

    })

}

export const sessionGithub = async (req, res) => {
    console.log(req)
    req.session.user = {
        email: req.user.email,
        first_name: req.user.name
    }
    res.redirect('/')

}

export const testJWT = async (req, res) => {
    console.log("Desde testJWT" + req.user)
    if (req.user.rol == 'User')
        res.status(403).send("Usuario no autorizado")
    else
        res.status(200).send(req.user)
}

export const createNewPassword = async (req, res) => {
    const {token} = req.params
    const {newPassword} = req.body
   
    
    try {
        const validateToken = jwt.verify(token.substr(6,), "coder");
        const user = await userModel.findOne({ email: validateToken.userEmail });
        if (user) {
            console.log(newPassword)
            console.log(user)
            if (!validatePassword(newPassword, user.password)) {
                const hashPassword = createHash(newPassword)
                user.password = hashPassword
                const resultado = await userModel.findByIdAndUpdate(user._id, user)
                res.status(200).send("contraseña  modificada")
                console.log(resultado)
            }else{
                res.status(400).send(" las contraseñas son iguales ")
            }
        }else{
            res.status(404).send(" usuario no existe ")
        }
    } catch (error) {
        res.status(500).send(error)
        console.log(error)
    }

}
export const changePassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await userModel.findOne({ email: email });

        if (user) {
            const token = jwt.sign({ userEmail: email }, "coder", { expiresIn: '1h' });
            const resetLink = `http://localhost:8082/api/session/reset-password?token=${token}`;
            sendEmailChangePassword(email, resetLink);
            res.status(200).send('Email enviado correctamente');
        } else {
            res.status(400).send('Usuario no encontrado');
        }
    } catch (error) {
        console.error(error); // Log the error for debugging purposes
        res.status(500).send('Error interno del servidor');
    }
}