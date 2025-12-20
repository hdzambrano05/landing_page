import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import OpenAI from "openai"

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

const CONTEXTO_EMPRESA = `
Conrado Seguros es una agencia de seguros con más de 60 años de experiencia.
Servicios:
- Administración de riesgos
- Programas de seguros
- Asesoría empresarial
- Seguridad y salud en el trabajo
`

app.post("/chat", async (req, res) => {
    const { message } = req.body

    if (!message) {
        return res.status(400).json({ error: "Mensaje vacío" })
    }

    const prompt = `
Eres el asistente virtual de Conrado Seguros.

REGLAS:
- Responde SOLO con la información proporcionada
- Si la pregunta no está relacionada, responde:
  "Lo siento, solo puedo responder preguntas sobre Conrado Seguros."
- No inventes información

CONTEXTO:
${CONTEXTO_EMPRESA}

PREGUNTA:
${message}
`

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
        })

        res.json({
            reply: response.choices[0].message.content,
        })
    } catch (err) {
        res.status(500).json({ error: "Error procesando la solicitud" })
    }
})

app.listen(3001, () => {
    console.log("Backend corriendo en http://localhost:3001")
})
