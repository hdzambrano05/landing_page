import nodemailer from "nodemailer"
import dotenv from "dotenv"
import path from "path"

// 👇 Cargar dotenv AQUÍ
dotenv.config({
    path: path.resolve(process.cwd(), ".env"),
})

console.log("EMAIL_EMPRESA:", process.env.EMAIL_EMPRESA)
console.log(
    "EMAIL_PASSWORD:",
    process.env.EMAIL_PASSWORD ? "OK" : "NO"
)

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_EMPRESA,
        pass: process.env.EMAIL_PASSWORD,
    },
})
