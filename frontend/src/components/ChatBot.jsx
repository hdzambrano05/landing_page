import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send } from "lucide-react"

/* =======================
   FORMATO DE TEXTO (NEGRILLA)
======================= */
const formatMessage = (text) => {
    return text
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/\n/g, "<br />")
}

export default function ChatBot() {
    const [open, setOpen] = useState(false)
    const [messages, setMessages] = useState([
        {
            role: "assistant",
            content:
                "Bienvenido. Soy el asistente virtual institucional de **Conrado Seguros**. Estoy disponible para brindarle información sobre nuestra empresa y servicios. ¿En qué puedo ayudarle?",
        },
    ])
    const [input, setInput] = useState("")
    const [loading, setLoading] = useState(false)

    const messagesEndRef = useRef(null)

    /* =======================
       AUTO SCROLL
    ======================= */
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages, loading])

    const sendMessage = async () => {
        if (!input.trim()) return

        setMessages((prev) => [...prev, { role: "user", content: input }])
        setInput("")
        setLoading(true)

        try {
            const res = await fetch("http://localhost:3001/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: input }),
            })

            const data = await res.json()

            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: data.reply },
            ])
        } catch {
            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content:
                        "Ha ocurrido un error al procesar su solicitud. Por favor intente nuevamente.",
                },
            ])
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            {/* =======================
                BOTÓN FLOTANTE
            ======================= */}
            {!open && (
                <button
                    onClick={() => setOpen(true)}
                    className="fixed bottom-6 right-6 z-50
                    w-14 h-14 rounded-full bg-blue-700 text-white
                    flex items-center justify-center shadow-xl
                    hover:scale-105 transition"
                >
                    <MessageCircle className="w-7 h-7" />
                </button>
            )}

            {/* =======================
                CHAT
            ======================= */}
            {open && (
                <div
                    className="fixed bottom-6 right-6 z-50
                    w-[380px] h-[560px]
                    bg-white rounded-3xl shadow-2xl border
                    flex flex-col overflow-hidden"
                >
                    {/* HEADER */}
                    <div className="bg-gradient-to-r from-blue-700 to-blue-800
                        text-white px-5 py-4 flex justify-between items-center">
                        <div>
                            <p className="font-semibold text-sm">
                                Asistente Conrado Seguros
                            </p>
                            <p className="text-xs opacity-90">
                                Atención institucional
                            </p>
                        </div>
                        <button onClick={() => setOpen(false)}>
                            <X className="w-5 h-5 opacity-80 hover:opacity-100" />
                        </button>
                    </div>

                    {/* MENSAJES */}
                    <div className="flex-1 px-4 py-4 space-y-3 overflow-y-auto
                        bg-gradient-to-b from-gray-50 to-gray-100 text-sm">

                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={`flex ${msg.role === "user"
                                        ? "justify-end"
                                        : "justify-start"
                                    }`}
                            >
                                <div
                                    className={`
                                        inline-block max-w-[75%]
                                        px-4 py-2 leading-relaxed
                                        whitespace-pre-wrap break-words
                                        animate-[fadeIn_0.25s_ease-out]
                                        ${msg.role === "user"
                                            ? "bg-blue-700 text-white rounded-2xl rounded-br-sm shadow-md"
                                            : "bg-white text-gray-800 rounded-2xl rounded-bl-sm shadow-sm border-l-4 border-blue-700"
                                        }
                                    `}
                                >
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: formatMessage(msg.content),
                                        }}
                                    />
                                </div>
                            </div>
                        ))}

                        {loading && (
                            <div className="inline-block bg-white px-4 py-2
                                rounded-xl shadow-sm text-gray-500 text-xs">
                                Redactando respuesta…
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* INPUT */}
                    <div className="border-t px-4 py-3 bg-white">
                        <div className="flex items-center gap-2
                            bg-gray-100 rounded-2xl px-3 py-2
                            focus-within:ring-2 focus-within:ring-blue-700">
                            <input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) =>
                                    e.key === "Enter" && sendMessage()
                                }
                                placeholder="Escriba su consulta..."
                                className="flex-1 bg-transparent text-sm
                                outline-none text-gray-800 placeholder-gray-500"
                            />
                            <button
                                onClick={sendMessage}
                                className="bg-blue-700 text-white
                                p-2 rounded-xl hover:bg-blue-800 transition"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
