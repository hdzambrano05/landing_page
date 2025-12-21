import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, XCircle } from "lucide-react"

export default function FeedbackModal({ tipo, onClose }) {
    const esExito = tipo === "success"

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-999 flex items-center justify-center
                           bg-black/60 backdrop-blur-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.7, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 18 }}
                    className="bg-white rounded-3xl p-10 max-w-md w-full
                               text-center shadow-2xl"
                >
                    {/* ICONO */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="flex justify-center mb-6"
                    >
                        {esExito ? (
                            <CheckCircle className="w-20 h-20 text-green-500" />
                        ) : (
                            <XCircle className="w-20 h-20 text-red-500" />
                        )}
                    </motion.div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                        {esExito ? "Solicitud enviada" : "Error"}
                    </h3>

                    <p className="text-gray-600 mb-8">
                        {esExito
                            ? "Hemos recibido tu solicitud. Te contactaremos pronto."
                            : "No se pudo enviar el mensaje. Intenta nuevamente."}
                    </p>

                    <button
                        onClick={onClose}
                        className={`px-8 py-3 rounded-xl font-semibold text-white transition
                        ${esExito
                                ? "bg-green-500 hover:bg-green-600"
                                : "bg-red-500 hover:bg-red-600"}`}
                    >
                        Cerrar
                    </button>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}
