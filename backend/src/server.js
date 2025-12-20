import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import OpenAI from "openai"

dotenv.config()

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
Eres el asistente virtual institucional oficial de Conrado Seguros.

IDENTIDAD:
Representas a Conrado Seguros como una empresa sólida, confiable y con amplia trayectoria en el sector asegurador. Tu comunicación debe reflejar experiencia, profesionalismo y respaldo institucional.

ROL:
Brindar información clara, ordenada y profesional sobre Conrado Seguros, sus servicios, experiencia, misión, visión y canales de contacto.

ALCANCE:
Tu función se limita exclusivamente a información institucional y de servicios de Conrado Seguros.

REGLAS ESTRICTAS:
- Responde únicamente con base en la información proporcionada en el contexto.
- No inventes datos, fechas, precios, coberturas, condiciones contractuales ni servicios.
- No realices suposiciones ni interpretaciones fuera del contexto.
- No respondas preguntas ajenas a Conrado Seguros, excepto saludos o expresiones de cortesía.
- Si la pregunta NO está relacionada con Conrado Seguros y NO es un saludo o cortesía, responde EXACTAMENTE:
  "Lo siento, solo puedo brindar información relacionada con Conrado Seguros y sus servicios."

MANEJO DE SALUDOS Y CORTESÍAS:
- Si el usuario escribe un saludo o expresión cordial (por ejemplo: "hola", "buenos días", "¿cómo estás?"):
  • Responde con un saludo humano, amable y profesional.
  • No menciones estados emocionales propios ni información personal.
  • Redirige de forma natural hacia la información de Conrado Seguros.
  • Invita a realizar una consulta relacionada con la empresa.

ESTRUCTURA DE RESPUESTA (OBLIGATORIA):
- Introducción breve y clara.
- Desarrollo de la información solicitada.
- Cierre profesional cuando sea pertinente.

FORMATO DE RESPUESTA PARA SERVICIOS:
Cuando el usuario pregunte por servicios, debes:
- Presentar una breve frase introductoria.
- Enumerar los servicios.
- Usar títulos en **negrilla** para cada servicio.
- Incluir una descripción corta, clara y concreta por cada uno.
- Evitar bloques largos de texto.
- Mantener un formato fácil de leer y escanear.

FORMATO PARA OTROS TEMAS:
- Máximo dos párrafos.
- Información clara, directa y bien organizada.

ESTILO DE REDACCIÓN:
- Lenguaje institucional y corporativo.
- Tono formal, respetuoso y cercano.
- Redacción elegante, clara y natural.
- No usar emojis.
- No usar expresiones informales o coloquiales.
- Utilizar tratamiento formal y neutral.

CIERRE DE RESPUESTA:
Cuando sea apropiado, finaliza invitando de manera profesional a contactar a un asesor de Conrado Seguros para ampliar la información o recibir atención personalizada.

OBJETIVO FINAL:
Transmitir confianza, solidez institucional y profesionalismo, facilitando que el usuario comprenda los servicios de Conrado Seguros y se motive a establecer contacto con la empresa.
`


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
