import dotenv from "dotenv"
import path from "path"

dotenv.config({
    path: path.resolve(process.cwd(), ".env"),
})

// 👇 AHORA SÍ, después de dotenv
import express from "express"
import cors from "cors"
import OpenAI from "openai"
import { transporter } from "./config/mailer.js"


const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

/* ================================
   OPENAI CONFIG
================================ */
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

/* ================================
   CONTEXTO EMPRESARIAL
================================ */
const CONTEXTO_EMPRESA = `
EMPRESA:
Conrado Seguros

DESCRIPCIÓN:
Brindamos tranquilidad y protección a nuestros clientes, convirtiéndonos en el aliado estratégico que necesitan para transferir sus riesgos a través de soluciones integrales de seguros.

EXPERIENCIA:
Más de 60 años de experiencia en el sector empresarial, respaldados por un talento humano altamente calificado.

MISIÓN:
Brindar tranquilidad y protección a nuestros clientes mediante soluciones integrales de seguros, incluyendo asesoría jurídica especializada, generando confianza y respaldo permanente.

VISIÓN:
Para el año 2025, ser reconocidos como la agencia de seguros líder en la región, destacándonos por la confianza, responsabilidad y compromiso con el bienestar de nuestros clientes.

UBICACIÓN:
Calle 20 No. 42-36, Barrio Morasurco, Local 1. Pasto, Nariño.

CONTACTO:
Teléfonos: 3008580721 – 3008580684

ENFOQUE:
Protección del patrimonio, análisis y gestión de riesgos, transferencia de riesgos, asesoría profesional y acompañamiento continuo.
`

/* ================================
   CONTEXTO DE SERVICIOS
================================ */
const CONTEXTO_SERVICIOS = `
SERVICIOS:

1. ADMINISTRACIÓN DE RIESGOS:
Análisis profesional de riesgos para identificar eventos que puedan afectar el patrimonio del cliente, evaluando su severidad y frecuencia.
Estrategias:
- Eliminación del riesgo
- Reducción del riesgo
- Asunción del riesgo
- Cesión del riesgo mediante pólizas de seguros

2. ESTRUCTURACIÓN Y MANEJO DEL PROGRAMA DE SEGUROS:
Diseño, implementación y actualización del programa de seguros, asesoría inmediata y permanente, organización de oficinas de seguros, capacitación sin costo y acompañamiento de asesores especializados.

3. ASESORÍA EN SEGUROS PARA EMPRESAS PRIVADAS Y PÚBLICAS:
- Estructuración de procesos y pliegos de condiciones
- Elaboración de propuestas para concursos de méritos
- Estudios de mercado
- Cotizaciones
- Análisis estadístico
- Elaboración de ofertas

4. SEGURIDAD Y SALUD EN EL TRABAJO:
- Programas de Salud Ocupacional
- Panorama de factores de riesgo
- COPASO
- Reglamento de Higiene y Seguridad
- Brigadas de emergencia
- Ergonomía
- Higiene industrial
- Seguridad industrial
- Riesgo psicosocial
- Programas especiales
`

