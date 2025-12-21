import { useState } from "react"
import {
    MapPin,
    Phone,
    Navigation,
    MessageCircle,
    RotateCcw
} from "lucide-react"

export default function Contacto() {
    const EMPRESA = { lat: 1.2329988584558267, lng: -77.28516303068943 }
    const MAPA_BASE =
        "https://maps.google.com/maps?q=Cl%2020%20%2342-36%2C%20Pasto%2C%20Nari%C3%B1o&t=m&z=17&output=embed"

    const [mapSrc, setMapSrc] = useState(MAPA_BASE)
    const [loading, setLoading] = useState(false)
    const [mostrandoRuta, setMostrandoRuta] = useState(false)
    const [mensaje, setMensaje] = useState(
        "Puedes ver nuestra ubicación o calcular la ruta desde donde te encuentres."
    )

    const mostrarRuta = () => {
        if (!navigator.geolocation) {
            alert("Tu navegador no soporta geolocalización")
            return
        }

        setLoading(true)
        setMensaje("Obteniendo tu ubicación y calculando la mejor ruta…")

        navigator.geolocation.getCurrentPosition(
            ({ coords }) => {
                const { latitude, longitude } = coords
                const EMPRESA_COORDS = "1.2328016,-77.2851392"
                const rutaUrl = encodeURI(
                    `https://maps.google.com/maps?saddr=${latitude},${longitude}&daddr=${EMPRESA_COORDS}&z=14&output=embed`
                )
                setMapSrc(rutaUrl)
                setMostrandoRuta(true)
                setMensaje("Esta es la ruta desde tu ubicación hasta nuestra empresa.")
                setLoading(false)
            },
            (error) => {
                console.error(error)
                alert("No se pudo obtener tu ubicación")
                setMensaje("No se pudo obtener tu ubicación.")
                setLoading(false)
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        )
    }

    const volverMapa = () => {
        setMapSrc(MAPA_BASE)
        setMostrandoRuta(false)
        setMensaje(
            "Puedes ver nuestra ubicación o calcular la ruta desde donde te encuentres."
        )
    }

    return (
        <section className="relative py-32 bg-linear-to-br from-blue-50 via-white to-indigo-50 overflow-hidden">
            {/* Fondos decorativos animados */}
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-300/30 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-300/30 rounded-full blur-3xl animate-pulse" />

            <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
                {/* INFO */}
                <div className="space-y-8">
                    <h2 className="text-5xl font-extrabold text-gray-900 leading-tight tracking-tight font-sans">
                        Contáctanos
                    </h2>
                    <p className="text-lg text-gray-700 max-w-xl">{mensaje}</p>

                    {/* Tarjetas */}
                    <div className="grid sm:grid-cols-2 gap-6">
                        <InfoCard
                            icon={<MapPin />}
                            title="Dirección"
                            text="Calle 20 No. 42-36, Pasto, Nariño"
                        />
                        <InfoCard
                            icon={<Phone />}
                            title="Teléfonos"
                            text="300 858 0721 · 300 858 0684"
                        />
                    </div>

                    {/* Botones */}
                    <div className="flex flex-wrap gap-4 pt-4">
                        <button
                            onClick={mostrarRuta}
                            disabled={loading}
                            className={`flex items-center gap-3 px-8 py-4 rounded-full
                                bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600
                                text-white font-semibold shadow-xl
                                transition-all duration-300 transform
                                ${loading ? "opacity-70 cursor-not-allowed" : "hover:scale-105 hover:brightness-110"}
                            `}
                        >
                            <Navigation className="w-5 h-5" />
                            {loading ? "Calculando ruta..." : "Ver ruta desde mi ubicación"}
                        </button>

                        {mostrandoRuta && (
                            <button
                                onClick={volverMapa}
                                className="flex items-center gap-3 px-8 py-4 rounded-full
                                           bg-gray-200 text-gray-800 font-semibold
                                           shadow hover:scale-105 transition-all duration-300"
                            >
                                <RotateCcw className="w-5 h-5" />
                                Volver al mapa
                            </button>
                        )}

                        <a
                            href="https://wa.me/573008580721"
                            target="_blank"
                            className="flex items-center gap-3 px-8 py-4 rounded-full
                                       bg-green-500 text-white font-semibold
                                       shadow-xl hover:scale-105 hover:brightness-110 transition-all duration-300"
                        >
                            <MessageCircle className="w-5 h-5" />
                            WhatsApp
                        </a>
                    </div>
                </div>

                {/* MAPA */}
                <div className="relative">
                    <div
                        className={`rounded-3xl overflow-hidden shadow-2xl
                        backdrop-blur-xl bg-white/60 border border-white/30
                        h-105 transition-all duration-500
                        ${mostrandoRuta ? "ring-4 ring-blue-400/40" : "hover:scale-105"} `}
                    >
                        <iframe
                            title="Mapa"
                            src={mapSrc}
                            className="w-full h-full border-0"
                            loading="lazy"
                        />
                    </div>

                    {/* Etiqueta flotante */}
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2
                                    bg-white px-6 py-3 rounded-full shadow-lg
                                    flex items-center gap-2 text-sm font-semibold text-gray-700
                                    animate-pulse">
                        <MapPin className="w-4 h-4 text-blue-600" />
                        {mostrandoRuta ? "Ruta activa" : "Nuestra ubicación"}
                    </div>
                </div>
            </div>
        </section>
    )
}

function InfoCard({ icon, title, text }) {
    return (
        <div className="flex gap-4 p-6 rounded-2xl
                        bg-white/60 backdrop-blur-md shadow-xl border border-white/30
                        hover:scale-105 hover:shadow-2xl transition-all duration-300">
            <div className="w-12 h-12 rounded-xl
                            bg-linear-to-br from-blue-600 via-indigo-600 to-purple-600
                            text-white flex items-center justify-center transform hover:rotate-12 transition-all duration-500">
                {icon}
            </div>
            <div>
                <h4 className="font-bold text-gray-900">{title}</h4>
                <p className="text-gray-600 text-sm mt-1">{text}</p>
            </div>
        </div>
    )
}
