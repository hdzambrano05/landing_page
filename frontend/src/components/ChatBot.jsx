import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send } from "lucide-react"

/* =======================
   FORMATO TEXTO
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
                "Bienvenido. Soy el asistente virtual institucional de **Conrado Seguros**.\n\nEstoy disponible para brindarle información sobre nuestros servicios y asesoría personalizada.",
        },
    ])
    const [input, setInput] = useState("")
    const [loading, setLoading] = useState(false)

    const messagesEndRef = useRef(null)

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
                        "Ocurrió un inconveniente al procesar su solicitud. Por favor, intente nuevamente.",
                },
            ])
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            {/* BOTÓN FLOTANTE */}
            {!open && (
                <button
                    onClick={() => setOpen(true)}
                    className="fixed bottom-6 right-6 z-50
                    w-14 h-14 rounded-full
                    bg-gradient-to-br from-blue-700 to-blue-900
                    text-white shadow-2xl
                    flex items-center justify-center
                    hover:scale-105 transition"
                >
                    <MessageCircle className="w-7 h-7" />
                </button>
            )}

            {/* CHAT */}
            {open && (
                <div
                    className="fixed bottom-6 right-6 z-50
                    w-[380px] h-[560px]
                    rounded-3xl overflow-hidden
                    shadow-[0_25px_60px_-15px_rgba(0,0,0,0.25)]
                    bg-white flex flex-col"
                >
                    {/* HEADER */}
                    <div className="bg-gradient-to-r from-blue-800 to-blue-900
                        px-5 py-4 text-white flex justify-between items-center">
                        <div>
                            <p className="font-semibold text-sm">
                                Asistente Conrado Seguros
                            </p>
                            <p className="text-xs opacity-80">
                                En línea · Atención institucional
                            </p>
                        </div>
                        <button onClick={() => setOpen(false)}>
                            <X className="w-5 h-5 opacity-80 hover:opacity-100" />
                        </button>
                    </div>

                    {/* MENSAJES */}
                    <div className="flex-1 px-4 py-4 space-y-4 overflow-y-auto
                        bg-gradient-to-b from-slate-50 to-slate-100 text-sm">

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
                                        inline-block max-w-[80%]
                                        px-4 py-2.5
                                        rounded-2xl
                                        leading-relaxed
                                        shadow-sm
                                        text-[13.5px]
                                        ${msg.role === "user"
                                            ? "bg-blue-800 text-white rounded-br-md"
                                            : "bg-white text-gray-800 border border-gray-200 rounded-bl-md"
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
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                <span className="w-2 h-2 bg-blue-700 rounded-full animate-pulse"></span>
                                Redactando respuesta…
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* INPUT */}
                    <div className="border-t bg-white px-4 py-3">
                        <div className="flex items-center gap-2
                            bg-gray-100 rounded-2xl px-3 py-2
                            focus-within:ring-2 focus-within:ring-blue-800">
                            <input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) =>
                                    e.key === "Enter" && sendMessage()
                                }
                                placeholder="Escriba su consulta…"
                                className="flex-1 bg-transparent
                                outline-none text-sm
                                text-gray-800 placeholder-gray-500"
                            />
                            <button
                                onClick={sendMessage}
                                className="bg-blue-800 text-white
                                p-2 rounded-xl
                                hover:bg-blue-900 transition"
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
