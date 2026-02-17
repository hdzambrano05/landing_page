import { useState } from "react"
import {
    MapPin,
    Phone,
    Navigation,
    MessageCircle,
    RotateCcw
} from "lucide-react"

export default function Contacto() {

    const MAPA_BASE =
        "https://maps.google.com/maps?q=Cl%2020%20%2342-36%2C%20Pasto%2C%20Nari%C3%B1o&t=m&z=17&output=embed"

    const [mapSrc, setMapSrc] = useState(MAPA_BASE)
    const [loading, setLoading] = useState(false)
    const [mostrandoRuta, setMostrandoRuta] = useState(false)
    const [mensaje, setMensaje] = useState(
        "Puede consultar nuestra ubicación o calcular la ruta desde su ubicación actual."
    )

    const mostrarRuta = () => {
        if (!navigator.geolocation) {
            alert("Su navegador no soporta geolocalización.")
            return
        }

        setLoading(true)
        setMensaje("Obteniendo su ubicación y calculando la ruta óptima…")

        navigator.geolocation.getCurrentPosition(
            ({ coords }) => {
                const { latitude, longitude } = coords
                const EMPRESA_COORDS = "1.2328016,-77.2851392"

                const rutaUrl = encodeURI(
                    `https://maps.google.com/maps?saddr=${latitude},${longitude}&daddr=${EMPRESA_COORDS}&z=14&output=embed`
                )

                setMapSrc(rutaUrl)
                setMostrandoRuta(true)
                setMensaje("Se muestra la ruta desde su ubicación hasta nuestras instalaciones.")
                setLoading(false)
            },
            () => {
                alert("No fue posible obtener su ubicación.")
                setMensaje("No fue posible acceder a su ubicación.")
                setLoading(false)
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        )
    }

    const volverMapa = () => {
        setMapSrc(MAPA_BASE)
        setMostrandoRuta(false)
        setMensaje(
            "Puede consultar nuestra ubicación o calcular la ruta desde su ubicación actual."
        )
    }

    return (
        <section className="py-28 bg-slate-100">
            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

                {/* Información */}
                <div className="space-y-8">
                    <h2 className="text-4xl font-bold text-slate-800 leading-tight">
                        Contáctenos
                    </h2>

                    <p className="text-lg text-slate-600 max-w-xl">
                        {mensaje}
                    </p>

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
                            className={`
                                flex items-center gap-3 px-8 py-4 rounded-xl
                                bg-slate-800 text-white font-semibold
                                shadow-md transition-all duration-300
                                ${loading
                                    ? "opacity-60 cursor-not-allowed"
                                    : "hover:bg-slate-700 hover:shadow-lg"}
                            `}
                        >
                            <Navigation className="w-5 h-5" />
                            {loading ? "Calculando ruta..." : "Calcular ruta"}
                        </button>

                        {mostrandoRuta && (
                            <button
                                onClick={volverMapa}
                                className="flex items-center gap-3 px-8 py-4 rounded-xl
                                           bg-white border border-slate-300
                                           text-slate-700 font-semibold
                                           shadow-sm
                                           hover:bg-slate-100 transition-all duration-300"
                            >
                                <RotateCcw className="w-5 h-5" />
                                Volver al mapa
                            </button>
                        )}

                        <a
                            href="https://wa.me/573008580721"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 px-8 py-4 rounded-xl
                                       bg-emerald-700 text-white font-semibold
                                       shadow-md hover:bg-emerald-800
                                       transition-all duration-300"
                        >
                            <MessageCircle className="w-5 h-5" />
                            WhatsApp
                        </a>
                    </div>
                </div>

                {/* Mapa */}
                <div className="relative">
                    <div
                        className={`
                            rounded-2xl overflow-hidden shadow-xl
                            bg-white border border-slate-200
                            h-[420px] transition-all duration-300
                            ${mostrandoRuta ? "ring-2 ring-slate-400" : ""}
                        `}
                    >
                        <iframe
                            title="Mapa"
                            src={mapSrc}
                            className="w-full h-full border-0"
                            loading="lazy"
                        />
                    </div>

                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2
                                    bg-white px-6 py-3 rounded-full shadow-md
                                    flex items-center gap-2 text-sm font-semibold text-slate-700">
                        <MapPin className="w-4 h-4 text-slate-800" />
                        {mostrandoRuta ? "Ruta activa" : "Ubicación de la empresa"}
                    </div>
                </div>
            </div>
        </section>
    )
}

function InfoCard({ icon, title, text }) {
    return (
        <div className="flex gap-4 p-6 rounded-xl
                        bg-white shadow-md border border-slate-200
                        hover:shadow-lg transition-all duration-300">

            <div className="w-12 h-12 rounded-lg
                            bg-slate-800 text-white
                            flex items-center justify-center">
                {icon}
            </div>

            <div>
                <h4 className="font-semibold text-slate-800">{title}</h4>
                <p className="text-slate-600 text-sm mt-1">{text}</p>
            </div>
        </div>
    )
}