/* ================================
   SYSTEM PROMPT (CEREBRO)
================================ */
const SYSTEM_PROMPT = `
Eres **Andrea**, la asesora virtual institucional oficial de **Conrado Seguros**.

────────────────────────────────
IDENTIDAD
────────────────────────────────
Representas a Conrado Seguros como una empresa sólida, confiable y con amplia trayectoria en el sector asegurador.
Tu comunicación debe reflejar experiencia, profesionalismo, cercanía y respaldo institucional.

Eres una asesora virtual profesional, con comportamiento humano, natural y respetuoso.
No actúas como un bot técnico, sino como una persona real que orienta a clientes de manera formal y cordial.

────────────────────────────────
ROL
────────────────────────────────
Brindar información clara, ordenada y profesional sobre:
- Conrado Seguros
- Su experiencia
- Su misión y visión
- Sus servicios
- Sus canales de contacto
- Orientación básica sobre qué servicio puede ser más adecuado según la necesidad expresada por el cliente

────────────────────────────────
CONTROL DE PRESENTACIÓN 
────────────────────────────────
Andrea SOLO debe presentarse con su nombre y rol en:
- El primer mensaje de la conversación
- O cuando el usuario pregunte explícitamente quién es o con quién habla

Si Andrea ya se ha presentado anteriormente en la conversación:
- NO debe repetir su nombre ni su cargo
- Debe continuar la conversación de forma natural y profesional
- Puede usar saludos breves como: “Con gusto”, “Claro”, “A continuación le indico”, sin volver a presentarse


────────────────────────────────
ALCANCE
────────────────────────────────
Tu función se limita a información institucional, de servicios y **orientación general no vinculante**.
No reemplazas la asesoría profesional personalizada de un asesor humano.

────────────────────────────────
REGLAS ESTRICTAS
────────────────────────────────
- Responde únicamente con base en la información proporcionada en el contexto.
- No inventes datos, fechas, precios, coberturas, condiciones contractuales ni servicios.
- No realices interpretaciones técnicas profundas.
- No brindes asesoría legal, financiera o contractual específica.
- No menciones que eres una IA ni un modelo de lenguaje.

Si la pregunta NO está relacionada con Conrado Seguros y NO es un saludo o cortesía, responde EXACTAMENTE:
"Lo siento, solo puedo brindar información relacionada con Conrado Seguros y sus servicios."

────────────────────────────────
ASESORÍA ORIENTATIVA (NUEVA REGLA)
────────────────────────────────
Cuando el usuario describa una necesidad, problema o tipo de empresa y pregunte:
- “¿Qué servicio me recomienda?”
- “¿Qué seguro necesito?”
- “¿Cuál servicio aplica para mi empresa?”
- “¿Qué me conviene?”

Debes:
- Analizar la necesidad expresada.
- Recomendar **UN SOLO servicio** de Conrado Seguros que esté más alineado con esa necesidad.
- Explicar brevemente por qué ese servicio es el más adecuado.
- No listar los cuatro servicios.
- Aclarar de forma profesional que se trata de una orientación inicial.
- Invitar a contactar a un asesor para una evaluación detallada.

────────────────────────────────
CRITERIOS DE RECOMENDACIÓN
────────────────────────────────
Usa estas asociaciones de forma implícita (NO las muestres al usuario):

- Riesgos generales, patrimonio, pérdidas, eventos inesperados →
  **Administración de Riesgos**

- Empresas con múltiples pólizas o necesidad de orden y control →
  **Estructuración y Manejo del Programa de Seguros**

- Entidades públicas, licitaciones, concursos, pliegos →
  **Asesoría en Seguros para Empresas Privadas y Públicas**

- Seguridad laboral, empleados, salud ocupacional →
  **Seguridad y Salud en el Trabajo**

────────────────────────────────
MANEJO DE NÚMEROS Y CONTACTO
────────────────────────────────
Si el usuario pregunta por “números”, “teléfono”, “contacto”, “cómo comunicarse” o similares,
interpreta que solicita los canales de contacto oficiales y respóndelos claramente.

────────────────────────────────
MANEJO DE SALUDOS Y CORTESÍAS
────────────────────────────────
- Responde con saludo humano y profesional.
- Preséntate como Andrea, asesora virtual de Conrado Seguros.
- Redirige hacia una consulta institucional.

────────────────────────────────
ESTRUCTURA DE RESPUESTA
────────────────────────────────
- Introducción breve.
- Desarrollo claro y directo.
- Cierre profesional.

────────────────────────────────
FORMATO DE RESPUESTA PARA RECOMENDACIONES
────────────────────────────────
- Introducción corta.
- Nombre del servicio recomendado en **negrilla**.
- Explicación breve del porqué.
- Cierre invitando a contacto con un asesor.

────────────────────────────────
ESTILO DE REDACCIÓN
────────────────────────────────
- Lenguaje institucional.
- Tono formal, cercano y profesional.
- Sin emojis.
- Sin expresiones coloquiales.

────────────────────────────────
OBJETIVO FINAL
────────────────────────────────
Orientar al cliente, generar confianza y facilitar el contacto con Conrado Seguros para una asesoría personalizada.
`;



/* ================================
   ENDPOINT CHAT
================================ */
app.post("/chat", async (req, res) => {
    try {
        const { message } = req.body

        if (!message || message.trim().length < 2) {
            return res.json({
                reply: "Por favor, escribe una pregunta válida.",
            })
        }

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            temperature: 0.2,
            max_tokens: 300,
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                {
                    role: "user",
                    content: `
CONTEXTO EMPRESARIAL:
${CONTEXTO_EMPRESA}

CONTEXTO DE SERVICIOS:
${CONTEXTO_SERVICIOS}

PREGUNTA DEL USUARIO:
${message}
                    `,
                },
            ],
        })

        const reply = completion.choices[0].message.content

        res.json({ reply })
    } catch (error) {
        console.error("❌ Error en el chatbot:", error)
        res.status(500).json({
            reply:
                "Ocurrió un error al procesar tu solicitud. Intenta nuevamente más tarde.",
        })
    }
})
/* ================================
   ENDPOINT CONTACTO
================================ */

app.post("/contacto", async (req, res) => {
    try {
        const { nombre, email, mensaje, servicio } = req.body

        if (!nombre || !email || !mensaje) {
            return res.status(400).json({
                ok: false,
                message: "Todos los campos son obligatorios.",
            })
        }

        const mailOptions = {
            from: `"Formulario Web - Conrado Seguros" <${process.env.EMAIL_EMPRESA}>`,
            to: process.env.EMAIL_DESTINO,
            subject: servicio
                ? `📩 Nueva solicitud del servicio: ${servicio}`
                : "📩 Nueva solicitud desde la página web",
            html: `
                <div style="font-family: Arial, sans-serif; background:#f4f6f8; padding:30px;">
                    <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:12px; padding:30px;">
                        
                        <h2 style="color:#1e3a8a; margin-bottom:20px;">
                            Nueva solicitud de información
                        </h2>

                        ${servicio ? `
                        <p style="margin:15px 0; font-size:16px;">
                            <strong>Servicio solicitado:</strong>
                            <span style="color:#1e40af;">${servicio}</span>
                        </p>
                        ` : ""}

                        <hr style="margin:20px 0;" />

                        <p><strong>Nombre:</strong> ${nombre}</p>
                        <p><strong>Correo:</strong> ${email}</p>

                        <p><strong>Mensaje:</strong></p>

                        <p style="background:#f1f5f9; padding:15px; border-radius:8px;">
                            ${mensaje}
                        </p>

                        <hr style="margin:30px 0;" />

                        <p style="font-size:14px; color:#666;">
                            Conrado Seguros – Formulario Web<br/>
                            Este mensaje fue generado automáticamente.
                        </p>
                    </div>
                </div>
            `,
        }

        await transporter.sendMail(mailOptions)

        res.json({
            ok: true,
            message: "Mensaje enviado correctamente.",
        })
    } catch (error) {
        console.error("❌ Error enviando correo:", error)

        res.status(500).json({
            ok: false,
            message: "Error al enviar el mensaje. Intenta más tarde.",
        })
    }
})

/* ================================
   HEALTH CHECK
================================ */
app.get("/", (req, res) => {
    res.send("🤖 Chatbot Conrado Seguros activo y funcionando ✅")
})

/* ================================
   SERVER
================================ */
app.listen(PORT, () => {
    console.log(`🚀 Backend corriendo en http://localhost:${PORT}`)
})
